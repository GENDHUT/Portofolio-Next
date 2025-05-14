// components/Nav&Footer.tsx

"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "../components/LoadingScreen";

export default function LayoutWithClientControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/car";

  return (
    <LoadingScreen>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </LoadingScreen>
  );
}
