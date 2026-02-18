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
import { StaggeredGrid } from "@/components/ui/StaggeredGrid";
import { Code, Rocket, Book, Globe } from "lucide-react";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  const bentoItems = [
    {
      id: 1,
      title: "AI & ML",
      subtitle: "Engineering Systems",
      description: "Building neural architectures that bridge digital and physical worlds.",
      icon: <Code className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Biology",
      subtitle: "Computational Life",
      description: "Decoding the language of life through computational models.",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Education",
      subtitle: "Empowering Minds",
      description: "Mentoring the next generation of engineers and founders.",
      icon: <Book className="w-5 h-5" />,
    },
  ];

  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main className="relative bg-void">
        <Hero />
        <AstronautReveal />
        <About />

        <StaggeredGrid 
          centerText="ANBU"
          bentoItems={bentoItems}
          images={[]}
          className="my-32"
        />

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
