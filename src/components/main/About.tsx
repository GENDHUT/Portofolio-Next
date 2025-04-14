// components/main/About.tsx
"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Gendhut</span> 👋
        </h1>
        <h2 className="text-xl md:text-2xl font-medium mb-6">
          A passionate Web Developer based in Indonesia
        </h2>
        <p className="text-base md:text-lg leading-relaxed">
          I love building beautiful and performant web apps using modern technologies.
          Currently focusing on <span className="font-semibold">Next.js, Tailwind CSS</span> and learning more about UI/UX design.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
