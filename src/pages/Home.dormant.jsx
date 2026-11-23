// Home.dormant.jsx
//
// Dormant home-page content from before the STACKS + Fs redesign. Nothing
// here is rendered on the home grid; each export is a complete component.
// To revive one:
//   1. Import it in Home.jsx: import { GanttTimeline } from "./Home.dormant"
//   2. Render it where you want: <GanttTimeline />
//
// Exports:
//   WorkLanding         the previous Work landing: "I design for moments when
//                       people can't afford confusion" tagline, project row,
//                       thumbnail cards and the Problem / Decisions / Tradeoff /
//                       Impact toggle (src/sections/WorkSection.jsx)
//   GanttTimeline       the career graph (About)
//   ExperienceSection   the Experience list (About)
//   EducationSection    the Education list (About)
//   ContextCopy         "The common thread? Context." and "Design is more
//                       than making things usable" (About)
//   SocialLinks         Instagram and Behance links
//   TennisBallToy       the ball you throw to the dog (src/components/ui/TennisBall.jsx)
//   DogMascot           the dog mascot (src/components/ui/FloatingMascot.jsx)
//   MalliProject        the Malli 2.0 gallery page (src/pages/work/Malli.jsx);
//                       to revive, add its route in App.jsx and list it in
//                       GALLERY (below) and ORDER (Footer.jsx)
//   GalleryList         the previous Gallery view: Heart and Bloom as project
//                       rows (replaced by LabStacks, the Gallery lab)
import WorkSection from "../sections/WorkSection";
import { GanttChart, RecordList, ContextSections, EXPERIENCE, EDUCATION } from "./About";
import { socialLinks } from "../data/links";
import TennisBall from "../components/ui/TennisBall";
import FloatingMascot from "../components/ui/FloatingMascot";
import Malli from "./work/Malli";
import { Link } from "react-router-dom";
import { workSectionProjects } from "../data/workSectionProjects";
import { projectObjects } from "../data/projectObjects";

export function WorkLanding() {
  return <WorkSection />;
}

export function GanttTimeline() {
  return <GanttChart />;
}

export function ExperienceSection() {
  return <RecordList heading="Experience" rows={EXPERIENCE} />;
}

export function EducationSection() {
  return <RecordList heading="Education" rows={EDUCATION} />;
}

export function ContextCopy() {
  return <ContextSections />;
}

export function SocialLinks() {
  return (
    <p className="contact-links">
      {socialLinks.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link">{label}</a>
      ))}
    </p>
  );
}

export function TennisBallToy() {
  return <TennisBall />;
}

export function DogMascot() {
  return <FloatingMascot />;
}

export function MalliProject() {
  return <Malli />;
}

// The previous Gallery list: physical objects, one per row, right aligned.
export const GALLERY = [
  { id: "hearts-of-insomnia", title: "Heart" },
  { id: "bee-feeder",         title: "Bloom" },
];

export function GalleryList() {
  return GALLERY.map(({ id, title }) => {
    const p = workSectionProjects.find((x) => x.id === id);
    const src = projectObjects[id];
    return (
      <div key={id} className="stack stack--small stack--right home-v2__right">
        <Link to={p.to} className="home-item__link">
          {src ? <img className="home-item__object" src={src} alt={title} decoding="async" />
               : <span className="home-item__title">{title}</span>}
          <span className="home-item__meta">{p.title}</span>
        </Link>
      </div>
    );
  });
}
