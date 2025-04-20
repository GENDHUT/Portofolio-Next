// Components/main/me.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const Me = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="me"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20"
    >
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl text-center md:text-left"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            01.{" "}
          </span>
          About Me
        </h1>
        <h2 className="text-base md:text-lg leading-relaxed mb-4">
          I’m a passionate developer who loves crafting elegant and efficient
          digital experiences. Whether it's building smooth UIs or complex
          back-end systems, I'm all in. Currently exploring game dev and machine learning.
        </h2>
        <h2 className="text-base md:text-lg leading-relaxed">
          When I'm not coding, I enjoy coffee, games, and learning new tech!
        </h2>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative group rounded-lg overflow-hidden border-2 shadow-xl transition-all duration-500
          ${hovered ? "border-pink-500 scale-105 shadow-pink-500/30" : "border-gray-600"}
        `}
      >
        {/* Pseudo-frame effect */}
        <div
          className={`absolute -inset-[6px] z-[-1] rounded-lg bg-gradient-to-br from-purple-400 to-pink-600 opacity-25 transition-all duration-500 blur-lg ${
            hovered ? "scale-110 opacity-40" : "scale-100 opacity-20"
          }`}
        />

        <Image
          src="/logos/laravel.png"
          alt="Me"
          width={320}
          height={400}
          className={`object-cover transition-all duration-700 ease-in-out transform ${
            hovered ? "scale-110 grayscale-0" : "scale-100 grayscale"
          }`}
          priority
        />
      </motion.div>
    </section>
  );
};

export default Me;
