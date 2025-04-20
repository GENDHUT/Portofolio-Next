// components/Navbar.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", target: "about" },
  { label: "Skills", target: "skills-project" },
  { label: "Contact", target: "contact" },
];

const logoLetters = "GENDHUT.ID".split("");

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
  loop: {
    y: [0, -3, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 30); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`transition-all duration-300 ease-in-out fixed w-full z-50 px-6 ${
        scrolled
          ? "py-2 backdrop-blur-sm bg-indigo-500/70"
          : "py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      } text-white`}
    >
      {/* Flex container untuk logo dan toggle */}
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <motion.div
          className="flex space-x-0.5 text-2xl font-extrabold"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {logoLetters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              animate={["animate", "loop"]}
              className="inline-block bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Right: Theme Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 text-black shadow-md hover:scale-110 transition-transform"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>

      {/* Centered Nav Items */}
      <ul className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-6 text-2xl font-extrabold">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={`#${item.target}`}
              className="cursor-pointer bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
