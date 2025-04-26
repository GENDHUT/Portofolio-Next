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
        className="max-w-xl text-center md:text-left space-y-4"
      >
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            01.{" "}
          </span>
          About Me
        </h1>
        <p className="text-base md:text-lg leading-relaxed">
          I am a passionate self-taught programmer who loves to learn by building real projects.
          I enjoy exploring Python through games, animations, and backend development with Laravel and Next.js.
          Every project I create is a step in my journey to master coding and turn creative ideas into real applications.
        </p>
        <p className="text-base md:text-lg leading-relaxed ">
          Whether it's building smooth UIs or complex back-end systems, I'm all in.
          Currently exploring game dev and machine learning.
        </p>
        <p className="text-base md:text-lg leading-relaxed">
          When I'm not coding, I enjoy coffee, games, and learning new tech!
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-500 shadow-lg
          ${
            hovered
              ? "border-pink-500 scale-105 shadow-pink-500/30"
              : "border-gray-600"
          }
        `}
      >
        {/* Gradient frame effect */}
        <div
          className={`absolute -inset-[6px] z-[-1] rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 blur-lg transition-all duration-500 ${
            hovered ? "opacity-40 scale-110" : "opacity-20 scale-100"
          }`}
        />

        <Image
          src="/PP.jpg"
          alt="Me"
          width={320}
          height={400}
          className={`object-cover transition-all duration-700 ease-in-out transform ${
            hovered ? "scale-110 grayscale-0" : "scale-100 grayscale"
          } rounded-lg`}
          priority
        />
      </motion.div>
    </section>
  );
};

export default Me;
