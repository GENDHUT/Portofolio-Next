// components/main/skills.tsx
"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const skillGroups = [
  {
    title: "Backend",
    items: [
      { name: "PHP", icon: "php" },
      { name: "TS", icon: "ts" },
      { name: "Laravel", icon: "laravel" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "Python", icon: "python" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "CSS", icon: "css" },
      { name: "JS", icon: "javascript" },
      { name: "Tailwind", icon: "tailwind" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Mobile | Game | Desktop",
    items: [
      { name: "Expo", icon: "react" },
      { name: "Electron	", icon: "electron	" },
      { name: "Flutter", icon: "flutter" },
      { name: "Unity (C#)", icon: "unity" },
      { name: "Godot", icon: "godot" },
    ],
  },
  {
    title: "Learning & Exploring",
    items: [
      { name: "Linux", icon: "linux" },
      { name: "Ubuntu", icon: "ubuntu" },
      { name: "deno", icon: "deno" },
      { name: "Nginx", icon: "nginx" },
    ],
  },
];

const Skills = () => {
  return (
    <motion.section
      className="min-h-screen py-20 px-6"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-center mb-20 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        >
          My Skills
        </motion.h2>

        <div className="space-y-14">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xl md:text-2xl text-center font-medium mb-6">
                {group.title}
              </h3>

              <div className="flex flex-wrap justify-center gap-6">
                {group.items.map((skill, i) => (
                  <Tilt
                    key={skill.name}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    scale={1.05}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="w-24 h-24 bg-gradient-to-br from-zinc-200 to-zinc-250 rounded-xl shadow-lg flex items-center justify-center p-2 hover:scale-105 transition-transform group relative"
                    >
                      {/* Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-250 dark:from-zinc-700 dark:to-zinc-950 rounded-xl opacity-0 group-hover:opacity-90 dark:group-hover:opacity-80 transition-all duration-300 z-10"></div>
                      {/* Diatas Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold z-20 group-hover:text-zinc-100 dark:group-hover:text-zinc-200">
                        {skill.name}
                      </div>
                      <Image
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=light`}
                        alt={skill.name}
                        width={60}
                        height={60}
                        unoptimized
                        className="object-contain"
                      />
                    </motion.div>
                  </Tilt>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
