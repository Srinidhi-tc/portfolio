/**
 * Helper for refreshing cached link previews after the OG cards change.
 *
 * Usage:
 *   npm run rescrape                 # print every URL + a Post Inspector link
 *   FB_ACCESS_TOKEN=... npm run rescrape   # additionally re-scrape on Facebook
 *
 * What is and is not automatable:
 *
 *   LinkedIn  no public API. The Post Inspector page IS the cache flush --
 *             opening a URL there re-scrapes it. Links are printed below;
 *             they require you to be signed in, so this cannot be scripted.
 *             LinkedIn caches previews for about 7 days otherwise.
 *   Facebook  Graph API supports it, but needs an access token (required
 *             since 2017-10-16). Set FB_ACCESS_TOKEN to enable.
 *   X, Slack, iMessage, WhatsApp
 *             no public invalidation endpoint; their caches expire on
 *             their own.
 *
 * Note that a LinkedIn post that has ALREADY been published keeps its
 * original preview permanently. Re-scraping only affects future shares.
 * To force a fresh preview everywhere regardless of cache, share a
 * versioned URL (…/work/?v=2) -- caches key on the exact URL string, and
 * the router ignores unknown query parameters.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { site, routes } = JSON.parse(readFileSync(join(ROOT, "scripts", "routes.json"), "utf8"));

const urlFor = (r) => site.origin + site.base + (r.path === "/" ? "/" : r.path + "/");
const urls = routes.map(urlFor);

console.log(`\n${urls.length} URLs\n`);
console.log("LinkedIn — open each (signed in); the page load performs the re-scrape:\n");
for (const u of urls) {
  console.log(`  ${u}`);
  console.log(`    https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(u)}`);
}

const token = process.env.FB_ACCESS_TOKEN;
if (!token) {
  console.log("\nFacebook: set FB_ACCESS_TOKEN to re-scrape there too (skipped).");
} else {
  console.log("\nFacebook — re-scraping via Graph API:\n");
  for (const u of urls) {
    const endpoint =
      `https://graph.facebook.com/?id=${encodeURIComponent(u)}` +
      `&scrape=true&access_token=${encodeURIComponent(token)}`;
    try {
      const res = await fetch(endpoint, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      console.log(`  ${res.ok ? "ok  " : "FAIL"} ${u}${body.error ? `  ${body.error.message}` : ""}`);
    } catch (err) {
      console.log(`  FAIL ${u}  ${err.message}`);
    }
  }
}
console.log("");
