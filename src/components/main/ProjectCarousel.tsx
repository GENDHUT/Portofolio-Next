// components/main/ProjectCarousel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { projects } from "@/data/data";
import { useSound } from "@/components/contexts/SoundContext";

const CHUNK_SIZE = 5;

export default function ProjectCarousel() {
  const { soundEnabled } = useSound();
  const [page, setPage] = useState(0);
  const [openCardIndexes, setOpenCardIndexes] = useState<number[]>([]);
  const [modalImageIndexes, setModalImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [modalPositions, setModalPositions] = useState<{
    [key: number]: { x: number; y: number };
  }>({});

  const openSoundRef = useRef<HTMLAudioElement | null>(null);
  const closeSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const awoshSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (soundEnabled) {
      openSoundRef.current = new Audio("/sounds/clicksoundeffect.mp3");
      closeSoundRef.current = new Audio("/sounds/switch-sound.mp3");
      hoverSoundRef.current = new Audio("/sounds/kaizoku-hover.mp3");
      awoshSoundRef.current = new Audio("/sounds/Coin.mp3");
    }
  }, [soundEnabled]);

  const handleHoverSound = () => {
    if (soundEnabled && hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  const totalPages = Math.ceil(projects.length / CHUNK_SIZE);
  const startIdx = page * CHUNK_SIZE;
  const visibleProjects = projects.slice(startIdx, startIdx + CHUNK_SIZE);

  const handlePrev = () => {
    if (soundEnabled && awoshSoundRef.current) {
      awoshSoundRef.current.currentTime = 0;
      awoshSoundRef.current.play();
    }
    setPage((p) => Math.max(p - 1, 0));
  };

  const handleNext = () => {
    if (soundEnabled && awoshSoundRef.current) {
      awoshSoundRef.current.currentTime = 0;
      awoshSoundRef.current.play();
    }
    setPage((p) => Math.min(p + 1, totalPages - 1));
  };

  const toggleCard = (idx: number) => {
    const isOpen = openCardIndexes.includes(idx);
    const ref = isOpen ? closeSoundRef : openSoundRef;

    if (soundEnabled && ref.current) {
      ref.current.currentTime = 0;
      ref.current.play();
    }

    if (isOpen) {
      setOpenCardIndexes(openCardIndexes.filter((i) => i !== idx));
    } else {
      setOpenCardIndexes([...openCardIndexes, idx]);
      setModalImageIndexes((prev) => ({ ...prev, [idx]: 0 }));
      setModalPositions((prev) => ({
        ...prev,
        [idx]: { x: 0, y: 0 },
      }));
    }
  };

  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {};
    openCardIndexes.forEach((idx) => {
      if (projects[idx].images?.length > 1) {
        intervals[idx] = setInterval(() => {
          setModalImageIndexes((prev) => ({
            ...prev,
            [idx]: (prev[idx] + 1) % projects[idx].images.length,
          }));
        }, 3000);
      }
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [openCardIndexes]);

  useEffect(() => {
    document.body.style.overflow =
      openCardIndexes.length > 0 ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCardIndexes]);

  const [orientations, setOrientations] = useState<
    Record<number, "portrait" | "landscape">
  >({});
  return (
    <motion.section
      className="min-h-screen py-20 px-6"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            className="space-y-8 mb-12 min-h-[1210px]"
          >
            {visibleProjects.map((p, i) => {
              const gi = startIdx + i;
              return (
                <Tilt key={gi} glareEnable scale={1.02}>
                  <motion.div
                    onClick={() => toggleCard(gi)}
                    onMouseEnter={handleHoverSound}
                    whileHover={{ scale: 1.01 }}
                    className="relative cursor-pointer bg-zinc-800/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                    <p className="text-base md:text-lg leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-sm rounded-full shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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

        {/* MULTIPLE DRAGGABLE MODALS */}
        <AnimatePresence>
          {openCardIndexes.map((idx) => {
            const currentIndex = modalImageIndexes[idx] ?? 0;
            const mediaItems = [
              ...(projects[idx]?.giff?.map((src) => ({ type: "gif", src })) ??
                []),
              ...(projects[idx]?.mp4?.map((src) => ({ type: "video", src })) ??
                []),
              ...(projects[idx]?.images?.map((src) => ({
                type: "image",
                src,
              })) ?? []),
            ].filter((item) => item.src && item.src.trim());

            const current = mediaItems[currentIndex];
            if (!current) return null;

            return (
              <motion.div
                key={idx}
                className="fixed z-[9999] backdrop-blur-3xl bg-white/10 dark:bg-black/10 border border-white/20 rounded-2xl shadow-2xl"
                drag
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onDragEnd={(_, info) => {
                  setModalPositions((prev) => ({
                    ...prev,
                    [idx]: {
                      x: (prev[idx]?.x || 0) + info.delta.x,
                      y: (prev[idx]?.y || 0) + info.delta.y,
                    },
                  }));
                }}
                style={{
                  top: `20%`,
                  left: `30%`,
                  transform: `translate(-50%, -50%)`,
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  width: "600px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  position: "fixed",
                }}
              >
                {/* Header */}
                <div className="relative bg-indigo-700 text-white px-4 py-2 rounded-t-2xl">
                  <span className="text-3xl pr-10">{projects[idx]?.title}</span>
                  <button
                    onClick={() => {
                      if (soundEnabled && closeSoundRef.current) {
                        closeSoundRef.current.currentTime = 0;
                        closeSoundRef.current.play();
                      }
                      setOpenCardIndexes((prev) =>
                        prev.filter((id) => id !== idx)
                      );
                    }}
                    className="absolute top-1 right-1 text-3xl font-bold w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 transition"
                  >
                    &times;
                  </button>
                </div>

                {/* Content */}
                <div className="p-4  overflow-y-auto max-h-[75vh] relative">
                  <div className="flex justify-center mb-4 relative w-full h-[300px] overflow-hidden rounded-lg">
                    <AnimatePresence initial={false} mode="wait">
                      {current.type === "video" ? (
                        <motion.video
                          key={current.src}
                          src={current.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          onClick={() =>
                            setModalImageIndexes((prev) => ({
                              ...prev,
                              [idx]: ((prev[idx] ?? 0) + 1) % mediaItems.length,
                            }))
                          }
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 cursor-pointer transition-all duration-300 w-full h-auto"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      ) : (
                        <motion.img
                          key={current.src}
                          src={current.src}
                          alt={`Slide ${currentIndex + 1}`}
                          onLoad={(e) => {
                            const { naturalWidth, naturalHeight } =
                              e.currentTarget;
                            setOrientations((prev) => ({
                              ...prev,
                              [idx]:
                                naturalHeight > naturalWidth
                                  ? "portrait"
                                  : "landscape",
                            }));
                          }}
                          onClick={() =>
                            setModalImageIndexes((prev) => ({
                              ...prev,
                              [idx]: ((prev[idx] ?? 0) + 1) % mediaItems.length,
                            }))
                          }
                          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 cursor-pointer transition-all duration-300 ${
                            orientations[idx] === "portrait"
                              ? "max-h-full w-auto"
                              : "w-full h-auto"
                          }`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Deskripsi */}
                  {Array.isArray(projects[idx]?.fullDescription) ? (
                    <ul className="space-y-1">
                      {projects[idx].fullDescription.map((text, i) =>
                        text.startsWith("~") ? (
                          <li
                            key={i}
                            className="ml-5 list-disc text-lg font-semibold"
                          >
                            {text.slice(1)}
                          </li>
                        ) : (
                          <p
                            key={i}
                            className="mb-2 text-lg font-bold leading-relaxed"
                          >
                            {text}
                          </p>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="mb-2 font-bold text-sm leading-relaxed">
                      {projects[idx]?.fullDescription}
                    </p>
                  )}
                </div>

                {/* Footer / Repo Link */}
                {(projects[idx]?.repo || projects[idx]?.wa) && (
                  <a
                    href={projects[idx]?.wa || projects[idx]?.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 transform hover:scale-110 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-xl">
                      <img
                        src={
                          projects[idx]?.wa
                            ? "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        }
                        alt={
                          projects[idx]?.wa ? "WhatsApp Logo" : "GitHub Logo"
                        }
                        className="w-5 h-5"
                      />
                    </div>
                  </a>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
