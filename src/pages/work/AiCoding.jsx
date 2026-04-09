import { projects } from "../../data/projects";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = projects.find((p) => p.slug === "ai-coding");

export default function AiCoding() {
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
      impact={project.impact}
      achievements={project.achievements}
      outcomes={project.outcomes}
      client={project.client}
      team={project.team}
      challenge={project.challenge}
      keyLearning={project.keyLearning}
    />
  );
}
