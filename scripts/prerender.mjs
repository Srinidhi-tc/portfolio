/**
 * Post-build prerender for GitHub Pages.
 *
 * Vite emits a single dist/index.html. GitHub Pages serves files by path, so a
 * request for /portfolio/work has no matching file and returns HTTP 404 — the
 * SPA 404.html redirect then repairs it in the browser. That works for humans
 * but not for crawlers: LinkedIn, Slack, Twitter and Facebook do not run JS,
 * so they only ever see the 404 and render no link preview.
 *
 * This script writes a real HTML file for every known route:
 *
 *     dist/work/index.html
 *     dist/work/microsoft/index.html
 *     ...
 *
 * Each is a byte-for-byte copy of the built index.html with its own <title>,
 * description, canonical and Open Graph / Twitter tags swapped in. Result:
 *   - GitHub Pages returns 200 for every real route (no 404 hop at all)
 *   - every shared URL previews with its own title, description and image
 *   - React Router still boots and takes over exactly as before
 *
 * public/404.html stays in place as the fallback for anything not listed here
 * (typos, deleted routes), so nothing regresses.
 *
 * Pure Node, no dependencies — safe to run on the CI runner.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const manifest = JSON.parse(readFileSync(join(ROOT, "scripts", "routes.json"), "utf8"));
const { site, routes } = manifest;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Tags this script owns. Stripped from the template so they can't duplicate. */
const MANAGED = [
  /[ \t]*<title>[\s\S]*?<\/title>\r?\n?/gi,
  /[ \t]*<meta\s+name="description"[^>]*>\r?\n?/gi,
  /[ \t]*<meta\s+property="og:[^"]*"[^>]*>\r?\n?/gi,
  /[ \t]*<meta\s+name="twitter:[^"]*"[^>]*>\r?\n?/gi,
  /[ \t]*<link\s+rel="canonical"[^>]*>\r?\n?/gi,
];

/**
 * Canonical URL for a route. GitHub Pages serves directory indexes, so a
 * request for /portfolio/work 301s to /portfolio/work/ — the trailing-slash
 * form is what actually returns 200, so that is the canonical form.
 */
const urlFor = (route) =>
  site.origin + site.base + (route.path === "/" ? "/" : route.path + "/");

function metaBlock(route) {
  const url = urlFor(route);
  const img = site.origin + (route.image || site.defaultImage);
  const t = esc(route.title);
  const d = esc(route.description);

  return `    <title>${t}</title>
    <meta name="description" content="${d}" />
    <meta name="author" content="${esc(site.author)}" />
    <link rel="canonical" href="${esc(url)}" />

    <!-- Open Graph — per-route, injected by scripts/prerender.mjs -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(site.author)} — Portfolio" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(img)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${t}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${esc(img)}" />
`;
}

function render(template, route) {
  let html = template;
  // Drop the author tag too, so the block below is the single source of truth.
  html = html.replace(/[ \t]*<meta\s+name="author"[^>]*>\r?\n?/gi, "");
  for (const re of MANAGED) html = html.replace(re, "");

  if (!html.includes("</head>")) throw new Error("template has no </head>");
  return html.replace("</head>", `${metaBlock(route)}  </head>`);
}

function sitemap() {
  const urls = routes
    .map((r) => {
      const priority = r.path === "/" ? "1.0" : r.path === "/work" ? "0.9" : "0.8";
      return `  <url>\n    <loc>${esc(urlFor(r))}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const template = readFileSync(join(DIST, "index.html"), "utf8");

let count = 0;
for (const route of routes) {
  const html = render(template, route);
  const outPath =
    route.path === "/"
      ? join(DIST, "index.html")
      : join(DIST, route.path.replace(/^\//, ""), "index.html");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  console.log(`  ${route.path.padEnd(26)} -> ${outPath.replace(DIST, "dist")}`);
  count++;
}

writeFileSync(join(DIST, "sitemap.xml"), sitemap(), "utf8");
console.log(`\nPrerendered ${count} routes + sitemap.xml`);
