"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import { ArrowDown } from "lucide-react";
import { SplineScene } from "./ui/SplineScene";

/* ── Letter-by-letter title reveal ── */
function AnimatedTitle({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0, 0, 0.2, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Typewriter tagline ── */
function TypewriterText({ text, delay = 0.8 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 60);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      <span
        className={`inline-block w-0.5 h-[1em] bg-neon ml-0.5 align-middle transition-opacity duration-300 ${
          showCursor ? "animate-pulse" : "opacity-0"
        }`}
      />
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const SPLINE_SCENE_URL =
    process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ??
    "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── MULTI-LAYER BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-void via-[#0a0a12] to-void" />
        <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(0,255,148,0.07)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,148,0.06)_0%,transparent_35%)] animate-[pulseGlow_8s_ease-in-out_infinite]" />
      </div>

      {/* ── SPOTLIGHT ── */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(0, 255, 148, 0.15)"
      />

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-28 lg:py-32">
        <motion.div
          className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          style={{ y: contentY }}
        >
          <div className="relative z-10 max-w-2xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_0_6px_rgba(0,255,148,0.12)]" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-neon/80">
                <TypewriterText text="AI RESEARCHER / ENGINEER" delay={0.6} />
              </span>
            </motion.div>

            {/* Name — serif display */}
            <h1 className="font-serif-display font-bold leading-[0.9] tracking-tight text-balance mb-7">
              <AnimatedTitle
                text="Anbu"
                className="block text-[clamp(3.75rem,9vw,7.5rem)] text-stark drop-shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                delay={0.45}
              />
              <AnimatedTitle
                text="Malligarjun"
                className="block text-[clamp(3.4rem,8vw,6.5rem)] text-gradient-display"
                delay={0.75}
              />
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
              className="text-[clamp(1rem,2vw,1.2rem)] leading-[1.8] text-stark-muted max-w-2xl mb-12"
              style={{ fontFamily: "var(--font-body)" }}
            >
                Designing intelligent systems that feel human: local LLM tooling,
                embodied AI, and resilient full-stack products that ship.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 rounded-full bg-neon px-10 py-4 text-void font-mono text-[13px] font-semibold tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_12px_42px_rgba(0,255,148,0.28)] hover:-translate-y-0.5"
                data-cursor-hover
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  View Projects
                  <ArrowDown className="h-4 w-4 rotate-90" />
                </span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/5 px-10 py-4 font-mono text-[13px] font-semibold tracking-[0.18em] uppercase text-stark transition-all duration-300 hover:border-white/25 hover:bg-white/8 hover:-translate-y-0.5"
                data-cursor-hover
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex items-center gap-3 text-stark-dim"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                Scroll to explore
              </span>
            </motion.div>
          </div>

          {/* 3D Spline scene */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-[520px] justify-self-end"
          >
            <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-neon/8 via-transparent to-blue-500/8 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-void-100/70 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,148,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(0,255,148,0.08),transparent_35%)]" />
              <div className="relative aspect-4/5 sm:aspect-3/4">
                <SplineScene scene={SPLINE_SCENE_URL} className="h-full w-full" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM GRADIENT FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-void to-transparent z-10 pointer-events-none" />
    </section>
  );
}
