"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Brain, MapPin } from "lucide-react";
import Counter from "./Counter";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    icon: GraduationCap,
    title: "B.E. — Pre-final Year",
    sub: "Computer Science & Engineering",
    detail:
      "Building a strong foundation across data structures, algorithms, and systems design.",
    tags: ["DSA", "Systems Design", "ML"],
  },
  {
    icon: Briefcase,
    title: "AI-ML Intern — BITS Pilani",
    sub: "June — July 2025",
    detail:
      "Applied Machine Learning and AI research under BITS Pilani Hyderabad faculty.",
    tags: ["Python", "TensorFlow", "Research"],
  },
  {
    icon: Brain,
    title: "Core Skills",
    sub: "ML · DL · CV · LLM Fine-tuning · ROS2",
    detail:
      "Deep experience building intelligent systems from local LLMs to computer vision pipelines.",
    tags: ["Deep Learning", "Computer Vision", "ROS2"],
  },
  {
    icon: Code2,
    title: "Languages & Tools",
    sub: "Python · C++ · Java · C · TypeScript",
    detail:
      "Full-stack capability from embedded systems to modern web applications.",
    tags: ["Python", "C++", "TypeScript"],
  },
];

const STATS = [
  { value: 153, suffix: "+", label: "GitHub Contributions", delay: 0 },
  { value: 6, suffix: "+", label: "Projects Shipped", delay: 0.15 },
  { value: 5, suffix: "", label: "Languages", delay: 0.3 },
  { value: 2, suffix: "", label: "Ventures Founded", delay: 0.45 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isQuoteInView = useInView(quoteRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = bioRef.current?.querySelectorAll(".about-p");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const items = milestonesRef.current?.querySelectorAll(".milestone-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll(".stat-card");
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
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
      id="about"
      className="relative px-6 py-24 sm:px-12 md:py-32 lg:px-24"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-150 h-150 bg-neon/3 blur-[200px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section Header ── */}
        <div className="mb-20 md:mb-28">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-neon/50" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-neon uppercase">
              About
            </span>
          </div>
          <h2 className="font-serif-display font-bold text-display-lg tracking-tight leading-[0.95]">
            <span className="text-stark">Engineer by craft,</span>
            <br />
            <span className="text-gradient-display">explorer by nature.</span>
          </h2>
        </div>

        {/* ── STATS ROW — Bento Cards ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-20"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-card group rounded-2xl border border-void-400 bg-void-100/50 p-6 text-center transition-all duration-300 hover:border-neon/20 hover:bg-void-200/50"
            >
              <Counter
                target={stat.value}
                suffix={stat.suffix}
                duration={2.5}
                delay={stat.delay}
                className="block font-sans font-bold text-4xl md:text-5xl text-gradient"
              />
              <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-stark-dim uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── BIO + MILESTONES GRID ── */}
        <div className="grid gap-16 lg:grid-cols-[1.1fr,1fr] lg:gap-20">
          {/* Left column — Bio */}
          <div ref={bioRef} className="space-y-6">
            {/* Pull quote */}
            <div className="about-p mb-8">
              <p
                className="text-xl md:text-2xl font-serif-display font-semibold leading-normal text-stark/90"
              >
                I&apos;m Anbu Malligarjun — a pre-final year B.E. student
                building at the intersection of{" "}
                <span className="text-neon">artificial intelligence</span>,{" "}
                deep learning, and computer vision.
              </p>
            </div>

            <p
              className="about-p text-[15px] leading-[1.9] text-stark-muted"
              style={{ fontFamily: "var(--font-body)" }}
            >
              From fine-tuning local LLMs to engineering robotics with ROS2 — I
              don&apos;t just study technology, I ship it. My work spans ML
              pipelines, full-stack applications, and open-source tools.
            </p>
            <p
              className="about-p text-[15px] leading-[1.9] text-stark-muted"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Beyond code, I founded Sagittarius Technologies and Sam SciTech —
              bridging science education and entrepreneurship.
            </p>

            {/* Location badge */}
            <div className="about-p flex items-center gap-2 mt-2">
              <MapPin className="h-3.5 w-3.5 text-neon/60" />
              <span className="font-mono text-[11px] tracking-wider text-stark-dim">
                Tamil Nadu, India
              </span>
            </div>

            {/* Quote */}
            <blockquote
              ref={quoteRef}
              className="mt-10 rounded-xl border border-void-400 bg-void-100/50 p-6 transition-all duration-700"
              style={{
                opacity: isQuoteInView ? 1 : 0,
                transform: isQuoteInView ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="mb-3 text-2xl text-neon/30 font-serif-display">&ldquo;</div>
              <p
                className="text-[15px] italic leading-[1.8] text-stark-muted"
                style={{ fontFamily: "var(--font-body)" }}
              >
                It doesn&apos;t matter where you start. It&apos;s how you
                progress from there.
              </p>
              <cite className="mt-4 block font-mono text-[10px] not-italic tracking-[0.15em] text-stark-dim">
                — Personal philosophy
              </cite>
            </blockquote>
          </div>

          {/* Right column — Milestones */}
          <div ref={milestonesRef} className="space-y-5">
            {MILESTONES.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="milestone-item group rounded-2xl border border-void-400 bg-void-100/50 p-6 transition-all duration-300 hover:border-neon/20 hover:bg-void-200/50 hover:-translate-y-1"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon transition-colors group-hover:bg-neon/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-stark">
                        {m.title}
                      </p>
                      <p className="font-mono text-[10px] tracking-wider text-neon">
                        {m.sub}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-[13px] leading-relaxed text-stark-dim mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {m.detail}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-void-300/50 px-2.5 py-1 font-mono text-[10px] tracking-wide text-stark-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
