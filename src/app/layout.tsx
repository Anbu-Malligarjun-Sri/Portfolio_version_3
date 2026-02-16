import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter, Cormorant_Garamond, Fraunces, VT323 } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "600", "700"],
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Anbu Malligarjun — AI Researcher & Engineer",
  description:
    "AI Researcher, Robotics Engineer, and ML Architect. Building intelligent systems at the intersection of deep learning, computer vision, and robotics.",
  keywords: [
    "Anbu Malligarjun",
    "AI Researcher",
    "Machine Learning",
    "Robotics Engineer",
    "Deep Learning",
    "Computer Vision",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} ${fraunces.variable} ${vt323.variable} font-sans antialiased noise`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
