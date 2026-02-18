import HeroSection from "@/components/sections/HeroSection";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <section id="home" data-section>
        <HeroSection />
      </section>
      <section id="about" data-section>
        <About />
      </section>
      <section id="services" data-section>
        <Services />
      </section>
      <section id="process" data-section>
        <Process />
      </section>
      <section id="testimonials" data-section>
        <Testimonials />
      </section>
      <section id="contact" data-section>
        <Contact />
      </section>
    </main>
  );
}