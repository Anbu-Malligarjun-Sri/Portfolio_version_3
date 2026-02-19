"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

/* ─────────────────────────────────────────────────────────────
   Config
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const VENTURE_LINKS = [
  { label: "Sagittarius", href: "/sagittarius", desc: "AI Research Startup" },
  { label: "Sam SciTech", href: "/youtube", desc: "Science YouTube" },
  { label: "Words & Worlds", href: "/writing", desc: "Writing & Essays" },
];

const SOCIAL_LINKS = [
  { icon: FaGithub,    href: "https://github.com/Anbu-Malligarjun-Sri",                                  label: "GitHub",     letter: "G" },
  { icon: FaLinkedin,  href: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/",               label: "LinkedIn",   letter: "in" },
  { icon: FaYoutube,   href: "https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg",                label: "YouTube",    letter: "Y" },
  { icon: SiLeetcode,  href: "https://www.leetcode.com/Anbu_Malligarjun_Sri/",                           label: "LeetCode",   letter: "Lc" },
  { icon: SiHackerrank, href: "https://www.hackerrank.com/profile/anbumalligarjun1",                     label: "HackerRank", letter: "HR" },
];

/* ─────────────────────────────────────────────────────────────
   Social Flip Card
───────────────────────────────────────────────────────────── */
function SocialFlipCard({
  item,
  index,
  parentHovered,
}: {
  item: typeof SOCIAL_LINKS[0];
  index: number;
  parentHovered: boolean;
}) {
  const [tooltip, setTooltip] = useState(false);
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      className="relative h-11 w-11 flex-shrink-0 cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, x: "-50%", scale: 0.85 }}
            animate={{ opacity: 1, y: -10, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 6, x: "-50%", scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-8 left-1/2 z-50 whitespace-nowrap rounded-lg bg-stark px-2.5 py-1 text-[10px] font-semibold text-void shadow-xl"
          >
            {item.label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-stark" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flip card */}
      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: parentHovered ? 180 : 0 }}
        transition={{
          duration: 0.7,
          type: "spring",
          stiffness: 130,
          damping: 16,
          delay: index * 0.07,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front – Letter */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] font-mono text-sm font-bold text-stark-muted backdrop-blur-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>
        {/* Back – Icon */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-neon text-void text-base font-bold shadow-[0_0_20px_rgba(0,255,148,0.3)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Icon />
        </div>
      </motion.div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Social flip strip with animated border lines
───────────────────────────────────────────────────────────── */
function SocialStrip() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-3 backdrop-blur-md overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated border shimmer */}
      <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl">
        <motion.div
          className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon/50 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon/30 to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {SOCIAL_LINKS.map((link, i) => (
        <SocialFlipCard
          key={link.label}
          item={link}
          index={i}
          parentHovered={hovered}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Magnetic "Back to Top" button
───────────────────────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          ref={btnRef}
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3 }}
          whileTap={{ scale: 0.92 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neon/25 bg-void/90 text-neon shadow-[0_0_30px_rgba(0,255,148,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-neon/50 hover:shadow-[0_0_40px_rgba(0,255,148,0.25)]"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated nav link
───────────────────────────────────────────────────────────── */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-1.5 text-[13px] text-stark-muted transition-all duration-200 hover:text-stark"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neon/60 transition-all duration-300 group-hover:w-full" />
      </span>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Footer
───────────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <>
      <BackToTop />

      <footer className="relative overflow-hidden border-t border-white/[0.05] bg-void/95 px-6 sm:px-12 lg:px-24">
        {/* ── Gradient top line ─ */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />

        {/* ── Ambient glows ─ */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-neon/[0.04] blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-500/[0.04] blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-neon/[0.015] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl py-20">

          {/* ── TOP: Brand + CTA row ─────────────────── */}
          <div className="mb-16 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">

            {/* Brand block */}
            <div className="max-w-sm">
              <motion.a
                href="#home"
                whileHover={{ scale: 1.03 }}
                className="inline-block"
              >
                <h2 className="font-serif-display text-5xl font-bold tracking-tighter text-stark">
                  AM<span className="text-neon">.</span>
                </h2>
              </motion.a>

              <p className="mt-5 text-[15px] leading-relaxed text-stark-muted">
                Engineering a future where technology restores what nature has lost.
                Building at the intersection of AI, robotics, and computational biology.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
                <span className="flex items-center gap-1.5 font-mono text-[12px] text-stark-dim">
                  <MapPin className="h-3 w-3" />
                  Tamil Nadu, India
                </span>
              </div>

              {/* CTA email */}
              <motion.a
                href="mailto:anbumalligarjun@gmail.com"
                whileHover={{ x: 4 }}
                className="mt-7 group inline-flex items-center gap-2.5 rounded-xl border border-neon/20 bg-neon/5 px-5 py-3 text-neon transition-all duration-300 hover:border-neon/40 hover:bg-neon/10 hover:shadow-[0_0_24px_rgba(0,255,148,0.15)]"
              >
                <Mail className="h-4 w-4" />
                <span className="font-mono text-[12px] tracking-wide">
                  anbumalligarjun@gmail.com
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>

            {/* Right block: social strip + tagline */}
            <div className="flex flex-col items-start lg:items-end gap-5">
              <div className="flex flex-col items-start lg:items-end gap-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-stark-dim">
                  Find me on
                </p>
                <SocialStrip />
              </div>
              <p className="font-mono text-[11px] text-stark-dim/50 italic">
                Hover to reveal →
              </p>
            </div>
          </div>

          {/* ── DIVIDER ─ */}
          <div className="mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* ── LINKS GRID ───────────────────────────── */}
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-[auto_auto_auto_1fr]">

            {/* Navigation */}
            <div>
              <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-stark-dim">
                Navigation
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ventures */}
            <div>
              <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-stark-dim">
                Ventures
              </p>
              <ul className="space-y-3">
                {VENTURE_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group flex flex-col gap-0.5"
                    >
                      <span className="relative text-[13px] text-stark-muted transition-colors duration-200 group-hover:text-stark">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neon/60 transition-all duration-300 group-hover:w-full" />
                      </span>
                      <span className="text-[10px] text-stark-dim/60">{l.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status card */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-1 lg:ml-auto">
              <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-stark-dim">
                Status
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-white/6 bg-white/[0.025] p-5 backdrop-blur-sm max-w-[220px]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-neon animate-pulse shadow-[0_0_8px_rgba(0,255,148,0.6)]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neon">
                    Open to Work
                  </span>
                </div>
                <p className="text-[12px] leading-relaxed text-stark-muted">
                  Actively looking for research internships, ML roles & collaborations.
                </p>
                <a
                  href="#contact"
                  className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-neon/70 transition-colors hover:text-neon"
                >
                  Let's connect
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* ── BOTTOM BAR ───────────────────────────── */}
          <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/[0.05] pt-10 sm:flex-row">
            <p className="text-[12px] text-stark-dim/50">
              © {new Date().getFullYear()}{" "}
              <span className="text-stark-dim font-medium">Anbu Malligarjun</span>.
              All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <p className="flex items-center gap-2 text-[12px] text-stark-dim/50">
                Built with
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-neon"
                >
                  ♥
                </motion.span>
                and pure curiosity.
              </p>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-stark-dim/40 transition-colors hover:text-neon"
              >
                Back to Top
                <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}