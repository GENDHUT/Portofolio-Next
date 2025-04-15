// components/main/ProjectCarousel.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    title: "FlaskPost",
    description: "Web app untuk kirim email massal, dibuat dengan FastAPI.",
    tags: ["FastAPI", "FastMail", "Jinja2", "MORE..."],
    repo: "#",
  },
  {
    title: "CompileVortex",
    description: "Web-based code editor untuk 40+ bahasa pemrograman.",
    tags: ["React.js", "TypeScript", "Axios", "MORE..."],
    repo: "#",
  },
  {
    title: "QuickMark",
    description: "Editor markdown real-time dengan preview langsung.",
    tags: ["React", "Remark-GFM", "React Markdown", "MORE..."],
    repo: "#",
  },
  {
    title: "InvoicerX",
    description: "Aplikasi faktur otomatis untuk bisnis kecil-menengah.",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "MORE..."],
    repo: "#",
  },
  {
    title: "DevLinker",
    description: "Platform social devs untuk berbagi project & profil.",
    tags: ["Node.js", "Prisma", "NextAuth", "MORE..."],
    repo: "#",
  },
  {
    title: "PixelCraft",
    description: "Tool desain pixel-art dengan fitur drag and paint.",
    tags: ["Canvas API", "TypeScript", "Framer Motion", "MORE..."],
    repo: "#",
  },
  {
    title: "Notely",
    description: "Aplikasi catatan ringan berbasis web dengan autosave.",
    tags: ["React", "LocalStorage", "Tailwind", "MORE..."],
    repo: "#",
  },
  {
    title: "PortoBuilder",
    description: "Generator portofolio statis langsung dari JSON config.",
    tags: ["Next.js", "Framer Motion", "Vercel", "MORE..."],
    repo: "#",
  },
];

const ProjectCarousel = () => {
  const chunkSize = 5;
  const [page, setPage] = useState(0);

  const chunkedProjects = Array.from(
    { length: Math.ceil(projects.length / chunkSize) },
    (_, i) => projects.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, chunkedProjects.length - 1));

  return (
    <section className="min-h-screen py-20 px-6 ">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-center mb-16 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
        >
          Featured Projects
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 mb-12 min-h-[1000px]"
          >
            {chunkedProjects[page].map((project, idx) => (
              <Tilt
                key={idx}
                glareEnable={true}
                glareMaxOpacity={0.2}
                scale={1.02}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                className="w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-zinc-800/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-sm rounded-full shadow-sm hover:brightness-110 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 transition-transform transform hover:scale-110"
                  >
                    <div className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300">
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        alt="GitHub Logo"
                        className="w-5 h-5"
                      />
                    </div>
                  </a>
                </motion.div>
              </Tilt>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg disabled:opacity-40"
          >
            ⬅️ Prev
          </button>
          <button
            onClick={handleNext}
            disabled={page === chunkedProjects.length - 1}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg disabled:opacity-40"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
