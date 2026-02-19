"use client";

import dynamic from "next/dynamic";

import Hero from "@/components/Hero";
import AstronautReveal from "@/components/AstronautReveal";
import VenturesPreview from "@/components/VenturesPreview";
import Projects from "@/components/Projects";
import InternshipsTimeline from "@/components/InternshipsTimeline";
import ToolsSection from "@/components/ToolsSection";
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
        <InternshipsTimeline />
        <ToolsSection />
        <VenturesPreview />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
