import { playProjects } from "../../data/play";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = playProjects.find((p) => p.slug === "heart-of-insomnia");

export default function HeartOfInsomnia() {
  return (
    <CaseStudyLayout
      backTo="/play"
      backLabel="Play"
      title={project.title}
      image={project.image}
      subtitle={project.subtitle}
      overview={project.overview}
      outcomes={project.outcomes}
      tools={project.tools}
      challenge={project.challenges.join(". ")}
      team={project.team}
      keyLearning={project.keyInsight}
    />
  );
}
