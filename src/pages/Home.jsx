import Hero from "../sections/Hero";
import WorkSection from "../sections/WorkSection";
import PlayPreview from "../sections/PlayPreview";
import CommunityPreview from "../sections/CommunityPreview";
import ContactCTA from "../sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <PlayPreview />
      <CommunityPreview />
      <ContactCTA />
    </>
  );
}
