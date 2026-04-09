import { playProjects } from "../../data/play";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = playProjects.find((p) => p.slug === "butterfly");

export default function Butterfly() {
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
      keyLearning={project.keyInsight}
    />
  );
}
