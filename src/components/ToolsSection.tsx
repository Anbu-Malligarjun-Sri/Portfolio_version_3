"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  FaPython, FaJava, FaReact, FaGitAlt, FaLinux, FaDocker,
} from "react-icons/fa";
import {
  SiTensorflow, SiPytorch, SiTypescript, SiCplusplus,
  SiNextdotjs, SiTailwindcss, SiOpencv, SiRos,
} from "react-icons/si";

/* ─── Data ──────────────────────────────────────────────────────── */
const ALL_TOOLS = [
  { icon: <FaPython />,      label: "Python",     color: "#f7c948", rgb: "247,201,72"  },
  { icon: <SiCplusplus />,   label: "C++",        color: "#659ad2", rgb: "101,154,210" },
  { icon: <FaJava />,        label: "Java",       color: "#f97316", rgb: "249,115,22"  },
  { icon: <SiTypescript />,  label: "TypeScript", color: "#3b82f6", rgb: "59,130,246"  },
  { icon: <SiTensorflow />,  label: "TensorFlow", color: "#ff8c00", rgb: "255,140,0"   },
  { icon: <SiPytorch />,     label: "PyTorch",    color: "#ef4444", rgb: "239,68,68"   },
  { icon: <SiOpencv />,      label: "OpenCV",     color: "#22c55e", rgb: "34,197,94"   },
  { icon: <FaReact />,       label: "React",      color: "#38bdf8", rgb: "56,189,248"  },
  { icon: <SiNextdotjs />,   label: "Next.js",    color: "#e5e5e5", rgb: "229,229,229" },
  { icon: <SiTailwindcss />, label: "Tailwind",   color: "#06b6d4", rgb: "6,182,212"   },
  { icon: <FaGitAlt />,      label: "Git",        color: "#f97316", rgb: "249,115,22"  },
  { icon: <FaLinux />,       label: "Linux",      color: "#facc15", rgb: "250,204,21"  },
  { icon: <FaDocker />,      label: "Docker",     color: "#38bdf8", rgb: "56,189,248"  },
  { icon: <SiRos />,         label: "ROS2",       color: "#00ff94", rgb: "0,255,148"   },
];

const ROW_A = ALL_TOOLS.slice(0, 7);
const ROW_B = ALL_TOOLS.slice(7);

const CATEGORIES = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    tagline: "Building minds that learn",
    color: "#00ff94", rgb: "0,255,148",
    tools: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
    description: "Designing end-to-end ML pipelines, computer vision systems, and fine-tuned language models that run in production.",
  },
  {
    id: "fullstack",
    label: "Full-Stack Web",
    tagline: "Pixels to databases",
    color: "#3b82f6", rgb: "59,130,246",
    tools: ["TypeScript", "React", "Next.js", "Tailwind"],
    description: "Shipping performant, accessible web applications from system architecture down to pixel-perfect UI.",
  },
  {
    id: "systems",
    label: "Systems & Robotics",
    tagline: "Hardware meets software",
    color: "#f59e0b", rgb: "245,158,11",
    tools: ["C++", "ROS2", "Linux", "Docker"],
    description: "Low-level systems engineering, real-time robotics control loops, and containerised infrastructure.",
  },
  {
    id: "langs",
    label: "Languages & Tooling",
    tagline: "The craftsman's bench",
    color: "#a855f7", rgb: "168,85,247",
    tools: ["Python", "Java", "C++", "Git"],
    description: "Multi-language fluency paired with solid version control, CI/CD, and developer-tooling knowledge.",
  },
];

/* ─── Marquee chip ──────────────────────────────────────────────── */
function Chip({ tool }: { tool: typeof ALL_TOOLS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        borderColor: hov ? `rgba(${tool.rgb},0.55)` : "rgba(255,255,255,0.07)",
        boxShadow: hov
          ? `0 0 28px 4px rgba(${tool.rgb},0.18), inset 0 0 18px rgba(${tool.rgb},0.06)`
          : "0 0 0 0 transparent",
        y: hov ? -4 : 0,
      }}
      transition={{ duration: 0.28 }}
      className="relative mx-3 flex shrink-0 cursor-default items-center gap-3 rounded-2xl border px-5 py-3"
      style={{ background: `linear-gradient(135deg, rgba(${tool.rgb},0.06) 0%, rgba(8,10,8,0.9) 100%)` }}
    >
      <motion.span
        animate={{ color: hov ? tool.color : "rgba(255,255,255,0.35)" }}
        transition={{ duration: 0.25 }}
        className="text-xl leading-none"
      >
        {tool.icon}
      </motion.span>
      <motion.span
        animate={{ color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.42)" }}
        transition={{ duration: 0.25 }}
        className="whitespace-nowrap font-mono text-[11px] tracking-[0.22em] uppercase"
      >
        {tool.label}
      </motion.span>
      <motion.span
        animate={{ opacity: hov ? 1 : 0, backgroundColor: tool.color }}
        transition={{ duration: 0.2 }}
        className="h-1.5 w-1.5 rounded-full"
        style={{ boxShadow: `0 0 8px ${tool.color}` }}
      />
    </motion.div>
  );
}

/* ─── Marquee row ───────────────────────────────────────────────── */
function MarqueeRow({ tools, direction }: { tools: typeof ALL_TOOLS; direction: "left" | "right" }) {
  const doubled = [...tools, ...tools];
  return (
    <div className="relative flex overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
      <div className={`flex ${direction === "left" ? "marquee-left" : "marquee-right"}`} style={{ width: "max-content" }}>
        {doubled.map((t, i) => <Chip key={`${t.label}-${i}`} tool={t} />)}
      </div>
    </div>
  );
}

/* ─── 3-D tilt card ─────────────────────────────────────────────── */
function CategoryCard({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const tools = cat.tools.map(name => ALL_TOOLS.find(t => t.label === name)!).filter(Boolean);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [8, -8]);
  const rotateY = useTransform(x, [-80, 80], [-8, 8]);
  const sRotX = useSpring(rotateX, { stiffness: 180, damping: 24 });
  const sRotY = useSpring(rotateY, { stiffness: 180, damping: 24 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.08 * index, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d",
          background: `linear-gradient(145deg, rgba(${cat.rgb},0.07) 0%, rgba(10,11,10,0.97) 55%)`,
        } as React.CSSProperties}
        className="group relative overflow-hidden rounded-3xl border border-white/[0.07] p-8 transition-colors duration-300 hover:border-white/15"
        whileHover={{
          boxShadow: `0 32px 80px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(${cat.rgb},0.18), 0 0 80px -20px rgba(${cat.rgb},0.18)`,
        }}
      >
        {/* Noise */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "100px" }} />

        {/* Top shimmer on hover */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-0 inset-x-0 h-px origin-left"
          style={{ background: `linear-gradient(to right, transparent, ${cat.color}cc 40%, ${cat.color}cc 60%, transparent)` }}
        />

        {/* Left stripe */}
        <div className="absolute left-0 top-8 bottom-8 w-0.75 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to bottom, transparent, ${cat.color}, transparent)` }} />

        {/* Ghost number */}
        <div className="pointer-events-none absolute -right-3 -bottom-4 select-none font-mono leading-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500"
          style={{ fontSize: "9rem", color: cat.color }}>
          0{index + 1}
        </div>

        {/* Header */}
        <div className="relative mb-6 pl-4">
          <p className="mb-1 font-mono text-[9px] tracking-[0.36em] uppercase" style={{ color: `rgba(${cat.rgb},0.55)` }}>
            {cat.id}
          </p>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-white/90">
            {cat.label}
          </h3>
          <p className="mt-0.5 font-mono text-[10px] italic tracking-wide" style={{ color: `rgba(${cat.rgb},0.7)` }}>
            {cat.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="relative mb-7 pl-4 text-[13px] leading-[1.8] text-white/40 group-hover:text-white/55 transition-colors duration-300">
          {cat.description}
        </p>

        {/* Tool chips */}
        <div className="relative flex flex-wrap gap-2 pl-4">
          {tools.map((tool, ti) => (
            <motion.span
              key={tool.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 * index + 0.07 * ti, duration: 0.4 }}
              className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-[11px] font-mono tracking-wide text-white/50 transition-all duration-200 hover:text-white/80"
              style={{
                borderColor: `rgba(${tool.rgb},0.12)`,
                background: `rgba(${tool.rgb},0.04)`,
              }}
              whileHover={{
                borderColor: `rgba(${tool.rgb},0.35)`,
                backgroundColor: `rgba(${tool.rgb},0.08)`,
              }}
            >
              <span style={{ color: tool.color }} className="text-sm leading-none">{tool.icon}</span>
              {tool.label}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Root ──────────────────────────────────────────────────────── */
export default function ToolsSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="tools" className="relative overflow-hidden bg-void py-32 md:py-48">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-175 w-175 rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, rgba(0,255,148,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 h-125 w-125 rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-0 h-100 w-100 rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <div ref={headRef} className="relative mx-auto mb-20 max-w-7xl px-6 text-center sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-neon/40" />
          <span className="font-mono text-[10px] tracking-[0.5em] text-neon/70 uppercase">Stack</span>
          <span className="h-px w-10 bg-neon/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="text-shimmer">Tools I Build With</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/38"
        >
          A curated arsenal across AI, systems engineering, and full-stack development
          that powers everything I ship — from research to production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={headInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-neon/20 bg-neon/5 px-5 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon/70 animate-ping opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
          </span>
          <span className="font-mono text-[11px] tracking-widest text-neon/70 uppercase">
            {ALL_TOOLS.length} Technologies · 4 Domains
          </span>
        </motion.div>
      </div>

      {/* Dual marquee */}
      <div className="relative space-y-4">
        <MarqueeRow tools={ROW_A} direction="left"  />
        <MarqueeRow tools={ROW_B} direction="right" />
      </div>

      {/* Divider */}
      <div className="relative mx-auto my-24 max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
          <span className="font-mono text-[9px] tracking-[0.5em] text-white/18 uppercase">Domains</span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      {/* Category cards */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="grid gap-5 sm:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="mt-20 h-px origin-center bg-linear-to-r from-transparent via-neon/25 to-transparent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-5 text-center font-mono text-[10px] tracking-[0.4em] text-white/18 uppercase"
        >
          Continuously expanding
        </motion.p>
      </div>
    </section>
  );
}
