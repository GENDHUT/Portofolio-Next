// components/LoadingScreen.tsx
"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 5000); 
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
        <img
          src="/Logo.gif"
          alt="Loading..."
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return <>{children}</>;
}
