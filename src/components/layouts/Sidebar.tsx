// components/sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "</>" },
    { href: "/about", label: "<Me>" },
  ];

  const filteredLinks = links.filter((link) => link.href !== pathname);

  // Buka sidebar dan tampilkan konten setelah animasi clipPath
  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowContent(true);
    }, 350); // delay sama dengan durasi animasi clipPath
  };

  // Tutup konten dengan animasi lalu tutup sidebar
  const handleClose = () => {
    setIsClosing(true); // mulai animasi keluar konten
    setTimeout(() => {
      setShowContent(false);
      setIsOpen(false);
      setIsClosing(false);
    }, 350); // durasi animasi sama
  };

  return (
    <>
      {/* Tombol bubble sidebar tertutup */}
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

      {/* Sidebar fullscreen dengan animasi clipPath dan animasi konten */}
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
            {/* Tombol tutup dengan animasi hover */}
            <motion.button
              onClick={handleClose}
              aria-label="Close sidebar"
              className="absolute top-6 right-6 text-white text-3xl font-bold"
              whileHover={{ scale: 1.15, color: "#f472b6" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              &times;
            </motion.button>

            {/* Konten sidebar, animasi keluar masuk */}
            <AnimatePresence>
              {showContent && (
                <motion.nav
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col gap-12 text-4xl font-mono font-bold select-none ${
                    isClosing ? "pointer-events-none" : ""
                  }`}
                >
                  {filteredLinks.map(({ href, label }) => (
                    <motion.div
                      key={href}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={href}
                        onClick={handleClose}
                        className="hover:text-pink-300 transition"
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
