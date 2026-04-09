import { projects } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";
import SectionTitle from "../components/ui/SectionTitle";

export default function FeaturedProjects() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle eyebrow="Selected Work" title="Work" />
        <div className="grid-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.cardDescription}
              company={project.company}
              image={project.image}
              to={`/work/${project.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
