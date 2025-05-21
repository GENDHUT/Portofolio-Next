// component/about/Filosofi.tsx
"use client";

import { motion } from "framer-motion";

const Filosofi = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Filosofi Hidupku{" "}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          Aku bukan yang paling jago. Tapi aku yang paling penasaran. Dan aku
          terus belajar.
        </p>
        <p>"Make it Simple", "Incepto ne desistam"</p>
      </motion.div>
    </section>
  );
};

export default Filosofi;
