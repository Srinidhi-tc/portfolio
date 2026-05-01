import { playProjects } from "../../data/play";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = playProjects.find((p) => p.slug === "digital-confetti");

export default function DigitalConfetti() {
  return (
    <CaseStudyLayout
      backTo="/play"
      backLabel="Play"
      title={project.title}
      image={project.image}
      video={project.video}
      subtitle={project.subtitle}
      overview={project.overview}
      outcomes={project.outcomes}
      tools={project.tools}
      methodology={project.methodology}
      keyLearning={project.keyInsight}
    />
  );
}
