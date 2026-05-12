#!/usr/bin/env node
// scripts/verify-sources.mjs
//
// Weekly source verification. Reads src/data/sources.json, fetches each
// source per its mode, and either:
//   - bumps last_verified stamps in src/data/figures.json (no changes), or
//   - writes new snapshot files for review in a PR (changes detected).
//
// Modes (defined in sources.json):
//   hash-only         fetch + clean + hash; diff against stored snapshot
//   snapshot-only     fetch once on first run, archive, never re-check
//   manual-quarterly  skipped here; surfaced via a separate quarterly reminder
//   editorial-only    skipped here; present in figures.json for credit only
//
// Optional source flags:
//   via_wayback       fetch the URL through the Wayback Machine's most recent
//                     snapshot instead of directly. Used for sources whose
//                     origin blocks the verifier (e.g., IEA's Cloudflare).
//
// Flags:
//   --dry-run    do everything but don't write files
//   --verbose    per-source logging
//
// Output:
//   src/data/snapshots/{id}.html|pdf     archived bodies (git-tracked)
//   .verify-summary.json                 per-run results (gitignored)

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES_PATH = join(ROOT, 'src/data/sources.json');
const FIGURES_PATH = join(ROOT, 'src/data/figures.json');
const SNAPSHOTS_DIR = join(ROOT, 'src/data/snapshots');
const SUMMARY_PATH = join(ROOT, '.verify-summary.json');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

const FETCH_TIMEOUT_MS = 30_000;
const WAYBACK_CDX_API = 'https://web.archive.org/cdx/search/cdx';

// Sources behind bot-detection (notably IEA's Cloudflare) reject anything that
// doesn't look fully like a current browser. The header set below mirrors
// Chrome 126 on a top-level navigation. For sources that still block even with
// the full header set, set `via_wayback: true` on the manifest entry — the
// script will fetch through the Wayback Machine instead.
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'DNT': '1',
  'Cache-Control': 'max-age=0',
};

const today = () => new Date().toISOString().slice(0, 10);
const log = (...a) => VERBOSE && console.log(...a);
const sha = buf => createHash('sha256').update(buf).digest('hex');
const meta = s => ({ id: s.id, url: s.url, name: s.name });
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function fetchWithTimeout(url, headers = BROWSER_HEADERS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers,
      redirect: 'follow',
    });
  } finally {
    clearTimeout(timer);
  }
}

// Wayback's API sometimes returns transient 5xx; one quick retry usually
// catches it. We don't retry on 4xx — those mean "no snapshot" and a retry
// won't help.
async function fetchWithRetry(url, { attempts = 2, backoffMs = 2000 } = {}) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetchWithTimeout(url);
      if (res.ok || res.status < 500) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastErr = err;
    }
    if (i < attempts - 1) await sleep(backoffMs * (i + 1));
  }
  throw lastErr;
}

// Wayback's CDX index has fuller coverage than the lightweight availability
// API. We filter for 200-status captures and ask for the most recent. The
// returned 'id_' mode URL serves the original archived bytes without Wayback's
// toolbar or URL rewriting, so the snapshot we hash is what the source itself
// served at archive time.
async function resolveWaybackSnapshot(originalUrl) {
  const cdxUrl = `${WAYBACK_CDX_API}?url=${encodeURIComponent(originalUrl)}&output=json&filter=statuscode:200&limit=-1`;
  const res = await fetchWithRetry(cdxUrl);
  if (!res.ok) throw new Error(`Wayback CDX HTTP ${res.status}`);
  const data = await res.json();
  // CDX response: [[header row], [snapshot row]] when a 200 capture exists.
  if (!Array.isArray(data) || data.length < 2) {
    throw new Error('no 200-status Wayback snapshot available for this URL');
  }
  const row = data[1];
  const timestamp = row[1];
  const original = row[2];
  return {
    url: `https://web.archive.org/web/${timestamp}id_/${original}`,
    timestamp,
  };
}

// Strip dynamic chrome that changes on every fetch without the content moving:
// scripts, styles, inline event handlers, nonces, meta tags (build hashes live
// there), preload links, HTML comments. Cosmetic CMS reshuffles can still
// produce some noise; per-source strip rules can go on the manifest entry if a
// specific page proves chatty.
function cleanHtml(html) {
  const $ = cheerio.load(html);
  $('script, style, noscript, meta, link[rel="preload"]').remove();
  $('*').each((_, el) => {
    const attribs = el.attribs || {};
    for (const name of Object.keys(attribs)) {
      if (name.startsWith('on') || name === 'nonce') {
        $(el).removeAttr(name);
      }
    }
  });
  return $.html().replace(/<!--[\s\S]*?-->/g, '');
}

async function verifyHashOnly(source) {
  const snapshotPath = join(SNAPSHOTS_DIR, `${source.id}.html`);

  let fetchUrl = source.url;
  if (source.via_wayback) {
    try {
      const snap = await resolveWaybackSnapshot(source.url);
      fetchUrl = snap.url;
      log(`  via Wayback: ${snap.timestamp}`);
    } catch (err) {
      return { ...meta(source), status: 'error', reason: `Wayback lookup failed: ${err.message}` };
    }
  }

  let res;
  try {
    res = await fetchWithTimeout(fetchUrl);
  } catch (err) {
    return { ...meta(source), status: 'error', reason: `fetch failed: ${err.message}` };
  }
  if (!res.ok) {
    return { ...meta(source), status: 'error', reason: `HTTP ${res.status}` };
  }
  const cleaned = cleanHtml(await res.text());
  const newHash = sha(cleaned);

  if (!(await fileExists(snapshotPath))) {
    if (!DRY_RUN) {
      await mkdir(SNAPSHOTS_DIR, { recursive: true });
      await writeFile(snapshotPath, cleaned);
    }
    return { ...meta(source), status: 'unchanged', first_run: true, hash: newHash };
  }

  const prev = await readFile(snapshotPath, 'utf8');
  if (sha(prev) === newHash) {
    return { ...meta(source), status: 'unchanged', hash: newHash };
  }
  if (!DRY_RUN) await writeFile(snapshotPath, cleaned);
  return { ...meta(source), status: 'changed', prev_hash: sha(prev), new_hash: newHash };
}

async function archiveIfMissing(source) {
  const ext = source.url.toLowerCase().endsWith('.pdf') ? 'pdf' : 'html';
  const snapshotPath = join(SNAPSHOTS_DIR, `${source.id}.${ext}`);
  if (await fileExists(snapshotPath)) {
    return { ...meta(source), status: 'already_archived' };
  }
  let res;
  try {
    res = await fetchWithTimeout(source.url);
  } catch (err) {
    return { ...meta(source), status: 'error', reason: `fetch failed: ${err.message}` };
  }
  if (!res.ok) {
    return { ...meta(source), status: 'error', reason: `HTTP ${res.status}` };
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (!DRY_RUN) {
    await mkdir(SNAPSHOTS_DIR, { recursive: true });
    await writeFile(snapshotPath, buf);
  }
  return { ...meta(source), status: 'archived', first_run: true, bytes: buf.length };
}

function skip(source) {
  return { ...meta(source), status: 'skipped', mode: source.mode };
}

const DISPATCH = {
  'hash-only': verifyHashOnly,
  'snapshot-only': archiveIfMissing,
  'manual-quarterly': skip,
  'editorial-only': skip,
};

// Bump last_verified to today on any display whose hash-only backing sources
// all verified clean this run. Displays backed only by snapshot-only or
// manual-quarterly sources don't get auto-bumped — those dates move only when
// a human re-checks them. First-run archives don't count as a verification.
function bumpVerified(figures, hashOnlyByUrl, verifiedUrls) {
  const t = today();
  let bumped = 0;

  function consider(display) {
    if (!display?.sources?.length) return;
    const hashOnlySources = display.sources
      .map(s => hashOnlyByUrl.get(s.url))
      .filter(Boolean);
    if (hashOnlySources.length === 0) return;
    const allClean = hashOnlySources.every(s => verifiedUrls.has(s.url));
    if (allClean && display.last_verified !== t) {
      display.last_verified = t;
      bumped++;
    }
  }

  consider(figures.hourly_impact);
  (figures.comparisons || []).forEach(consider);
  (figures.infographics || []).forEach(consider);
  return bumped;
}

function prTitle(changed) {
  if (changed.length === 1) return `Source change detected: ${changed[0].name}`;
  return `Source changes detected: ${changed.length} sources`;
}

async function main() {
  const sources = JSON.parse(await readFile(SOURCES_PATH, 'utf8'));
  console.log(`Verifying ${sources.sources.length} sources (dry_run=${DRY_RUN})...`);

  const results = [];
  for (const source of sources.sources) {
    const fn = DISPATCH[source.mode];
    if (!fn) {
      results.push({ ...meta(source), status: 'error', reason: `unknown mode: ${source.mode}` });
      continue;
    }
    log(`[${source.mode}${source.via_wayback ? '+wayback' : ''}] ${source.id}`);
    const r = await fn(source);
    results.push(r);
    log(`  -> ${r.status}${r.reason ? ' (' + r.reason + ')' : ''}`);
  }

  const byStatus = {};
  for (const r of results) byStatus[r.status] = (byStatus[r.status] || 0) + 1;
  console.log('Summary:', byStatus);

  const changed = results.filter(r => r.status === 'changed');
  const errors = results.filter(r => r.status === 'error');

  let bumped = 0;
  if (changed.length > 0) {
    console.log(`\n${changed.length} source(s) changed; figures.json untouched.`);
    for (const c of changed) console.log(`  - ${c.id}: ${c.name}`);
  } else {
    const verifiedUrls = new Set(
      results.filter(r => r.status === 'unchanged' && !r.first_run).map(r => r.url)
    );
    const hashOnlyByUrl = new Map();
    for (const s of sources.sources) {
      if (s.mode === 'hash-only') hashOnlyByUrl.set(s.url, s);
    }
    const figures = JSON.parse(await readFile(FIGURES_PATH, 'utf8'));
    bumped = bumpVerified(figures, hashOnlyByUrl, verifiedUrls);
    console.log(`\nNo source changes. Bumped ${bumped} display(s).`);
    if (bumped > 0 && !DRY_RUN) {
      await writeFile(FIGURES_PATH, JSON.stringify(figures, null, 2) + '\n');
    }
  }

  if (errors.length > 0) {
    console.log(`\n${errors.length} source(s) had errors:`);
    for (const e of errors) console.log(`  - ${e.id}: ${e.reason}`);
  }

  const summary = {
    today: today(),
    by_status: byStatus,
    changed,
    errors,
    bumped,
    pr_title: changed.length > 0 ? prTitle(changed) : null,
  };
  if (!DRY_RUN) {
    await writeFile(SUMMARY_PATH, JSON.stringify(summary, null, 2));
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
