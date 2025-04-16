// Components/main/contact.tsx
"use client";

import {
  MessageSquareText,
  Mail,
  User,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL!;
  const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL!;
  const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
  const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL!;
  const EMAIL = process.env.NEXT_PUBLIC_EMAIL!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-pink-500 transition-transform hover:scale-110"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-pink-500 transition-transform hover:scale-110"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-pink-500 transition-transform hover:scale-110"
        >
          <Instagram className="w-6 h-6" />
        </a>
        {/* WhatsApp Icon (SVG) */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-green-500 transition-transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path d="M380.9 97.1C339-5.2 217.9-35 128.7 28.1 39.5 91.2 3.2 205.5 41.6 302.4L1.7 464l168.3-44c91.6 49.4 202.5 9.5 244.4-84.2 38.3-96.8 3.6-211.1-73.5-238.7zM223.6 358c-35.1 0-67.6-11-94.5-32.7l-7.2-5.5-62.3 16.3 16.7-60.7-4.7-7.4C46.4 207 61.4 148.5 108.4 114c47-34.5 108.3-31.5 150.6 7.4 43.2 39.6 58.2 104.7 35.9 158.4-20.1 46.9-64.7 78.2-114.7 78.2z" />
          </svg>
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
