// Components/main/contact.tsx
"use client";

import {
  MessageSquareText,
  Mail,
  User,
  Github,
  Linkedin,
  Instagram,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL!;
  const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL!;
  const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
  const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL!;
  const EMAIL = process.env.NEXT_PUBLIC_EMAIL!;

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setLoading(false);
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        setStatus("error");
      });
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-24 flex items-center justify-center bg-transparent"
    >
      {/* --- Left Socials --- */}
      <div className="hidden md:flex flex-col items-center gap-4 absolute left-6 top-1/2 -translate-y-1/2 z-10">
        {[GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL, WHATSAPP_URL].map(
          (url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-${
                i === 3 ? "green" : "pink"
              }-500 transition-transform hover:scale-110`}
            >
              {
                [
                  <Github />,
                  <Linkedin />,
                  <Instagram />,
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                    className="w-6 h-6"
                  >
                    <path d="M380.9 97.1C339 36.7 278.5 0 211.8 0 94.9 0 0 94.9 0 211.8c0 37.4 9.8 73.9 28.4 106l-29.8 109 111.8-29.3c30.7 16.8 65.3 25.7 101.3 25.7h.1c116.8 0 211.7-94.9 211.7-211.8 0-56.6-22-109.9-61.6-149.3zM211.8 388.6c-30.7 0-60.7-8.3-86.7-24.1l-6.2-3.7-66.3 17.4 17.7-64.5-4.1-6.5c-17.4-27.3-26.6-58.9-26.6-91.1 0-94.1 76.6-170.7 170.7-170.7 45.6 0 88.4 17.8 120.7 50.1s50.1 75.1 50.1 120.7c.1 94.2-76.5 170.8-170.6 170.8zm101.5-138.5c-5.6-2.8-33.2-16.4-38.4-18.3-5.1-1.9-8.8-2.8-12.5 2.8s-14.4 18.3-17.6 22.1-6.5 4.2-12.1 1.4c-33.1-16.5-54.8-29.5-76.6-66.7-5.8-10 5.8-9.3 16.5-30.9 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.7 6.9c-5 5.6-19.2 18.7-19.2 45.6s19.6 52.9 22.3 56.5c2.8 3.7 38.5 58.7 93.4 82.3 13 5.6 23.1 8.9 31 11.4 13 4.1 24.9 3.5 34.3 2.1 10.4-1.6 33.2-13.5 37.9-26.6 4.7-13.1 4.7-24.3 3.3-26.6-1.3-2.2-5.1-3.6-10.7-6.3z" />
                  </svg>,
                ][i]
              }
            </a>
          )
        )}
        <div className="w-[1px] h-20 bg-zinc-500"></div>
      </div>

      {/* --- Right Email --- */}
      <div className="hidden md:flex flex-col items-center gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-10">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 text-2xl rotate-90 tracking-wider"
        >
          {EMAIL}
        </a>
      </div>

      {/* --- Contact Form --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl p-10 rounded-3xl shadow-2xl ring-1 ring-zinc-200 dark:ring-white/10 bg-gradient-to-br from-pink-300 to-purple-300 dark:bg-zinc-900/60 backdrop-blur-xl"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
          Contact Me <MessageSquareText className="w-8 h-8" />
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-lg relative">
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
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
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
              className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 dark:bg-zinc-800 border ${
                status === "error" && !isValidEmail(form.email)
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
              } focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400`}
            />
          </div>

          {/* Subject */}
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            placeholder="Subject"
            className="w-full pl-4 pr-4 py-4 rounded-xl bg-white/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
          />

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
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Success / Error Notification */}
          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-lg ${
                  status === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status === "success" ? <CheckCircle2 /> : <XCircle />}
                <p>
                  {status === "success"
                    ? "Message sent successfully!"
                    : "Failed to send. Please check your email or try again."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
}
