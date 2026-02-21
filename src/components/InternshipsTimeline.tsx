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
    highlights: [
      "Hands-on data preprocessing, model training & performance evaluation pipelines",
      "Built production-grade ML systems using Python-based frameworks",
      "Collaborated on research problems with PhD scholars and faculty",
      "Presented findings in a structured research seminar",
    ],
    stats: [{ value: "7", label: "Weeks" }, { value: "3+", label: "Models Built" }, { value: "BITS", label: "Hyderabad" }],
    icon: <FiBriefcase className="h-5 w-5" />, accentColor: "#00ff94", rgb: "0,255,148",
  },
  {
    id: "iisc-workshop", year: "2024", date: "2024",
    title: "AI & Machine Learning Workshop", organization: "Indian Institute of Science (IISc)",
    location: "Bangalore, India", type: "Workshop",
    description: "Immersive workshop at India's premier science & research institution covering foundational to intermediate AI/ML concepts. Participated in hands-on lab sessions alongside researchers and postgraduate students.",
    highlights: [
      "Hands-on model training sessions on real-world datasets",
      "Explored NLP, computer vision, and reinforcement learning modules",
      "Engaged with IISc faculty and PhD researchers",
      "Completed a group mini-project on image classification",
    ],
    stats: [{ value: "IISc", label: "Bangalore" }, { value: "4+", label: "Modules" }, { value: "Rank 1", label: "India" }],
    icon: <FiCpu className="h-5 w-5" />, accentColor: "#3b82f6", rgb: "59,130,246",
  },
  {
    id: "psg-labview", year: "2024", date: "2024",
    title: "LabVIEW with Arduino Workshop", organization: "PSG College of Technology",
    location: "Coimbatore, India", type: "Hands-on Workshop",
    description: "Specialized embedded systems workshop integrating LabVIEW graphical programming with Arduino microcontrollers for real-time automation and control system design.",
    highlights: [
      "Integrated LabVIEW with Arduino for real-time system control",
      "Built automated sensor-actuator feedback loops",
      "Learned graphical programming paradigm for hardware control",
      "Delivered a working prototype automation project",
    ],
    stats: [{ value: "PSG", label: "Tech" }, { value: "2+", label: "Projects" }, { value: "IoT", label: "Focus" }],
    icon: <FiZap className="h-5 w-5" />, accentColor: "#f59e0b", rgb: "245,158,11",
  },
  {
    id: "micro-dots", year: "2023", date: "May – August 2023",
    title: "Diploma in Python Programming", organization: "Micro Dots Computer Education",
    location: "Erode, India", type: "Diploma Course",
    description: "Foundational diploma that sparked a deep passion for software engineering. Covered Python fundamentals through to building complete applications, laying the groundwork for everything that followed.",
    highlights: [
      "Python fundamentals: control flow, functions, OOP, file I/O",
      "Built 5+ projects ranging from CLI tools to basic data pipelines",
      "Strengthened algorithmic thinking and problem-solving",
      "Foundation that enabled later ML and AI work",
    ],
    stats: [{ value: "3", label: "Months" }, { value: "5+", label: "Projects" }, { value: "The", label: "Beginning" }],
    icon: <FiBook className="h-5 w-5" />, accentColor: "#a855f7", rgb: "168,85,247",
  },
];

/* ─── Animated scroll line — centered architecture ─── */
function ScrollLine({ trackRef }: { trackRef: React.RefObject<HTMLDivElement> }) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setHeight(trackRef.current.getBoundingClientRect().height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [trackRef]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 20%", "end 75%"] });
  const rawH = useTransform(scrollYProgress, [0, 1], [0, height]);
  const springH = useSpring(rawH, { stiffness: 55, damping: 22, mass: 1 });
  const op = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    /* The line sits at exactly 50% of the container (centered timeline) */
    <div className="absolute inset-0 pointer-events-none" style={{ left: "50%", width: 0 }}>
      {/* Track ghost */}
      <div
        className="absolute top-0 w-px"
        style={{
          height,
          left: "-0.5px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.07) 8%, rgba(255,255,255,0.07) 92%, transparent 100%)",
        }}
      />
      {/* Animated fill */}
      <motion.div style={{ height: springH, opacity: op }} className="absolute top-0 w-px overflow-hidden" style={{ left: "-0.5px" }}>
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(to bottom, #00ff94ee, #00ff9470, #00ff9410)",
            filter: "drop-shadow(0 0 5px rgba(0,255,148,0.6))",
          }}
        />
      </motion.div>
      {/* Glowing orb */}
      <motion.div
        className="pointer-events-none absolute h-4 w-4 rounded-full"
        style={{
          top: springH,
          left: "-8px",
          opacity: op,
          backgroundColor: "#00ff94",
          boxShadow: "0 0 24px 8px rgba(0,255,148,0.45)",
        }}
        aria-hidden
      />
    </div>
  );
}

/* ─── Card ─── */
function EntryCard({ event, visible, hovered, side }: {
  event: WorkshopEvent;
  visible: boolean;
  hovered: boolean;
  side: "left" | "right";
}) {
  const { accentColor, rgb } = event;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? 48 : -48 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 0 0 1px rgba(${rgb},0.32), 0 40px 100px -20px rgba(0,0,0,0.75), 0 0 80px -30px rgba(${rgb},0.25)`
            : `0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px -12px rgba(0,0,0,0.55)`,
        }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(150deg, rgba(${rgb},0.07) 0%, rgba(10,12,10,0.97) 30%, rgba(6,8,6,0.99) 100%)`,
        }}
      >
        {/* Noise grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "140px",
          }}
        />

        {/* Ghost year watermark */}
        <div
          className="pointer-events-none absolute -right-2 -top-4 select-none leading-none"
          style={{
            fontFamily: "'Ultramagnetic','Terquiny',monospace",
            fontSize: "clamp(6rem,12vw,11rem)",
            color: `rgba(${rgb},0.045)`,
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          {event.year}
        </div>

        {/* HEADER */}
        <div
          className="relative px-8 pt-8 pb-7 md:px-10 md:pt-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Type pill */}
          <div className="mb-5">
            <motion.div
              animate={{ backgroundColor: hovered ? `rgba(${rgb},0.16)` : `rgba(${rgb},0.08)` }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{ borderColor: `rgba(${rgb},0.3)` }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
              />
              <span
                style={{
                  fontFamily: "'Kyros',monospace",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: `rgba(${rgb},0.9)`,
                }}
              >
                {event.type}
              </span>
            </motion.div>
          </div>

          {/* Title */}
          <h4
            className="text-xl md:text-[1.75rem] leading-[1.2] tracking-tight text-stark"
            style={{ fontFamily: "'Galtino','Georgia',serif" }}
          >
            {event.title}
          </h4>

          {/* Org */}
          <p
            className="mt-2 text-sm italic"
            style={{
              fontFamily: "'Galtino','Georgia',serif",
              color: `rgba(${rgb},0.85)`,
            }}
          >
            {event.organization}
          </p>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="h-3 w-3 opacity-40" />
              <span
                style={{
                  fontFamily: "'Eloquia',sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.04em",
                }}
              >
                {event.date}
              </span>
            </div>
            <div className="h-px w-2 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <FiMapPin className="h-3 w-3 opacity-40" />
              <span
                style={{
                  fontFamily: "'Eloquia',sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.04em",
                }}
              >
                {event.location}
              </span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="relative px-8 py-8 md:px-10 md:py-9">
          <p
            className="leading-[1.85] text-stark-muted"
            style={{
              fontFamily: "'Eloquia','Georgia',serif",
              fontSize: "14px",
              letterSpacing: "0.01em",
            }}
          >
            {event.description}
          </p>

          <div className="mt-7 space-y-4">
            {event.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: -12 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.24 + i * 0.07, duration: 0.5 }}
                className="group/h flex items-start gap-3.5"
              >
                <div
                  className="mt-[7px] shrink-0 h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover/h:scale-[1.6]"
                  style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}80` }}
                />
                <span
                  className="text-stark-muted transition-colors duration-200 group-hover/h:text-stark/70"
                  style={{
                    fontFamily: "'Eloquia',sans-serif",
                    fontSize: "13px",
                    letterSpacing: "0.01em",
                    lineHeight: "1.8",
                  }}
                >
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* STATS FOOTER */}
        {event.stats && (
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${event.stats.length}, 1fr)`,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {event.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.42 + i * 0.08 }}
                className="group/s relative flex flex-col items-center justify-center gap-1.5 px-5 py-7"
                style={{
                  borderRight:
                    i < event.stats!.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <motion.div
                  animate={{ opacity: hovered ? 1 : 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 80% at 50% 100%, rgba(${rgb},0.08), transparent)`,
                  }}
                />
                <span
                  className="relative z-10 leading-none tracking-tight"
                  style={{
                    fontFamily: "'Ultramagnetic','Terquiny',monospace",
                    fontSize: "clamp(1.3rem,2.5vw,1.85rem)",
                    color: accentColor,
                    filter: `drop-shadow(0 0 10px rgba(${rgb},0.5))`,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="relative z-10 text-stark-dim"
                  style={{
                    fontFamily: "'Kyros',monospace",
                    fontSize: "8.5px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Accent stripe — on correct side based on card alignment */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.4 }}
          className={`absolute top-0 bottom-0 w-[3px] ${side === "right" ? "left-0 rounded-l-2xl" : "right-0 rounded-r-2xl"}`}
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${accentColor} 20%, ${accentColor} 80%, transparent 100%)`,
          }}
        />

        {/* Top shimmer on hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{
            background: `linear-gradient(to right, ${accentColor}00, ${accentColor}cc 30%, ${accentColor}cc 70%, ${accentColor}00)`,
          }}
        />

        {/* Corner glow radial on hover */}
        <motion.div
          animate={{ opacity: hovered ? 0.6 : 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${rgb},0.12), transparent 70%)` }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Connector dot on the center line ─── */
function ConnectorDot({ event, hovered }: { event: WorkshopEvent; hovered: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="ring"
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute h-10 w-10 rounded-full border"
            style={{ borderColor: event.accentColor + "60" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: hovered ? 1.2 : 1,
          boxShadow: hovered
            ? `0 0 0 2px rgba(${event.rgb},0.45), 0 0 36px 12px rgba(${event.rgb},0.3)`
            : `0 0 0 1px rgba(255,255,255,0.12), 0 0 20px 4px rgba(${event.rgb},0.15)`,
        }}
        transition={{ duration: 0.35 }}
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#030507] backdrop-blur-xl"
        style={{ color: event.accentColor }}
      >
        {event.icon}
      </motion.div>
    </div>
  );
}

/* ─── Year Badge ─── */
function YearBadge({ year, accentColor, rgb, hovered, side }: {
  year: string; accentColor: string; rgb: string; hovered: boolean; side: "left" | "right";
}) {
  return (
    <motion.div
      animate={{ opacity: hovered ? 1 : 0.55 }}
      transition={{ duration: 0.4 }}
      className={`flex ${side === "left" ? "justify-end pr-6" : "justify-start pl-6"}`}
    >
      <div
        className="flex items-center gap-2 rounded-full border px-4 py-2"
        style={{
          borderColor: `rgba(${rgb},0.22)`,
          background: `rgba(${rgb},0.06)`,
        }}
      >
        <span
          style={{
            fontFamily: "'Ultramagnetic','Terquiny',monospace",
            fontSize: "clamp(1.2rem,2vw,1.7rem)",
            color: accentColor,
            letterSpacing: "0.04em",
            filter: hovered ? `drop-shadow(0 0 10px rgba(${rgb},0.6))` : "none",
            transition: "filter 0.35s ease",
          }}
        >
          {year}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Row: alternating left-right layout ─── */
function TimelineRow({ event, index, isLast }: { event: WorkshopEvent; index: number; isLast: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isRight = index % 2 === 0; // even = right side, odd = left side
  const cardSide = isRight ? "right" : "left";

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06, rootMargin: "-20px 0px" }
    );
    if (rowRef.current) io.observe(rowRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rowRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Three-column grid: left | center-line | right */}
      <div className="grid items-start" style={{ gridTemplateColumns: "1fr 80px 1fr", gap: "0" }}>

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col justify-start pt-2">
          {isRight ? (
            /* Year badge on right side's left column */
            <div className="flex flex-col items-end gap-3 text-right">
              <YearBadge
                year={event.year}
                accentColor={event.accentColor}
                rgb={event.rgb}
                hovered={hovered}
                side="left"
              />
              <motion.p
                animate={{ opacity: hovered ? 0.65 : 0.28, color: hovered ? event.accentColor : "rgba(255,255,255,0.3)" }}
                transition={{ duration: 0.35 }}
                className="pr-6 text-right"
                style={{ fontFamily: "'Kyros',monospace", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                {event.type}
              </motion.p>

              {/* Connecting horizontal rule from year to dot */}
              <div className="flex items-center justify-end w-full pr-0 mt-1">
                <motion.div
                  animate={{ scaleX: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="h-px origin-right"
                  style={{
                    width: "100%",
                    background: `linear-gradient(to left, ${event.accentColor}cc, transparent)`,
                  }}
                />
              </div>
            </div>
          ) : (
            /* Card on left side */
            <div className="pr-8">
              <EntryCard event={event} visible={visible} hovered={hovered} side="left" />
            </div>
          )}
        </div>

        {/* ── CENTER: dot ── */}
        <div className="flex items-start justify-center pt-6">
          <ConnectorDot event={event} hovered={hovered} />
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col justify-start pt-2">
          {isRight ? (
            /* Card on right side */
            <div className="pl-8">
              <EntryCard event={event} visible={visible} hovered={hovered} side="right" />
            </div>
          ) : (
            /* Year badge on left side's right column */
            <div className="flex flex-col items-start gap-3">
              <YearBadge
                year={event.year}
                accentColor={event.accentColor}
                rgb={event.rgb}
                hovered={hovered}
                side="right"
              />
              <motion.p
                animate={{ opacity: hovered ? 0.65 : 0.28, color: hovered ? event.accentColor : "rgba(255,255,255,0.3)" }}
                transition={{ duration: 0.35 }}
                className="pl-6"
                style={{ fontFamily: "'Kyros',monospace", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                {event.type}
              </motion.p>

              {/* Connecting horizontal rule from dot to year */}
              <div className="flex items-center w-full mt-1">
                <motion.div
                  animate={{ scaleX: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="h-px origin-left"
                  style={{
                    width: "100%",
                    background: `linear-gradient(to right, ${event.accentColor}cc, transparent)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer between rows */}
      {!isLast && (
        <div className="relative" style={{ height: "96px" }}>
          {/* Subtle tick mark on center line */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: "calc(50% - 2px)", width: "4px", height: "4px" }}
          >
            <div className="h-full w-full rounded-full bg-white/10" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Root ─── */
export default function InternshipsTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="internships" className="relative bg-void overflow-hidden">

      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-neon/[0.018] blur-[220px]" />
        <div className="absolute top-2/3 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/[0.015] blur-[200px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/[0.012] blur-[180px]" />
        {/* Subtle center column glow to reinforce the timeline axis */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,255,148,0.03) 20%, rgba(0,255,148,0.03) 80%, transparent)" }} />
      </div>

      {/* Heading */}
      <div className="relative px-6 pt-28 sm:px-12 md:px-16 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Growth Path"
            title="Workshops & Internships"
            subtitle="Real-world experiences that sharpened my engineering edge — from top research labs to intensive hands-on workshops."
            align="center"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative w-full px-4 sm:px-8 md:px-12 lg:px-20">
        <div ref={trackRef} className="relative mx-auto max-w-6xl mt-20 pb-32">

          <ScrollLine trackRef={trackRef as React.RefObject<HTMLDivElement>} />

          {EVENTS.map((event, i) => (
            <TimelineRow
              key={event.id}
              event={event}
              index={i}
              isLast={i === EVENTS.length - 1}
            />
          ))}

          {/* Terminal cap */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <div className="h-14 w-px" style={{ background: "linear-gradient(to bottom, rgba(0,255,148,0.3), transparent)" }} />
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed"
              style={{
                borderColor: "rgba(0,255,148,0.3)",
                backgroundColor: "rgba(0,255,148,0.04)",
                boxShadow: "0 0 40px rgba(0,255,148,0.1)",
              }}
            >
              <div
                className="h-2.5 w-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#00ff94", boxShadow: "0 0 12px #00ff94" }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Kyros',monospace",
                fontSize: "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(0,255,148,0.3)",
              }}
            >
              More Coming
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}