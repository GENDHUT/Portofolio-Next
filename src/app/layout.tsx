// app/layout.tsx
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LoadingScreen from "@/components/components/LoadingScreen";
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
    icon: "/logo.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SoundProvider>
            <LoadingScreen>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </LoadingScreen>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
