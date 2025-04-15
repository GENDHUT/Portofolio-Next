// components/main/About.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const waving = {
  rotate: [0, 20, -10, 20, -5, 0],
  transition: { duration: 1.5, repeat: Infinity },
};

const words = ["Web", "Android", "Desktop", "Game"];

const About = () => {
  const [currentWord, setCurrentWord] = useState("Web");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const index = words.indexOf(prev);
        return words[(index + 1) % words.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Gradient blur background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-pink-300/10 to-transparent dark:from-purple-900/20 dark:via-pink-900/10 pointer-events-none blur-2xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center z-10"
      >
        {/* Heading with waving emoji */}
        <motion.h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I’m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            GENDHUT
          </span>{" "}
          <motion.span className="inline-block" animate={waving}>
            👋
          </motion.span>
        </motion.h1>

        {/* Typing effect text */}
        <h2 className="text-xl md:text-2xl font-medium mb-6">
          A passionate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold transition-all">
            {currentWord}
          </span>{" "}
          Developer based in Indonesia
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed mb-8">
          I love building beautiful and performant web apps using modern
          technologies. Currently focusing on:
        </p>

        {/* Tech Stack Badges */}
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {["Front End", "Back End", "Game "].map((tech) => (
            <span
              key={tech}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm shadow hover:scale-105 transition-transform"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-lg font-semibold italic mb-4">
          "Make it Simple" - "Incepto ne desistam
          "
        </p>

        {/* CTA Button */}
        <a
          href="https://www.linkedin.com/in/muhammad-raya-putra-a39686351/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:scale-105 transition-transform shadow-lg"
        >
          Checkout my Link IDN
        </a>
      </motion.div>
    </section>
  );
};

export default About;
