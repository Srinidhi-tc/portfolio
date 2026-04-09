import { projects } from "../../data/projects";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = projects.find((p) => p.slug === "strabospot");

export default function Strabospot() {
  return (
    <CaseStudyLayout
      backTo="/work"
      backLabel="Work"
      eyebrow={project.company}
      title={project.title}
      image={project.image}
      subtitle={project.subtitle}
      overview={project.overview}
      problem={project.problem}
      outcomes={project.outcomes}
      methodology={project.methodology}
      client={project.client}
      team={project.team}
      challenge={project.challenge}
      links={project.links}
      keyLearning={project.keyLearning}
    />
  );
}
