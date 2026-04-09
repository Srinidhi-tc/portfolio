import { playProjects } from "../data/play";
import ProjectCard from "../components/ui/ProjectCard";
import SectionTitle from "../components/ui/SectionTitle";

export default function Play() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="PLAY"
          subtitle="Blurring The Line Between Work and Play!"
        />
        <div className="grid-2">
          {playProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.cardDescription}
              image={project.image}
              to={`/play/${project.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
