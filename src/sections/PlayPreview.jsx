import { playProjects } from "../data/play";
import ProjectCard from "../components/ui/ProjectCard";
import SectionTitle from "../components/ui/SectionTitle";

export default function PlayPreview() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          eyebrow="Experiments & Side Projects"
          title="Play"
          subtitle="Blurring The Line Between Work and Play!"
        />
        <div className="grid-4">
          {playProjects.slice(0, 4).map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.cardDescription}
              image={project.image}
              video={project.video}
              to={`/play/${project.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
