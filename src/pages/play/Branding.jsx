import { playProjects } from "../../data/play";
import CaseStudyLayout from "../../components/layout/CaseStudyLayout";

const project = playProjects.find((p) => p.slug === "branding");

export default function Branding() {
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
      methodology={project.process}
      challenge={project.challenges.join(". ")}
      keyLearning={project.keyInsight}
    />
  );
}
