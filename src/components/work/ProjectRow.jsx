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
const ROW_ITEMS = [
  { id: "microsoft",          label: "Azure",      image: azureRender },
  { id: "ai-coding",          label: "Tutor",       image: tutorRender },
  { id: "hearts-of-insomnia", label: "Pulse",       image: pulseRender },
  { id: "malli",              label: "Malli",       image: malliRender },
  { id: "bee-feeder",         label: "Bloom",       image: bloomRender },
  { id: "psychosis-literacy", label: "Mind",        image: mindRender },
  { id: "defenseark",         label: "DefenseARK",  image: defenseArkRender },
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
                  src={item.image}
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
