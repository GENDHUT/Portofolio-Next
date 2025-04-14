// components/main/ProjectCarousel.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "FlaskPost",
    description: "Web app untuk kirim email massal, dibuat dengan FastAPI.",
    tags: ["FastAPI", "FastMail", "Jinja2", "MORE..."],
  },
  {
    title: "CompileVortex",
    description: "Web-based code editor untuk 40+ bahasa pemrograman.",
    tags: ["React.js", "TypeScript", "Axios", "MORE..."],
  },
  {
    title: "QuickMark",
    description: "Editor markdown real-time dengan preview langsung.",
    tags: ["React", "Remark-GFM", "React Markdown", "MORE..."],
  },
];

const ProjectCarousel = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 15 },
  });

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-center mb-20 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Featured Projects
        </motion.h2>

        <div ref={sliderRef} className="keen-slider">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="keen-slider__slide flex justify-center"
              initial={{ opacity: 0.5, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 text-zinc-900 rounded-2xl p-8 w-full max-w-md shadow-xl transition-all">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4 text-zinc-800">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/70 text-sm px-3 py-1 rounded-full shadow-sm text-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
