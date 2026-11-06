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
//                       GALLERY (Home.jsx) and ORDER (Footer.jsx)
import WorkSection from "../sections/WorkSection";
import { GanttChart, RecordList, ContextSections, EXPERIENCE, EDUCATION } from "./About";
import { socialLinks } from "../data/links";
import TennisBall from "../components/ui/TennisBall";
import FloatingMascot from "../components/ui/FloatingMascot";
import Malli from "./work/Malli";

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
