// components/sidebar.tsx
// components/sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  Youtube,
  Instagram,
  PhoneCall,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();
  const [hoveringClose, setHoveringClose] = useState(false);

  const links = [
    { href: "/", label: "</>" },
    { href: "/about", label: "<Me>" },
  ];

  const EMAIL = process.env.NEXT_PUBLIC_EMAIL!;

  const socialLinks = [
    {
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
    },
    {
      href: process.env.NEXT_PUBLIC_GITHUB_URL || "#",
      icon: <Github size={24} />,
      label: "GitHub",
    },
    {
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
      icon: <Mail size={24} />,
      label: "Email",
    },
    {
      href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#",
      icon: <Youtube size={24} />,
      label: "YouTube",
    },
    {
      href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
      icon: <Instagram size={24} />,
      label: "Instagram",
    },
    {
      href: process.env.NEXT_PUBLIC_WHATSAPP_URL || "#",
      icon: <PhoneCall size={24} />,
      label: "WhatsApp",
    },
  ];

  const filteredLinks = links.filter((link) => link.href !== pathname);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 350);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowContent(false);
      setIsOpen(false);
      setIsClosing(false);
    }, 350);
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          aria-label="Open sidebar"
          className="fixed top-1/2 left-6 -translate-y-1/2 z-[9999] w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 animate-float-wave"
          style={{ boxShadow: "0 0 15px 3px rgba(128, 0, 128, 0.7)" }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/giff/minecraft-enchanted-book.gif"
            alt="Enchanted Book"
            className="w-8 h-8"
          />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ clipPath: "circle(0% at 40px 50%)" }}
            animate={{ clipPath: "circle(150% at 40px 50%)" }}
            exit={{ clipPath: "circle(0% at 40px 50%)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 text-white flex flex-col items-center justify-center gap-10 p-8"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* Glow Particles */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)",
              }}
            />
            {/* Tombol Tutup */}
            <motion.button
              onClick={handleClose}
              onMouseEnter={() => setHoveringClose(true)}
              onMouseLeave={() => setHoveringClose(false)}
              aria-label="Close sidebar"
              className="absolute top-6 right-6 text-white font-bold text-xl"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {hoveringClose ? (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Close
                  </motion.span>
                ) : (
                  <motion.div
                    key="icon"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={32} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.p
              className="mt-8 text-center text-lg italic opacity-70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              “Code is like humor. When you have to explain it, it’s bad.”
            </motion.p>

            {/* GENDHUT + Sosial */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <h1
                className="select-none"
                style={{
                  fontFamily: "'Georgia', serif",
                  fontWeight: 900,
                  fontSize: "3rem",
                  letterSpacing: "0.05em",
                }}
              >
                GENDHUT
              </h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex gap-6"
              >
                {socialLinks.map(({ href, icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:text-gradient transition-transform duration-300"
                    whileHover={{ scale: 1.3, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Menu Navigasi */}
            <AnimatePresence>
              {showContent && (
                <motion.nav
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col gap-12 text-4xl font-mono font-bold select-none ${
                    isClosing ? "pointer-events-none" : ""
                  } items-center`}
                >
                  {filteredLinks.map(({ href, label }) => (
                    <motion.div
                      key={href}
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link
                        href={href}
                        onClick={handleClose}
                        className="transition-colors duration-300 hover:text-gradient"
                      >
                        {label}
                      </Link>
                      {/* Underline hover effect */}
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 -bottom-2 w-0 h-1 bg-pink-400 rounded-full group-hover:w-full transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Text Style */}
      <style jsx global>{`
        .hover\\:text-gradient:hover {
          background: linear-gradient(90deg, #c084fc, #ec4899, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
