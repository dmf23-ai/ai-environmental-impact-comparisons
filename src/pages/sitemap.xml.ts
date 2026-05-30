// Dynamic sitemap — uses Astro.site so URLs stay correct when the
// custom domain lands (just change Astro.site in astro.config.mjs).
// Excludes /dev/* (QA pages) and any non-canonical entry.

import type { APIRoute } from "astro";

interface Page {
  path: string;
  priority: string;
  changefreq: string;
}

const pages: Page[] = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/comparisons/", priority: "0.8", changefreq: "monthly" },
  { path: "/methods/", priority: "0.6", changefreq: "monthly" },
];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") ?? "https://ai-environmental-impact-comparisons.vercel.app";
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${base}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
