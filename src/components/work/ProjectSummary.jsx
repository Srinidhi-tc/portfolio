import { projectSummaries } from "../../data/projectSummaries";

// Name (bold) and outcome (regular), shown right below a case study's title line.
export default function ProjectSummary({ id, color, hideName }) {
  const s = projectSummaries[id];
  return (
    <div style={{ marginTop: "var(--padding-small)", color }}>
      {/* Skipped where the title above already names the project. */}
      {!hideName && <p style={{ margin: 0, fontWeight: "var(--weight-bold)" }}>{s.name}</p>}
      <p style={{ margin: 0, fontWeight: "var(--weight-regular)" }}>{s.outcome}</p>
    </div>
  );
}
