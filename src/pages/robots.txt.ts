// Dynamic robots.txt — uses Astro.site for the Sitemap line so the
// reference stays correct across domain changes.

import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") ?? "https://ai-environmental-impact-comparisons.vercel.app";
  const body = `User-agent: *
Allow: /
Disallow: /dev/

Sitemap: ${base}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
