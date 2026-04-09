import Hero from "../sections/Hero";
import FeaturedProjects from "../sections/FeaturedProjects";
import PlayPreview from "../sections/PlayPreview";
import CommunityPreview from "../sections/CommunityPreview";
import ContactCTA from "../sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <PlayPreview />
      <CommunityPreview />
      <ContactCTA />
    </>
  );
}
