import About from "@/components/main/About";
import Skills from "@/components/main/Skills";
import ProjectCarousel from "@/components/main/ProjectCarousel";

const Home = () => {
  return (
    <>
      <About />
      <section className="grid md:grid-cols-2 gap-5 px-6">
        <Skills />
        <ProjectCarousel />
      </section>{" "}
    </>
  );
};

export default Home;
