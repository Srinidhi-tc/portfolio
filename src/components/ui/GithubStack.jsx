// GitHub link with the contribution count under it. Hovering (or focusing)
// shows the contribution heatmap for the last year.
//
// The count and heatmap are a snapshot from github.com/Srinidhi-tc, saved in
// src/data/githubHeatmap.json. Update both when the number changes.
import PrimaryLink from "./PrimaryLink";
import heatmap from "../../data/githubHeatmap.json";

export const GITHUB_URL = "https://github.com/Srinidhi-tc";
export const GITHUB_CONTRIBUTIONS = 288;

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
      <PrimaryLink href={GITHUB_URL}>Github</PrimaryLink>
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
