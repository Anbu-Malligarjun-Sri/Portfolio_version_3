"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ui/project-card";
import SectionHeading from "./SectionHeading";
import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  featured: boolean;
}

const projects: Project[] = projectsData;

/* Placeholder images from /Yotube/ folder */
const placeholderImages = [
  "/Yotube/background.png",
  "/Yotube/logo.jpg",
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 py-28 sm:px-12 lg:py-32 lg:px-24 bg-void"
    >
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-125 w-125 rounded-full bg-neon/2 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-100 w-100 rounded-full bg-purple-500/1.5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
          subtitle="Technical work across ML, full-stack systems, and open-source tools. Driven by curiosity, built with precision."
          align="center"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3 justify-items-center items-stretch"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              className="project-card w-full max-w-105"
              title={project.title}
              description={project.description}
              imgSrc={project.image || placeholderImages[index % placeholderImages.length]}
              link={project.link}
              linkText="View Project"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
