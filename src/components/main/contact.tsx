// Components/main/contact.tsx
"use client";

import { MessageSquareText, Mail, User, Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-24 flex items-center justify-center bg-transparent"
    >
      {/* --- Left Social Icons --- */}
      <div className="hidden md:flex flex-col items-center gap-4 absolute left-6 top-1/2 -translate-y-1/2 z-10">
        <a
          href="https://github.com/GENDHUT"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-pink-500 transition-transform hover:scale-110"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-raya-putra-a39686351/"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-pink-500 transition-transform hover:scale-110"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://www.instagram.com/gendhut_ganteng/"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-pink-500 transition-transform hover:scale-110"
        >
          <Instagram className="w-6 h-6" />
        </a>
        <div className="w-[1px] h-20 bg-zinc-500"></div>
      </div>

      {/* --- Right Email Vertical --- */}
      <div className="hidden md:flex flex-col items-center gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-10">
        <a
          href="mailto:gendhutid12345678910@gmail.com"
          className=" hover:text-pink-500 text-2xl rotate-90 tracking-wider"
        >
          gendhutid12345678910@gmail.com
        </a>
      </div>

      {/* --- Contact Form Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl p-10 rounded-3xl shadow-2xl ring-1 ring-zinc-200 dark:ring-white/10
        bg-gradient-to-br from-pink-300 to-purple-300 dark:bg-zinc-900/60 backdrop-blur-xl"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
          Contact Me <MessageSquareText className="w-8 h-8" />
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-lg">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 w-6 h-6" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 
              focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 w-6 h-6" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 
              focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquareText className="absolute left-3 top-5 text-zinc-500 dark:text-zinc-400 w-6 h-6" />
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Type your message..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 
              focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition hover:scale-[1.01]"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
