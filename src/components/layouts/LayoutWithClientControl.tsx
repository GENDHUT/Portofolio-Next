// components/Nav&Footer.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import LoadingScreen from "../components/LoadingScreen";

const LayoutWithClientControl = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <LoadingScreen>
      {isHome && <Navbar />}
      <div className="flex">
        <Sidebar />
        <main className="w-full min-h-screen p-6">{children}</main>
      </div>
      {isHome && <Footer />}
    </LoadingScreen>
  );
};

export default LayoutWithClientControl;
