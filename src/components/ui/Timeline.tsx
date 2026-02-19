"use client";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// ─── Animated number counter for the year label ────────────────────────────
function GlitchYear({ title, isActive }: { title: string; isActive: boolean }) {
  const [displayed, setDisplayed] = useState(title);
  const chars = "0123456789";

  useEffect(() => {
    if (!isActive) return;
    let iterations = 0;
    const max = 12;
    const interval = setInterval(() => {
      setDisplayed(
        title
          .split("")
          .map((char, i) =>
            iterations > i * 3
              ? title[i]
              : /[0-9]/.test(char)
              ? chars[Math.floor(Math.random() * chars.length)]
              : char
          )
          .join("")
      );
      if (++iterations >= max + title.length * 3) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [isActive, title]);

  return <>{displayed}</>;
}

// ─── Individual timeline item ──────────────────────────────────────────────
function TimelineItem({
  item,
  index,
  totalItems,
}: {
  item: TimelineEntry;
  index: number;
  totalItems: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "-60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex justify-start pt-10 md:gap-12 md:pt-32"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── LEFT: Sticky year ─────────────────────────────── */}
      <div className="sticky top-36 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">

        {/* Node */}
        <div className="relative left-3 md:left-3">
          {/* Outer ring pulse */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="ring"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.9, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-neon/40"
              />
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              boxShadow: hovered
                ? "0 0 28px 6px rgba(0,255,148,0.25), 0 0 0 1.5px rgba(0,255,148,0.4)"
                : "0 0 14px 2px rgba(0,255,148,0.08), 0 0 0 1px rgba(255,255,255,0.06)",
              scale: hovered ? 1.12 : 1,
            }}
            transition={{ duration: 0.35 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#080c0a] border border-white/8 backdrop-blur-md"
          >
            <motion.div
              animate={{
                backgroundColor: hovered
                  ? "rgba(0,255,148,1)"
                  : "rgba(0,255,148,0.7)",
                boxShadow: hovered
                  ? "0 0 18px 4px rgba(0,255,148,0.7)"
                  : "0 0 10px 2px rgba(0,255,148,0.4)",
              }}
              transition={{ duration: 0.3 }}
              className="h-3 w-3 rounded-full"
            />
          </motion.div>
        </div>

        {/* Year label — desktop only */}
        <h3 className="hidden select-none font-mono text-[4.5rem] font-bold leading-none tracking-tighter md:block md:pl-20 transition-all duration-500 tabular-nums"
          style={{
            color: hovered ? "rgba(0,255,148,0.22)" : "rgba(255,255,255,0.05)",
            textShadow: hovered ? "0 0 60px rgba(0,255,148,0.1)" : "none",
            letterSpacing: "-0.04em",
          }}
        >
          <GlitchYear title={item.title} isActive={hovered || inView} />
        </h3>
      </div>

      {/* ── RIGHT: Content card ───────────────────────────── */}
      <div className="relative w-full pl-20 pr-2 md:pl-2">
        {/* Year label — mobile only */}
        <p className="mb-4 block font-mono text-3xl font-bold tracking-tighter text-neon/30 md:hidden">
          {item.title}
        </p>

        <motion.div
          animate={{
            borderColor: hovered
              ? "rgba(0,255,148,0.12)"
              : "rgba(255,255,255,0.04)",
            backgroundColor: hovered
              ? "rgba(255,255,255,0.028)"
              : "rgba(255,255,255,0.015)",
            boxShadow: hovered
              ? "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 4px 20px rgba(0,0,0,0.2)",
            translateX: hovered ? 4 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border bg-white/[0.015] p-7 md:p-9 backdrop-blur-sm"
        >
          {/* Corner accent */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 h-[1px] w-24 origin-left rounded-full bg-gradient-to-r from-neon/60 to-transparent"
          />
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="absolute top-0 left-0 w-[1px] h-16 origin-top rounded-full bg-gradient-to-b from-neon/60 to-transparent"
          />

          {item.content}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Timeline ─────────────────────────────────────────────────────────
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setHeight(trackRef.current.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  // Smooth spring for the progress line
  const springHeight = useSpring(lineHeight, { stiffness: 80, damping: 20, mass: 0.8 });

  return (
    <div
      ref={containerRef}
      className="relative w-full font-sans md:px-10 overflow-hidden"
    >
      {/* Ambient glow — far background */}
      <div className="pointer-events-none absolute left-4 top-1/4 h-[500px] w-[2px] blur-[20px] bg-gradient-to-b from-transparent via-neon/15 to-transparent" />

      <div ref={trackRef} className="relative mx-auto max-w-7xl pb-20">

        {data.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            totalItems={data.length}
          />
        ))}

        {/* ── Track rail ──────────────────────────────────── */}
        <div
          style={{ height }}
          className="absolute left-8 top-0 w-px md:left-8"
        >
          {/* Static ghost rail */}
          <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />

          {/* Animated fill */}
          <motion.div
            style={{ height: springHeight, opacity: lineOpacity }}
            className="absolute top-0 left-0 w-px overflow-hidden rounded-full"
          >
            <div className="h-full w-full bg-gradient-to-b from-neon/70 via-neon/40 to-neon/5"
              style={{ filter: "drop-shadow(0 0 4px rgba(0,255,148,0.6))" }}
            />
          </motion.div>

          {/* Travelling glow dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon"
            aria-hidden
            style={{
              top: springHeight as any,
              boxShadow: "0 0 16px 4px rgba(0,255,148,0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;