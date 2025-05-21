// about/page.tsx
"use client";
import Gendhut from "@/components/about/gendhut";
import AwalCerita from "@/components/about/awal";
import Ngoding from "@/components/about/ngoding";
import Filosofi from "@/components/about/filosofi";
import LetMe from "@/components/about/Letme";
import NowPast from "@/components/about/nowpast";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const page = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, [setTheme]);

  if (!mounted) return null;
  return (
    <>
      <Gendhut />
      <LetMe />
      <AwalCerita />
      <Ngoding />
      <Filosofi />
      <NowPast />
    </>
  );
};

export default page;
