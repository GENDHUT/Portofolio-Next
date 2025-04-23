// components/Navbar.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/components/contexts/SoundContext";
import { Menu, X } from "lucide-react";


const navItems = [
  { label: "About", target: "about" },
  { label: "Skills", target: "skills-project" },
  { label: "Contact", target: "contact" },
];

const logoLetters = "GENDHUT.ID".split("");
const containerVariants = {
  animate: { transition: { staggerChildren: 0.08 } },
};
const letterVariants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 20 },
  },
  loop: {
    y: [0, -3, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { soundEnabled, toggleSound } = useSound();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const themeSoundRef = useRef<HTMLAudioElement | null>(null);
  const soundToggleRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);

    themeSoundRef.current = new Audio("/sounds/Jawa.mp3");
    soundToggleRef.current = new Audio("/sounds/mac-quack.mp3");

    themeSoundRef.current.volume = 0.5;
    soundToggleRef.current.volume = 0.5;

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playSound = (ref: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (soundEnabled && ref.current) {
      ref.current.currentTime = 0;
      ref.current.play();
    }
  };

  const handleThemeToggle = () => {
    playSound(themeSoundRef);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSoundToggle = () => {
    if (soundToggleRef.current) {
      soundToggleRef.current.currentTime = 0;
      soundToggleRef.current.play();
    }

    toggleSound();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav
      className={`fixed w-full z-50 px-6 transition-all duration-300 ease-in-out text-white ${
        scrolled
          ? "py-2 backdrop-blur-sm bg-indigo-500/70"
          : "py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo Animation */}
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
  
        {/* Theme & Sound Toggles + Mobile Menu Button */}
        {mounted && (
          <div className="flex gap-3 items-center">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
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
  
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 text-black shadow-md hover:scale-110 transition-transform"
            >
              <AnimatePresence mode="wait" initial={false}>
                {soundEnabled ? (
                  <motion.div
                    key="volume-on"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Volume2 size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="volume-off"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VolumeX size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
  
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden ml-2 text-black bg-orange-400 p-2 rounded-md"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        )}
      </div>
  
      {/* Desktop Nav Items */}
      <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 gap-6 text-2xl font-extrabold">
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
  
      {/* Mobile Nav Items */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-4 flex flex-col gap-3 text-xl font-bold bg-indigo-600/80 p-4 rounded-md"
          >
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={`#${item.target}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}