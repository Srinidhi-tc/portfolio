import { Link } from "react-router-dom";
import { workSectionProjects } from "../../data/workSectionProjects";

// Vite's configured base ("/portfolio/") so paths resolve correctly on
// GitHub Pages without hardcoding the subpath.
const BASE = import.meta.env.BASE_URL;

// Maps each new render file + one-word label onto the EXISTING project data
// (by id) so `to`, `title`, etc. stay a single source of truth. No new
// project data is created here — this only adds display metadata for the
// row itself.
const ROW_ITEMS = [
  { id: "microsoft",          label: "Azure",      file: "azure.png" },
  { id: "ai-coding",          label: "Tutor",       file: "tutor.png" },
  { id: "hearts-of-insomnia", label: "Pulse",       file: "pulse.png" },
  { id: "malli",              label: "Malli",       file: "malli.png" },
  { id: "bee-feeder",         label: "Bloom",       file: "bloom.png" },
  { id: "psychosis-literacy", label: "Mind",        file: "mind.png" },
  { id: "defenseark",         label: "DefenseARK",  file: "defenseark.png" },
];

export default function ProjectRow() {
  return (
    <nav className="project-row" aria-label="Project shortcuts">
      <ul className="project-row-list">
        {ROW_ITEMS.map((item) => {
          const project = workSectionProjects.find((p) => p.id === item.id);
          if (!project) return null; // fails safe if data shape ever changes

          return (
            <li key={item.id} className="project-row-item">
              <Link
                to={project.to}
                className="project-row-link"
                aria-label={`${project.title} project`}
              >
                <img
                  src={`${BASE}project-renders/${item.file}`}
                  alt={`${project.title} project`}
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
    </nav>
  );
}
