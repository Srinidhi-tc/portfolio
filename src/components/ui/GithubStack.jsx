// GitHub link with the contribution count under it. Hovering (or focusing)
// shows the contribution heatmap for the last year.
//
// The count and heatmap come from github.com/Srinidhi-tc. scripts/github-heatmap.mjs
// refreshes src/data/githubHeatmap.json before every build (so every deploy).
import PrimaryLink from "./PrimaryLink";
import data from "../../data/githubHeatmap.json";

const heatmap = data.days;

export const GITHUB_URL = "https://github.com/Srinidhi-tc";
export const GITHUB_CONTRIBUTIONS = data.total;

// Days in columns of seven (one column per week), oldest first.
function weeks() {
  const out = [];
  const first = new Date(heatmap[0][0] + "T00:00:00Z").getUTCDay();
  let col = new Array(first).fill(null);
  for (const day of heatmap) {
    col.push(day);
    if (col.length === 7) { out.push(col); col = []; }
  }
  if (col.length) out.push(col);
  return out;
}

export default function GithubStack() {
  return (
    <div className="github-stack">
      <PrimaryLink href={GITHUB_URL}>GitHub</PrimaryLink>
      <span className="github-stack__count">{GITHUB_CONTRIBUTIONS} code contributions</span>
      <div className="github-heatmap" role="img" aria-label={`${GITHUB_CONTRIBUTIONS} contributions in the last year`}>
        {weeks().map((w, i) => (
          <div key={i} className="github-heatmap__week">
            {w.map((d, j) => (
              <span key={j} className={"github-heatmap__day" + (d ? ` lvl-${d[1]}` : " is-empty")} title={d ? d[0] : undefined} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
