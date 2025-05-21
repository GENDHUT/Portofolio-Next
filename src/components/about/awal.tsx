// component/about/AwalCerita.tsx
"use client";

import { motion } from "framer-motion";

const AwalCerita = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Awal Cerita{" "}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          Semua berawal dari komputer tua di pojok kamar. Aku bongkar, belajar,
          dan jatuh cinta pada dunia teknologi.
        </p>
      </motion.div>
    </section>
  );
};

export default AwalCerita;
