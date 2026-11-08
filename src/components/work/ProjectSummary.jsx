import { projectSummaries } from "../../data/projectSummaries";
import { projectObjects } from "../../data/projectObjects";

// ProjectHeader: the top of every case study. Object first, then the title,
// exactly as on the home page. The headline and org are the
// exact words used on the home page (headline bold black, org grey), then the
// "shipped" line and the outcome. One stack, one gap, so line spacing is the
// same on every project.
export function ProjectHeader({ id, children }) {
  const s = projectSummaries[id];
  return (
    <div className="project-header">
      <div>
        {projectObjects[id] && (
          <img className="project-header__object" src={projectObjects[id]} alt="" decoding="async" />
        )}
        <h1 className="project-header__headline">{s.headline}</h1>
        <p className="project-header__org">{s.org}</p>
      </div>
      {children && <p className="project-header__line">{children}</p>}
      <p className="project-header__line">{s.outcome}</p>
    </div>
  );
}

// Kept for any page that still shows the outcome on its own.
export default function ProjectSummary({ id }) {
  return <p className="project-header__line">{projectSummaries[id].outcome}</p>;
}
