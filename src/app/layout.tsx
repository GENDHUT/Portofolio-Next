// app/layout.tsx
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWithClientControl from "@/components/layouts/LayoutWithClientControl";
import { SoundProvider } from "@/components/contexts/SoundContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GENDHUT Portofolio",
  description: "Personal Portofolio GENDHUT",
  icons: {
    icon: "/Logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SoundProvider>
            <LayoutWithClientControl>{children}</LayoutWithClientControl>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
