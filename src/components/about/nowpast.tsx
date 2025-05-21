// component/about/NowPast.tsx
"use client";

import { motion } from "framer-motion";

const NowPast = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Sekarang & Besok{" "}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          Aku masih belajar, masih berkembang. Tujuanku? Jadi solusi lewat kode
          dan karya.{" "}
        </p>
      </motion.div>
    </section>
  );
};

export default NowPast;
