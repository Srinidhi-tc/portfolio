import { Link } from "react-router-dom";
import { workSectionProjects } from "../../data/workSectionProjects";

// Renders live directly in src/assets/, imported like every other project
// image so Vite hashes/bundles them the same way as the rest of the site.
import azureRender from "../../assets/azuretop.webp";
import tutorRender from "../../assets/tutortop.webp";
import pulseRender from "../../assets/pulsetop.webp";
import malliRender from "../../assets/mallitop.webp";
import bloomRender from "../../assets/bloomtop.webp";
import mindRender from "../../assets/mindtop.webp";
import defenseArkRender from "../../assets/defensearktop.webp";

// Maps each new render + one-word label onto the EXISTING project data
// (by id) so `to`, `title`, etc. stay a single source of truth.
const ROW_ITEMS = {
  "microsoft":          { label: "Azure",      image: azureRender },
  "ai-coding":          { label: "Tutor",       image: tutorRender },
  "hearts-of-insomnia": { label: "Pulse",       image: pulseRender },
  "malli":              { label: "Malli",       image: malliRender },
  "bee-feeder":         { label: "Bloom",       image: bloomRender },
  "psychosis-literacy": { label: "Mind",        image: mindRender },
  "defenseark":         { label: "DefenseARK",  image: defenseArkRender },
};

// The group label and separators only appear while the row is hovered or
// focused (see .project-row-group-label / ::before in index.css).
const GROUPS = [
  { label: "UI/UX",         ids: ["ai-coding", "defenseark"] },
  { label: "Physical",      ids: ["hearts-of-insomnia", "malli", "bee-feeder"] },
  { label: "Human Context", ids: ["microsoft", "psychosis-literacy"] },
];

export default function ProjectRow() {
  return (
    <nav className="project-row" aria-label="Project shortcuts">
      <ul className="project-row-list">
        {GROUPS.map((group) => (
          <li key={group.label} className="project-row-group">
            <span className="project-row-group-label" aria-hidden="true">
              {group.label}
            </span>
            <ul className="project-row-group-items" aria-label={group.label}>
              {group.ids.map((id, index) => {
                const item = ROW_ITEMS[id];
                const project = workSectionProjects.find((p) => p.id === id);
                if (!item || !project) return null; // fails safe if data shape ever changes

                // Each icon drifts toward the group's centre on hover.
                const n = group.ids.length;
                const toCentre = Math.sign((n - 1) / 2 - index);
                const huddleX = toCentre * (n === 2 ? 4 : 5);

                return (
                  <li
                    key={id}
                    className="project-row-item"
                    style={{ "--huddle-x": `${huddleX}px`, "--i": index }}
                  >
                    <Link
                      to={project.to}
                      className="project-row-link"
                      aria-label={`${project.name ?? project.title} project`}
                    >
                      <img
                        src={item.image}
                        alt={`${project.name ?? project.title} project`}
                        className="project-row-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="project-row-label" aria-hidden="true">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
