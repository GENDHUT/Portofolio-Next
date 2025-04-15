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

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white fixed w-full z-50">
      {/* Left: Logo */}
      <div className="font-bold text-xl">LOGO</div>

      {/* Center: Navigation */}
      <ul className="flex gap-6 text-lg">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={`#${item.target}`}
              className="cursor-pointer hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right: Theme Toggle */}
      {mounted && (
        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 flex items-center justify-center"
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
                <Moon size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      )}
    </nav>
  );
}
