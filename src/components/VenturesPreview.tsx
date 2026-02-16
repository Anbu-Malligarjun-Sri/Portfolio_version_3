"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Youtube, Feather, ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const VENTURES = [
  {
    id: "sagittarius",
    title: "Sagittarius",
    subtitle: "De-extinction through biotechnology",
    description:
      "Reversing extinction. Restoring ecology. Rewriting biology's greatest tragedies through advanced genomics and environmental DNA.",
    icon: Rocket,
    href: "/sagittarius",
    accent: "emerald",
    accentColor: "#00ff88",
    tag: "Company",
  },
  {
    id: "samscitech",
    title: "Sam SciTech",
    subtitle: "Science education in Tamil",
    description:
      "Making Computer Science, Machine Learning, and the Sciences accessible to every student in Tamil Nadu — in Tamil.",
    icon: Youtube,
    href: "/youtube",
    accent: "red",
    accentColor: "#ef4444",
    tag: "YouTube",
  },
  {
    id: "writing",
    title: "Words & Worlds",
    subtitle: "Poetry & philosophy",
    description:
      "Tamil poetry. Philosophical essays. Reflections on existence, consciousness, and the spaces between science and soul.",
    icon: Feather,
    href: "/writing",
    accent: "amber",
    accentColor: "#fbbf24",
    tag: "Writing",
  },
];

export default function VenturesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate how far to scroll horizontally
      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const accentStyles: Record<
    string,
    { border: string; glow: string; text: string; bg: string; tagBg: string; line: string; cornerGlow: string }
  > = {
    emerald: {
      border: "hover:border-emerald-DEFAULT/30",
      glow: "group-hover:shadow-[0_0_80px_rgba(0,255,136,0.08)]",
      text: "text-emerald-DEFAULT",
      bg: "bg-emerald-DEFAULT/10 group-hover:bg-emerald-DEFAULT/20",
      tagBg: "bg-emerald-DEFAULT/10 text-emerald-DEFAULT border border-emerald-DEFAULT/20",
      line: "from-emerald-DEFAULT/0 via-emerald-DEFAULT/50 to-emerald-DEFAULT/0",
      cornerGlow: "bg-emerald-DEFAULT/[0.04] group-hover:bg-emerald-DEFAULT/[0.08]",
    },
    red: {
      border: "hover:border-red-500/30",
      glow: "group-hover:shadow-[0_0_80px_rgba(239,68,68,0.08)]",
      text: "text-red-500",
      bg: "bg-red-500/10 group-hover:bg-red-500/20",
      tagBg: "bg-red-500/10 text-red-500 border border-red-500/20",
      line: "from-red-500/0 via-red-500/50 to-red-500/0",
      cornerGlow: "bg-red-500/[0.04] group-hover:bg-red-500/[0.08]",
    },
    amber: {
      border: "hover:border-amber-400/30",
      glow: "group-hover:shadow-[0_0_80px_rgba(251,191,36,0.08)]",
      text: "text-amber-400",
      bg: "bg-amber-400/10 group-hover:bg-amber-400/20",
      tagBg: "bg-amber-400/10 text-amber-400 border border-amber-400/20",
      line: "from-amber-400/0 via-amber-400/50 to-amber-400/0",
      cornerGlow: "bg-amber-400/[0.04] group-hover:bg-amber-400/[0.08]",
    },
  };

  return (
    <section
      ref={sectionRef}
      id="sagittarius"
      className="relative overflow-hidden bg-void"
    >
      {/* Fixed heading visible during scroll */}
      <div
        ref={trackRef}
        className="flex h-screen items-center"
        style={{ width: `${(VENTURES.length + 1) * 45}vw` }}
      >
        {/* Intro panel */}
        <div className="flex h-full w-[45vw] shrink-0 flex-col justify-center px-12 lg:px-24">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-neon/50" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-neon uppercase">
              Ventures
            </span>
          </div>
          <h2 className="font-sans font-bold text-display tracking-tight text-stark">
            What I&apos;m Building
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-stark-muted" style={{ fontFamily: 'var(--font-body)' }}>
            The companies, channels, and creative work that define my journey
            beyond code.
          </p>
          {/* Animated scroll hint */}
          <div 
            className="mt-8 flex items-center gap-4 text-stark-dim transition-opacity duration-500"
            style={{ opacity: scrollProgress > 0.1 ? 0.3 : 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="relative overflow-hidden">
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  Scroll to explore
                </span>
              </div>
              {/* Animated arrow */}
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 animate-[bounceX_1.5s_ease-in-out_infinite]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {VENTURES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    scrollProgress > (i / VENTURES.length) * 0.9
                      ? "w-5 bg-neon"
                      : "w-1.5 bg-void-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Venture cards */}
        {VENTURES.map((venture) => {
          const Icon = venture.icon;
          const styles = accentStyles[venture.accent];

          return (
            <Link
              key={venture.id}
              href={venture.href}
              className="block h-full w-[45vw] shrink-0 px-6 py-24 lg:px-12"
            >
              <div
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-void-400/60 bg-void-100/80 p-10 backdrop-blur-sm transition-all duration-500 lg:p-14 ${styles.border} ${styles.glow}`}
                data-cursor-hover
                data-cursor-text="Explore"
              >
                {/* Corner glow */}
                <div className={`pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500 ${styles.cornerGlow}`} />

                {/* Top — tag + icon */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm ${styles.tagBg}`}
                  >
                    {venture.tag}
                  </span>

                  <div
                    className={`mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 ${styles.bg} ${styles.text}`}
                    style={{ borderColor: `${venture.accentColor}20` }}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Middle — content */}
                <div className="my-8">
                  <h3 className="flex items-center gap-3 font-sans font-bold text-display-lg tracking-tight text-stark">
                    {venture.title}
                    <ArrowUpRight className="h-6 w-6 text-stark-dim opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                  <p
                    className={`mt-2 font-mono text-sm tracking-wide ${styles.text}`}
                  >
                    {venture.subtitle}
                  </p>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-stark-dim" style={{ fontFamily: 'var(--font-body)' }}>
                    {venture.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`h-px w-0 bg-linear-to-r transition-all duration-700 group-hover:w-full ${styles.line}`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
