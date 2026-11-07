// Refreshes src/data/githubHeatmap.json from the public GitHub contribution
// calendar (github.com/users/<user>/contributions). Runs before every build.
// If GitHub can't be reached, the saved snapshot is kept and the build goes on.
import { writeFileSync } from "node:fs";

const USER = "Srinidhi-tc";
const OUT = new URL("../src/data/githubHeatmap.json", import.meta.url);

try {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { "User-Agent": "portfolio-build" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const days = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="(\d)"/g)]
    .map((m) => [m[1], Number(m[2])])
    .sort((a, b) => a[0].localeCompare(b[0]));
  const total = Number((html.match(/([\d,]+)\s+contributions?\s+in the last year/) || [])[1]?.replace(/,/g, ""));
  if (days.length < 300 || !Number.isFinite(total)) throw new Error("unexpected page format");
  writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), total, days }));
  console.log(`github-heatmap: ${total} contributions, ${days[0][0]} to ${days.at(-1)[0]}`);
} catch (e) {
  console.warn(`github-heatmap: kept saved snapshot (${e.message})`);
}
