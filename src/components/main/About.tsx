// components/main/About.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const waving = {
  rotate: [0, 20, -10, 20, -5, 0],
  transition: { duration: 1.5, repeat: Infinity },
};

const words = ["Web", "Android", "Desktop", "Game"];
const mottos = ["Make it Simple", "Incepto ne desistam"];

const About = () => {
  const [currentWord, setCurrentWord] = useState("Web");

  // Typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const index = words.indexOf(prev);
        return words[(index + 1) % words.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for motto
  const [mottoIndex, setMottoIndex] = useState(0);
  const [mottoDisplay, setMottoDisplay] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentMotto = mottos[mottoIndex];

    if (typing) {
      if (mottoDisplay.length < currentMotto.length) {
        timeout = setTimeout(() => {
          setMottoDisplay(currentMotto.slice(0, mottoDisplay.length + 1));
        }, 80);
      } else {
        // Pause after fully typed
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (mottoDisplay.length > 0) {
        timeout = setTimeout(() => {
          setMottoDisplay(currentMotto.slice(0, mottoDisplay.length - 1));
        }, 50);
      } else {
        // Move to next motto after deleting
        setMottoIndex((prev) => (prev + 1) % mottos.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [mottoDisplay, typing, mottoIndex]);

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
          Developer based in{" "}
          <span className="relative inline-block">
            Indonesia
            <motion.img
              src="https://cdn.jsdelivr.net/npm/flag-icons@5.0.0/flags/4x3/id.svg"
              alt="Indonesia Flag"
              className="absolute top-0 left-full ml-2 w-8 h-8 animate-pulse"
            />
          </span>
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed mb-8">
          I am a student who studies computer stuff and modern technology
          because it has been my hobby since I was little. I love building
          beautiful and performant apps using modern technologies. Currently
          focusing on:
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

        {/* Motto with typing effect */}
        <p className="text-lg font-semibold italic mb-4 min-h-[30px]">
          <span className="border-r-2 border-pink-500 animate-pulse pr-1">
            {mottoDisplay}
          </span>
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
