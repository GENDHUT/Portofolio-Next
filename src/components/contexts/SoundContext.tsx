// components/contexts/SoundContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SoundContextType = {
  soundEnabled: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used within SoundProvider");
  return context;
};
