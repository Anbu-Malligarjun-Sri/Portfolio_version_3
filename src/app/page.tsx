"use client";

import dynamic from "next/dynamic";

import Hero from "@/components/Hero";
import AstronautReveal from "@/components/AstronautReveal";
import About from "@/components/About";
import Experience from "@/components/Experience";
import VenturesPreview from "@/components/VenturesPreview";
import Projects from "@/components/Projects";
import InternshipsTimeline from "@/components/InternshipsTimeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main className="relative bg-void">
        <Hero />
        <AstronautReveal />
        <About />
        <Experience />
        <VenturesPreview />
        <Projects />
        <InternshipsTimeline />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
