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

      {/* ── 3D SPLINE — FULL VIEWPORT LAYER ──
           Covers the entire section so mouse hover/interaction works
           from ANY position on the page. The Spline scene itself
           positions the robot model to the right internally. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: bgOpacity }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        <div className="absolute inset-0 pointer-events-auto">
          <SplineScene scene={SPLINE_SCENE_URL} className="h-full w-full" />
        </div>
      </motion.div>

      {/* ── TEXT CONTENT — floats above the Spline layer ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-28 lg:py-32 pointer-events-none">
        <motion.div
          className="max-w-2xl"
          style={{ y: contentY }}
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm pointer-events-auto"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_0_6px_rgba(0,255,148,0.12)]" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-neon/80">
              <TypewriterText text="FOUNDER · EDUCATOR · ENGINEER" delay={0.6} />
            </span>
          </motion.div>

          {/* Name — serif display */}
          <h1 className="font-serif-display font-bold leading-[0.85] tracking-tighter text-balance mb-10 relative">
            <div className="relative inline-block">
              <AnimatedTitle
                text="Anbu"
                className="block text-[clamp(4rem,12vw,9rem)] text-stark drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                delay={0.45}
              />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1, ease: "circOut" }}
                className="absolute -bottom-2 left-0 h-1 bg-neon/40 blur-sm"
              />
            </div>
            <div className="relative">
              <AnimatedTitle
                text="Malligarjun"
                className="block text-[clamp(3.5rem,10vw,8rem)] text-gradient-display leading-tight py-2"
                delay={0.75}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:block"
              >
                <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-neon/30 vertical-text rotate-180">
                  DEVELOPER · CREATOR
                </span>
              </motion.div>
            </div>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
            className="text-[clamp(1rem,2vw,1.2rem)] leading-[1.8] text-stark-muted max-w-xl mb-12"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Building at the intersection of <span className="text-neon">AI</span>,{" "}
            <span className="text-neon">Biology</span>, and{" "}
            <span className="text-neon">Education</span> — engineering a future
            where technology restores what nature has lost.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-8 pointer-events-auto"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 rounded-full bg-neon px-10 py-4 text-void font-mono text-[13px] font-semibold tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_12px_42px_rgba(0,255,148,0.28)] hover:-translate-y-0.5"
              data-cursor-hover
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Explore My Vision
                <ArrowDown className="h-4 w-4 rotate-90" />
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/5 px-10 py-4 font-mono text-[13px] font-semibold tracking-[0.18em] uppercase text-stark transition-all duration-300 hover:border-white/25 hover:bg-white/8 hover:-translate-y-0.5"
              data-cursor-hover
            >
              View Projects
            </a>
          </motion.div>

          {/* Social icons + status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex items-center gap-4 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <a href="https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg" target="_blank" rel="noreferrer" className="text-stark-dim hover:text-neon transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://github.com/Anbu-Malligarjun-Sri" target="_blank" rel="noreferrer" className="text-stark-dim hover:text-neon transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/" target="_blank" rel="noreferrer" className="text-stark-dim hover:text-neon transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>

            <div className="h-4 w-px bg-white/12" />

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_0_4px_rgba(0,255,148,0.15)]" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stark-dim">
                Open to Opportunities
              </span>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stark-dim"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM GRADIENT FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-void to-transparent z-20 pointer-events-none" />
    </section>
  );
}
