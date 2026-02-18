import StoryHero from "@/components/sections/StoryHero";
import StoryOrigins from "@/components/sections/StoryOrigins";
import StoryMission from "@/components/sections/StoryMission";
import StoryValues from "@/components/sections/StoryValues";
import StoryProcess from "@/components/sections/StoryProcess";
import StoryTeam from "@/components/sections/StoryTeam";
import StoryPhilosophy from "@/components/sections/StoryPhilosophy";
import StoryTestimonials from "@/components/sections/StoryTestimonials";

export default function StoryPage() {
  return (
    <main>
      <StoryHero />
      <StoryOrigins />
      <StoryMission />
      <StoryValues />
      <StoryProcess />
      <StoryTeam />
      <StoryPhilosophy />
      <StoryTestimonials />
    </main>
  );
}