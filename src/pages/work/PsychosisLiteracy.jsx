import { projects } from "../../data/projects";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = projects.find((p) => p.slug === "psychosis-literacy");

export default function PsychosisLiteracy() {
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
      audiences={project.audiences}
      outcomes={project.outcomes}
      methodology={project.methodology}
      tools={project.tools}
      designApproach={project.designApproach}
      challenge={project.challenge}
      client={project.client}
      team={project.team}
      keyLearning={project.keyLearning}
    />
  );
}
