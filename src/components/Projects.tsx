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
          label="The Engineer"
          title="Projects"
          subtitle="Technical work across ML, full-stack systems, and computational biology. Driven by curiosity, built with precision."
          align="center"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              className="project-card w-full"
              title={project.title}
              description={project.description}
              link={project.link}
              linkText="View Project"
              tags={project.tags}
              featured={project.featured}
            />
          ))}
        </div>

        {/* "More coming" indicator */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-dashed border-void-400/60 bg-void-100/40 px-8 py-5 text-stark-dim transition-colors duration-300 hover:border-neon/30 hover:text-neon">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-void-400/60 text-lg">
              +
            </div>
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-stark-muted">
                More Projects Coming
              </p>
              <p className="text-[11px] text-stark-dim">
                Currently building &amp; shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
