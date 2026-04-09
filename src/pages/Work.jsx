import { projects } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";
import SectionTitle from "../components/ui/SectionTitle";
import ContactCTA from "../sections/ContactCTA";

export default function Work() {
  return (
    <>
      <section className="page-section">
        <div className="container">
          <SectionTitle title="WORK" />
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
      <ContactCTA />
    </>
  );
}
