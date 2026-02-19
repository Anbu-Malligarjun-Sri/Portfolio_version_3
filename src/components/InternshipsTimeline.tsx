"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  FiBriefcase, FiCpu, FiMapPin, FiCalendar, FiZap, FiBook,
} from "react-icons/fi";
import SectionHeading from "./SectionHeading";

/**
 * NOTE: Custom font-faces (Ultramagnetic, Galtino, Kyros, Eloquia, Terquiny)
 * are declared globally in `app/globals.css` — no injection needed here.
 */

interface Stat { value: string; label: string; }
interface WorkshopEvent {
  id: string; year: string; date: string; title: string;
  organization: string; location: string; type: string;
  description: string; highlights: string[]; stats?: Stat[];
  icon: React.ReactNode; accentColor: string; rgb: string;
}

const EVENTS: WorkshopEvent[] = [
  {
    id: "bits-pilani", year: "2025", date: "June – July 2025",
    title: "AI/ML Research Internship", organization: "BITS Pilani, Hyderabad",
    location: "Hyderabad, India", type: "Research Internship",
    description: "Completed an intensive 7-week research internship building and applying machine learning models for real-world problem-solving under faculty guidance at one of India's top technical universities.",
    highlights: ["Hands-on data preprocessing, model training & performance evaluation pipelines", "Built production-grade ML systems using Python-based frameworks", "Collaborated on research problems with PhD scholars and faculty", "Presented findings in a structured research seminar"],
    stats: [{ value: "7", label: "Weeks" }, { value: "3+", label: "Models Built" }, { value: "BITS", label: "Hyderabad" }],
    icon: <FiBriefcase className="h-5 w-5" />, accentColor: "#00ff94", rgb: "0,255,148",
  },
  {
    id: "iisc-workshop", year: "2024", date: "2024",
    title: "AI & Machine Learning Workshop", organization: "Indian Institute of Science (IISc)",
    location: "Bangalore, India", type: "Workshop",
    description: "Immersive workshop at India's premier science & research institution covering foundational to intermediate AI/ML concepts. Participated in hands-on lab sessions alongside researchers and postgraduate students.",
    highlights: ["Hands-on model training sessions on real-world datasets", "Explored NLP, computer vision, and reinforcement learning modules", "Engaged with IISc faculty and PhD researchers", "Completed a group mini-project on image classification"],
    stats: [{ value: "IISc", label: "Bangalore" }, { value: "4+", label: "Modules" }, { value: "Rank 1", label: "India" }],
    icon: <FiCpu className="h-5 w-5" />, accentColor: "#3b82f6", rgb: "59,130,246",
  },
  {
    id: "psg-labview", year: "2024", date: "2024",
    title: "LabVIEW with Arduino Workshop", organization: "PSG College of Technology",
    location: "Coimbatore, India", type: "Hands-on Workshop",
    description: "Specialized embedded systems workshop integrating LabVIEW graphical programming with Arduino microcontrollers for real-time automation and control system design.",
    highlights: ["Integrated LabVIEW with Arduino for real-time system control", "Built automated sensor-actuator feedback loops", "Learned graphical programming paradigm for hardware control", "Delivered a working prototype automation project"],
    stats: [{ value: "PSG", label: "Tech" }, { value: "2+", label: "Projects" }, { value: "IoT", label: "Focus" }],
    icon: <FiZap className="h-5 w-5" />, accentColor: "#f59e0b", rgb: "245,158,11",
  },
  {
    id: "micro-dots", year: "2023", date: "May – August 2023",
    title: "Diploma in Python Programming", organization: "Micro Dots Computer Education",
    location: "Erode, India", type: "Diploma Course",
    description: "Foundational diploma that sparked a deep passion for software engineering. Covered Python fundamentals through to building complete applications, laying the groundwork for everything that followed.",
    highlights: ["Python fundamentals: control flow, functions, OOP, file I/O", "Built 5+ projects ranging from CLI tools to basic data pipelines", "Strengthened algorithmic thinking and problem-solving", "Foundation that enabled later ML and AI work"],
    stats: [{ value: "3", label: "Months" }, { value: "5+", label: "Projects" }, { value: "The", label: "Beginning" }],
    icon: <FiBook className="h-5 w-5" />, accentColor: "#a855f7", rgb: "168,85,247",
  },
];

/* ─── Scroll line ─── */
function ScrollLine({ trackRef }: { trackRef: React.RefObject<HTMLDivElement> }) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const m = () => { if (trackRef.current) setHeight(trackRef.current.getBoundingClientRect().height); };
    m();
    const ro = new ResizeObserver(m);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [trackRef]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 18%", "end 72%"] });
  const rawH = useTransform(scrollYProgress, [0, 1], [0, height]);
  const springH = useSpring(rawH, { stiffness: 55, damping: 22, mass: 1 });
  const op = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <>
      <div className="absolute left-8 top-0 w-px" style={{ height, background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 8%, rgba(255,255,255,0.06) 92%, transparent 100%)" }} />
      <motion.div style={{ height: springH, opacity: op }} className="absolute left-8 top-0 w-px overflow-hidden">
        <div className="h-full w-full" style={{ background: "linear-gradient(to bottom, #00ff94ee, #00ff9460, #00ff9410)", filter: "drop-shadow(0 0 4px rgba(0,255,148,0.7))" }} />
      </motion.div>
      <motion.div className="pointer-events-none absolute left-8 -translate-x-1/2 h-3 w-3 rounded-full"
        style={{ top: springH, opacity: op, backgroundColor: "#00ff94", boxShadow: "0 0 20px 6px rgba(0,255,148,0.5)" }} aria-hidden />
    </>
  );
}

/* ─── Card ─── */
function EntryCard({ event, visible, hovered }: { event: WorkshopEvent; visible: boolean; hovered: boolean }) {
  const { accentColor, rgb } = event;
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 0 0 1px rgba(${rgb},0.28), 0 40px 100px -20px rgba(0,0,0,0.7), 0 0 80px -30px rgba(${rgb},0.2)`
            : `0 0 0 1px rgba(255,255,255,0.09), 0 12px 40px -12px rgba(0,0,0,0.6)`,
        }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl"
        style={{ background: `linear-gradient(145deg, rgba(${rgb},0.06) 0%, rgba(12,14,12,0.96) 35%, rgba(8,10,8,0.99) 100%)` }}
      >
        {/* Noise texture */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.022]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "120px" }} />

        {/* Ghost year watermark */}
        <div className="pointer-events-none absolute -right-4 -top-6 select-none leading-none"
          style={{ fontFamily: "'Ultramagnetic','Terquiny',monospace", fontSize: "clamp(8rem,16vw,14rem)", color: `rgba(${rgb},0.05)`, letterSpacing: "-0.06em", lineHeight: 1 }}>
          {event.year}
        </div>

        {/* HEADER */}
        <div className="relative px-10 pt-10 pb-8 md:px-12 md:pt-12" style={{ borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
          {/* Type pill */}
          <div className="mb-5">
            <motion.div animate={{ backgroundColor: hovered ? `rgba(${rgb},0.15)` : `rgba(${rgb},0.08)` }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{ borderColor: `rgba(${rgb},0.28)` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
              <span style={{ fontFamily: "'Kyros',monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: `rgba(${rgb},0.9)` }}>
                {event.type}
              </span>
            </motion.div>
          </div>

          {/* Mobile year */}
          <p className="mb-2 block md:hidden" style={{ fontFamily: "'Kyros',monospace", fontSize: "12px", color: `rgba(${rgb},0.5)`, letterSpacing: "0.1em" }}>{event.year}</p>

          {/* Title */}
          <h4 className="text-2xl md:text-[2rem] leading-[1.15] tracking-tight text-stark"
            style={{ fontFamily: "'Galtino','Georgia',serif" }}>
            {event.title}
          </h4>

          {/* Org italic */}
          <p className="mt-2 text-[15px] italic" style={{ fontFamily: "'Galtino','Georgia',serif", color: `rgba(${rgb},0.85)` }}>
            {event.organization}
          </p>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-2">
              <FiCalendar className="h-3.5 w-3.5 text-stark-dim/50" />
              <span style={{ fontFamily: "'Eloquia',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.42)", letterSpacing: "0.04em" }}>{event.date}</span>
            </div>
            <div className="h-px w-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <FiMapPin className="h-3.5 w-3.5 text-stark-dim/50" />
              <span style={{ fontFamily: "'Eloquia',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.42)", letterSpacing: "0.04em" }}>{event.location}</span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="relative px-10 py-10 md:px-12 md:py-11">
          <p className="leading-[1.9] text-stark-muted"
            style={{ fontFamily: "'Eloquia','Georgia',serif", fontSize: "15px", letterSpacing: "0.015em" }}>
            {event.description}
          </p>

          <div className="mt-8 space-y-5">
            {event.highlights.map((h, i) => (
              <motion.div key={h} initial={{ opacity: 0, x: -14 }} animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.22 + i * 0.08, duration: 0.5 }} className="group/h flex items-start gap-4">
                <div className="mt-2.25 shrink-0 h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover/h:scale-150"
                  style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}90` }} />
                <span className="text-stark-muted transition-colors duration-200 group-hover/h:text-stark/75"
                  style={{ fontFamily: "'Eloquia',sans-serif", fontSize: "13.5px", letterSpacing: "0.01em", lineHeight: "1.75" }}>
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* STATS FOOTER */}
        {event.stats && (
          <div className="grid" style={{ gridTemplateColumns: `repeat(${event.stats.length},1fr)`, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {event.stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.09 }}
                className="group/s relative flex flex-col items-center justify-center gap-1.5 px-6 py-8"
                style={{ borderRight: i < event.stats!.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <motion.div animate={{ opacity: hovered ? 1 : 0 }} className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 80% at 50% 100%, rgba(${rgb},0.07), transparent)` }} />
                <span className="relative z-10 leading-none tracking-tight"
                  style={{ fontFamily: "'Ultramagnetic','Terquiny',monospace", fontSize: "clamp(1.4rem,3vw,2rem)", color: accentColor, filter: `drop-shadow(0 0 12px rgba(${rgb},0.5))` }}>
                  {stat.value}
                </span>
                <span className="relative z-10 text-stark-dim"
                  style={{ fontFamily: "'Kyros',monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Left accent stripe */}
        <motion.div animate={{ opacity: hovered ? 1 : 0.45 }} className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
          style={{ background: `linear-gradient(to bottom, transparent 0%, ${accentColor} 25%, ${accentColor} 75%, transparent 100%)` }} />

        {/* Top shimmer on hover */}
        <motion.div animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }} className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{ background: `linear-gradient(to right, ${accentColor}00, ${accentColor}cc 30%, ${accentColor}cc 70%, ${accentColor}00)` }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Row ─── */
function TimelineRow({ event, isLast }: { event: WorkshopEvent; isLast: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06, rootMargin: "-20px 0px" });
    if (rowRef.current) io.observe(rowRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rowRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex justify-start md:gap-16">
        {/* ══ LEFT sticky panel ══════════════════════════
            dot: absolute left-3 → center ≈ 36px
            line: absolute left-8 → 32px          ✓
        ════════════════════════════════════════════════ */}
        <div className="sticky top-36 z-40 flex max-w-xs flex-col self-start md:w-full md:flex-row lg:max-w-sm">
          {/* Dot */}
          <div className="absolute left-3 flex h-12 w-12 items-center justify-center">
            <AnimatePresence>
              {hovered && (
                <motion.div key="ring" initial={{ scale: 0.4, opacity: 0.8 }} animate={{ scale: 3.2, opacity: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 1 }} className="absolute inset-0 rounded-full border"
                  style={{ borderColor: event.accentColor + "55" }} />
              )}
            </AnimatePresence>
            <motion.div
              animate={{ scale: hovered ? 1.18 : 1, boxShadow: hovered ? `0 0 0 2px rgba(${event.rgb},0.4),0 0 32px 10px rgba(${event.rgb},0.28)` : `0 0 0 1px rgba(255,255,255,0.09),0 0 18px 3px rgba(${event.rgb},0.12)` }}
              transition={{ duration: 0.35 }}
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#030507] backdrop-blur-xl"
              style={{ color: event.accentColor }}>
              {event.icon}
            </motion.div>
          </div>

          {/* Year + type — desktop */}
          <div className="hidden md:block md:pl-24">
            <motion.p animate={{ color: hovered ? `rgba(${event.rgb},0.42)` : "rgba(255,255,255,0.04)" }}
              transition={{ duration: 0.45 }} className="select-none leading-none"
              style={{ fontFamily: "'Ultramagnetic','Terquiny',monospace", fontSize: "clamp(4rem,6vw,7rem)", letterSpacing: "-0.04em" }}>
              {event.year}
            </motion.p>
            <motion.div animate={{ opacity: hovered ? 1 : 0.32 }} className="mt-3 flex items-center gap-2">
              <div className="h-px w-8" style={{ background: `linear-gradient(to right,rgba(${event.rgb},0.5),transparent)` }} />
            </motion.div>
            <motion.p animate={{ opacity: hovered ? 1 : 0.32, color: hovered ? event.accentColor : "rgba(255,255,255,0.3)" }}
              transition={{ duration: 0.35 }} className="mt-2 uppercase"
              style={{ fontFamily: "'Kyros',monospace", fontSize: "10px", letterSpacing: "0.28em" }}>
              {event.type}
            </motion.p>
          </div>
        </div>

        {/* ══ RIGHT: card ══════════════════════════════ */}
        <div className="relative w-full pl-20 md:pl-4">
          <EntryCard event={event} visible={visible} hovered={hovered} />
        </div>
      </div>

      {/* ══ GAP SPACER between cards ════════════════════
          This is explicit — not relying on pt- hacks.
          Shows a decorative connector between entries.
      ════════════════════════════════════════════════ */}
      {!isLast && (
        <div className="relative flex items-center pl-20 md:pl-0" style={{ height: "120px" }}>
          {/* Decorative tick mark on the line */}
          <div className="absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 md:left-8">
            <div className="h-1 w-1 rounded-full bg-white/10" />
          </div>
          {/* Optional: tiny floating "scroll" hint */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="ml-20 hidden md:block"
            style={{ opacity: 0 }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Root ─── */
export default function InternshipsTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <>

      <section id="internships" className="relative bg-void overflow-hidden">
        {/* Glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 h-175 w-175 rounded-full bg-neon/[0.022] blur-[200px]" />
          <div className="absolute top-3/4 right-1/4 h-125 w-125 rounded-full bg-purple-500/[0.018] blur-[170px]" />
          <div className="absolute bottom-1/4 left-1/5 h-100 w-100 rounded-full bg-blue-500/[0.014] blur-[140px]" />
        </div>

        {/* Heading */}
        <div className="relative px-6 pt-28 sm:px-12 md:px-16 md:pt-40 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              label="Growth Path" title="Workshops & Internships"
              subtitle="Real-world experiences that sharpened my engineering edge — from top research labs to intensive hands-on workshops."
              align="center"
            />
          </div>
        </div>

        {/* Timeline shell — Aceternity architecture */}
        <div className="relative w-full md:px-10">
          {/*
            IMPORTANT: we use mt-20 on the track to create top breathing room,
            and each TimelineRow renders its own explicit 120px spacer below it.
            This guarantees visible gaps regardless of sticky / viewport quirks.
          */}
          <div ref={trackRef} className="relative mx-auto max-w-7xl mt-16 pb-32 md:mt-20">

            <ScrollLine trackRef={trackRef as React.RefObject<HTMLDivElement>} />

            {EVENTS.map((event, i) => (
              <TimelineRow key={event.id} event={event} isLast={i === EVENTS.length - 1} />
            ))}

            {/* Terminal */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, ease: "backOut" }}
              className="mt-16 flex flex-col items-center gap-4">
              <div className="h-12 w-px bg-linear-to-b from-neon/25 to-transparent" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed"
                style={{ borderColor: "rgba(0,255,148,0.28)", backgroundColor: "rgba(0,255,148,0.04)", boxShadow: "0 0 40px rgba(0,255,148,0.12)" }}>
                <div className="h-2.5 w-2.5 rounded-full animate-pulse" style={{ backgroundColor: "#00ff94", boxShadow: "0 0 12px #00ff94" }} />
              </div>
              <p style={{ fontFamily: "'Kyros',monospace", fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(0,255,148,0.3)" }}>
                More Coming
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}