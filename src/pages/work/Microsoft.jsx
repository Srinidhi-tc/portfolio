import { projects } from "../../data/projects";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = projects.find((p) => p.slug === "microsoft");

export default function Microsoft() {
  return (
    <CaseStudyLayout
      backTo="/work"
      backLabel="Work"
      eyebrow={project.company}
      title={project.title}
      image={project.image}
      subtitle={project.subtitle}
      problem={project.problem}
      audiences={project.audiences}
      outcomes={project.outcomes}
      methodology={project.methodology}
      tools={project.tools}
      designApproach={project.designApproach}
      team={project.team}
      keyLearning={project.keyLearning}
    />
  );
}
