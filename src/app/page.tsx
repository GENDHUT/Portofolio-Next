// page.tsx
import About from "@/components/main/About";
import Skills from "@/components/main/Skills";
import ProjectCarousel from "@/components/main/ProjectCarousel";
import Contact from "@/components/main/contact";
import Me from "@/components/main/Me";
const Home = () => {
  return (
    <>
      <About />
      <section id="about">
        <Me />
      </section>

      <section id="skills-project" className="grid md:grid-cols-2 gap-5 px-6">
        <Skills />
        <ProjectCarousel />
      </section>

      <section id="contact" className="px-6 py-20">
        <Contact />
      </section>
    </>
  );
};

export default Home;
