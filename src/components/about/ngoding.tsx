// component/about/Ngoding.tsx
"use client";

import { motion } from "framer-motion";

const Ngoding = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Ngoding? Pelan-pelan{" "}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          HTML. CSS. Lalu Laravel. Unity. Dan sekarang... aku bikin web kayak
          gini.
        </p>
      </motion.div>
    </section>
  );
};

export default Ngoding;
