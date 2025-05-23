// components/ScrollGlow.tsx
"use client";
import { useEffect, useState } from "react";

const ScrollGlow = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.4);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-light-effect"
      style={{ transform: `translateY(${offset}px)` }}
    />
  );
};

export default ScrollGlow;
