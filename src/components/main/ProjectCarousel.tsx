// components/main/ProjectCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { projects } from "@/data/data";

const CHUNK_SIZE = 5;

const ProjectCarousel = () => {
  const [page, setPage] = useState(0);
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const totalPages = Math.ceil(projects.length / CHUNK_SIZE);
  const startIdx = page * CHUNK_SIZE;
  const visibleProjects = projects.slice(startIdx, startIdx + CHUNK_SIZE);

  const handlePrev = () => {
    setOpenCardIndex(null);
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setOpenCardIndex(null);
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handleBackdropClick = () => {
    setOpenCardIndex(null);
    setModalImageIndex(0);
  };

  const toggleCard = (index: number) => {
    setDirection(0);
    setOpenCardIndex((prev) => (prev === index ? null : index));
    setModalImageIndex(0);
  };

  const paginate = (newDirection: number) => {
    if (openCardIndex === null) return;
    const newIndex = openCardIndex + newDirection;
    if (newIndex >= 0 && newIndex < projects.length) {
      setDirection(newDirection);
      setOpenCardIndex(newIndex);
      setModalImageIndex(0);
    }
  };

  useEffect(() => {
    if (openCardIndex !== null && projects[openCardIndex].images?.length > 1) {
      const interval = setInterval(() => {
        setModalImageIndex((prev) =>
          (prev + 1) % projects[openCardIndex].images.length
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [openCardIndex, projects]);

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto relative z-0">
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
            className="space-y-8 mb-12 relative min-h-[1005px]"
          >
            {visibleProjects.map((project, idx) => {
              const globalIndex = startIdx + idx;
              return (
                <Tilt
                  key={globalIndex}
                  glareEnable={true}
                  glareMaxOpacity={0.2}
                  scale={1.02}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  className="w-full relative"
                >
                  <motion.div
                    onClick={() => toggleCard(globalIndex)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative cursor-pointer bg-zinc-800/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-base md:text-lg leading-relaxed">
                      {project.description}
                    </p>
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
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 transition-transform transform hover:scale-110 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300">
                          <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                            alt="GitHub Logo"
                            className="w-5 h-5"
                          />
                        </div>
                      </a>
                    )}
                  </motion.div>
                </Tilt>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg disabled:opacity-40"
          >
            ⬅️ Prev
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg disabled:opacity-40"
          >
            Next ➡️
          </button>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {openCardIndex !== null && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={handleBackdropClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                key={openCardIndex}
                className="fixed top-1/2 left-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-2xl p-6 shadow-2xl border border-white/10 z-50"
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                {projects[openCardIndex].images?.length > 0 && (
                  <motion.div className="mb-4 overflow-hidden">
                    <motion.img
                      key={modalImageIndex}
                      src={
                        projects[openCardIndex].images[modalImageIndex] ??
                        projects[openCardIndex].images[0]
                      }
                      alt={`Screenshot ${modalImageIndex + 1}`}
                      onClick={() =>
                        setModalImageIndex((prev) =>
                          (prev + 1) % projects[openCardIndex].images.length
                        )
                      }
                      className="w-full max-h-[400px] object-cover rounded-lg border border-white/10 cursor-pointer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )}

                {projects[openCardIndex].fullDescription && (
                  <p className="text-zinc-300 mb-4">
                    {projects[openCardIndex].fullDescription}
                  </p>
                )}
                {projects[openCardIndex].stack && (
                  <div className="flex flex-wrap gap-2 mb-12">
                    {projects[openCardIndex].stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/10 text-white px-3 py-1 text-sm rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {projects[openCardIndex].repo && (
                  <a
                    href={projects[openCardIndex].repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 transition-transform transform hover:scale-110 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300">
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        alt="GitHub Logo"
                        className="w-5 h-5"
                      />
                    </div>
                  </a>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectCarousel;
