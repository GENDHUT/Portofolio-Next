// components/Navbar.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Volume2, VolumeX, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/components/contexts/SoundContext";

// ==== Config ====
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

// ==== Component ====
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { soundEnabled, toggleSound } = useSound();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const themeSoundRef = useRef<HTMLAudioElement | null>(null);
  const soundToggleRef = useRef<HTMLAudioElement | null>(null);

  // ==== Side Effects ====
  useEffect(() => {
    setMounted(true);

    // Load sounds
    themeSoundRef.current = new Audio("/sounds/Jawa.mp3");
    soundToggleRef.current = new Audio("/sounds/mac-quack.mp3");

    themeSoundRef.current.volume = 0.5;
    soundToggleRef.current.volume = 0.5;

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      const about = document.getElementById("about");
      const skills = document.getElementById("skills-project");
      const contact = document.getElementById("contact");

      if (contact && scrollY >= contact.offsetTop) {
        setActiveSection("contact");
      } else if (skills && scrollY >= skills.offsetTop) {
        setActiveSection("skills");
      } else if (about && scrollY >= about.offsetTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }

      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ==== Handlers ====
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
    playSound(soundToggleRef);
    toggleSound();
  };

  const getNavbarGradient = () => {
    if (hoveredNav === "about" || activeSection === "about")
      return "from-red-500 to-green-500";
    if (hoveredNav === "skills" || activeSection === "skills")
      return "from-green-500 to-pink-500";
    if (hoveredNav === "contact" || activeSection === "contact")
      return "from-pink-500 to-purple-500";
    return "from-indigo-500 via-purple-500 to-pink-500";
  };

  // ==== JSX ====
  return (
    <nav
      className={`fixed w-full z-50 px-6 transition-all duration-500 ease-in-out text-white bg-gradient-to-r ${getNavbarGradient()} ${
        scrolled ? "py-2 backdrop-blur-sm" : "py-3"
      }`}
    >
      {/* Logo + Actions */}
      <div className="flex justify-between items-center">
        <a href="https://www.gendhut.my.id" rel="noopener noreferrer">
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
        </a>

        {mounted && (
          <div className="flex gap-3 items-center">
            {/* Theme toggle */}
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

            {/* Sound toggle */}
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

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden ml-2 p-2 rounded-md bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 text-black shadow-md hover:scale-110 transition-transform"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        )}
      </div>

      {/* Desktop Nav Items */}
      <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 gap-6 text-2xl font-extrabold">
        {navItems.map(({ label, target }) => {
          const hoverColor =
            label === "About"
              ? "group-hover:text-blue-500"
              : label === "Skills"
              ? "group-hover:text-purple-500"
              : "group-hover:text-pink-500";

          return (
            <motion.li
              key={label}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`group cursor-pointer ${hoverColor}`}
              onMouseEnter={() => setHoveredNav(label.toLowerCase())}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <a
                href={`#${target}`}
                className="transition duration-300 ease-in-out"
              >
                <span
                  className={`transition duration-300 ease-in-out ${
                    activeSection === label.toLowerCase() && !hoveredNav
                      ? label === "About"
                        ? "text-blue-600"
                        : label === "Skills"
                        ? "text-purple-600"
                        : "text-pink-200"
                      : "bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
                  } group-hover:text-current group-hover:bg-none`}
                >
                  {label}
                </span>
              </a>
            </motion.li>
          );
        })}
      </ul>

      {/* Mobile Menu (overlay) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`
        lg:hidden
        absolute top-full left-0 w-full
        px-6 py-4
        rounded-b-xl
        text-lg font-semibold
        shadow-xl backdrop-blur-md
        bg-gradient-to-br ${getNavbarGradient()}
        text-white
        transition-all duration-300
        space-y-3
      `}
          >
            {navItems.map(({ label, target }) => (
              <li key={label}>
                <a
                  href={`#${target}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md transition duration-300 ${
                    label === "About"
                      ? "hover:text-blue-300"
                      : label === "Skills"
                      ? "hover:text-purple-300"
                      : "hover:text-green-300"
                  }`}
                >
                  <span className="bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent text-xl font-bold">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
