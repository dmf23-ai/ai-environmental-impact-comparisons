#!/usr/bin/env python3
"""
self-test.py — STEP-0 health check for the autonomous-mode chain.

Verifies before any real work:
  1. PAT file exists and is non-empty
  2. github.com is reachable from the sandbox via git ls-remote
  3. autonomous-config.json is parseable
  4. Last commit on local main matches remote main (no drift)
  5. (Optional) Quick astro build dry-run to catch broken HEAD

Returns 0 if all green, 1 if any check fails. Prints a structured report.
"""
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAT_FILE = ROOT / ".claude" / "github-pat.txt"
CONFIG_FILE = ROOT / ".claude" / "autonomous-config.json"


def run(cmd: list[str], cwd: Path = ROOT) -> tuple[int, str]:
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=30)
    return r.returncode, (r.stdout + r.stderr).strip()


def check(label: str, ok: bool, detail: str = "") -> bool:
    status = "PASS" if ok else "FAIL"
    print(f"  [{status}] {label}" + (f"  ({detail})" if detail else ""))
    return ok


def main() -> int:
    print("self-test: running pre-flight health checks...")
    results = []

    # 1. PAT exists, non-empty
    pat_ok = PAT_FILE.exists() and PAT_FILE.stat().st_size > 20
    results.append(check(
        "PAT file present and non-trivial",
        pat_ok,
        f"path={PAT_FILE}, size={PAT_FILE.stat().st_size if PAT_FILE.exists() else 'missing'}",
    ))
    if not pat_ok:
        print("self-test: ABORTING — no usable PAT")
        return 1

    # 2. Config parseable
    try:
        cfg = json.loads(CONFIG_FILE.read_text())
        results.append(check("Config parseable", True, f"repo={cfg['repo']}"))
    except Exception as e:
        results.append(check("Config parseable", False, str(e)[:80]))
        return 1

    # 3. github.com reachable (auth via PAT)
    pat = PAT_FILE.read_text().strip()
    remote = f"https://x-access-token:{pat}@github.com/{cfg['repo']}.git"
    rc, out = run(["git", "ls-remote", remote, cfg["branch"]])
    api_ok = rc == 0 and len(out) > 0
    redacted = out.replace(pat, "[REDACTED]") if api_ok else "(auth or network error)"
    results.append(check(
        "github.com reachable + PAT auth",
        api_ok,
        redacted[:60] if api_ok else "ls-remote failed",
    ))
    if not api_ok:
        return 1

    # 4. local HEAD vs remote HEAD
    remote_sha = out.split()[0]
    rc, local_sha = run(["git", "rev-parse", "HEAD"])
    drift = remote_sha != local_sha
    results.append(check(
        "Local HEAD matches remote (no drift)",
        not drift,
        f"local={local_sha[:10]} remote={remote_sha[:10]}" if drift else f"sha={remote_sha[:10]}",
    ))
    # Drift isn't always fatal — local may be ahead with unpushed commits.
    # Just report it.

    all_pass = all(results)
    print(f"self-test: {'ALL GREEN' if all_pass else 'FAILURES FOUND'}")
    return 0 if all_pass else 1


if __name__ == "__main__":
    sys.exit(main())
