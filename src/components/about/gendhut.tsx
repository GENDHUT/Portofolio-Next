// component/about/gendhut.tsx
// component/about/gendhut.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Image from "next/image";

// Character pools (Kanji, Katakana, Hiragana)
const kanjiChars =
  "日月火水木金土上下左右大中小人今時私名語年生先学校気車電話食飲".split("");
const katakana =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split(
    ""
  );
const hiragana =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(
    ""
  );
const scramblePool = [...kanjiChars, ...katakana, ...hiragana];

const neonColors = [
  "#FF00FF",
  "#00FFFF",
  "#39FF14",
  "#FFFF00",
  "#FF1493",
  "#00FF00",
  "#FF4500",
  "#7CFC00",
  "#00CED1",
  "#DA70D6",
];

const originalText = "Halo, Aku Gendhut";
const hoveredText = "ハロー、私 は GENDHUT です";

// Scramble function for text effect
const scramble = (from: string, to: string, step: number): string => {
  return to
    .split("")
    .map((char, index) => {
      if (step > index) {
        return char;
      }
      return from[index]
        ? scramblePool[Math.floor(Math.random() * scramblePool.length)]
        : " ";
    })
    .join("");
};

const Gendhut = () => {
  const [isHover, setIsHover] = useState(false);
  const [hasHoveredOnce, setHasHoveredOnce] = useState(false);
  const [displayText, setDisplayText] = useState(originalText);
  const [step, setStep] = useState(0);
  const [neonColorIndex, setNeonColorIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showFloatingGif, setShowFloatingGif] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const colorChangeSpeed = 4000;

  const { scrollY } = useScroll();
  const floppaY = useTransform(scrollY, [0, 300], [0, 50]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);

  // Scramble text effect
  useEffect(() => {
    setIsMounted(true);

    if (isHover && !hasHoveredOnce) {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setStep(i);
        setDisplayText(scramble(originalText, hoveredText, i));
        if (i >= hoveredText.length) {
          clearInterval(interval);
          setHasHoveredOnce(true);
          setDisplayText(hoveredText);
        }
      }, 80);

      return () => clearInterval(interval);
    }
  }, [isHover, hasHoveredOnce]);

  // Neon effect
  useEffect(() => {
    if (hasHoveredOnce) {
      const colorInterval = setInterval(() => {
        setNeonColorIndex((prev) => (prev + 1) % neonColors.length);
      }, colorChangeSpeed);

      return () => clearInterval(colorInterval);
    }
  }, [hasHoveredOnce]);

  // Mouse floating image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    if (showFloatingGif) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showFloatingGif]);

  // Scroll-based visibility
  const paragraphRef = useRef(null);
  const isInView = useInView(paragraphRef, {
    once: false,
    amount: 0.4,
  });

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl text-center px-4"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 tracking-tight flex items-center justify-center gap-3 transition-all duration-500"
          style={{
            scale: titleScale,
            opacity: titleOpacity,
            y: titleY,
            ...(hasHoveredOnce
              ? {
                  color: neonColors[neonColorIndex],
                  textShadow: `0 0 10px ${neonColors[neonColorIndex]}, 0 0 20px ${neonColors[neonColorIndex]}`,
                }
              : isHover
              ? {
                  color: "#C084FC",
                  textShadow: "0 0 10px rgba(180,100,255,0.6)",
                }
              : {}),
          }}
          onMouseEnter={() => {
            if (!hasHoveredOnce) setIsHover(true);
            setShowFloatingGif(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
            setShowFloatingGif(false);
          }}
        >
          <AnimatePresence>
            {displayText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ y: floppaY }}
          >
            <Image
              src="/about/hey-floppa.webp"
              alt="Gendhut Emoji"
              width={48}
              height={48}
              className="inline-block transition-transform duration-500 hover:rotate-6"
            />
          </motion.div>
        </motion.h1>

        <motion.p
          ref={paragraphRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 40,
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-lg md:text-xl leading-relaxed text-zinc-300"
        >
          Namaku{" "}
          <span className="text-purple-300 font-semibold">
            Muhammad Putra Perdana
          </span>
          , tapi orang-orang lebih akrab memanggilku{" "}
          <span className="italic text-pink-400">Gendhut</span>.
        </motion.p>
      </motion.div>

      {showFloatingGif && (
        <Image
          src="/about/skype-emoji-cool.webp"
          alt="Floating Gif"
          width={64}
          height={64}
          className="pointer-events-none z-50 transition-transform duration-150"
          style={{
            position: "fixed",
            top: mousePosition.y,
            left: mousePosition.x,
          }}
        />
      )}
    </section>
  );
};

export default Gendhut;
