"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const VENTURE_LINKS = [
  { label: "Sagittarius", href: "/sagittarius" },
  { label: "Sam SciTech", href: "/youtube" },
  { label: "Words & Worlds", href: "/writing" },
];

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    href: "https://github.com/Anbu-Malligarjun-Sri",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/",
    label: "LinkedIn",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg",
    label: "YouTube",
  },
  {
    icon: SiLeetcode,
    href: "https://www.leetcode.com/Anbu_Malligarjun_Sri/",
    label: "LeetCode",
  },
  {
    icon: SiHackerrank,
    href: "https://www.hackerrank.com/profile/anbumalligarjun1",
    label: "HackerRank",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-void/80 px-6 py-24 backdrop-blur-xl sm:px-12 lg:px-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-neon/5 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-16 md:grid-cols-[1.5fr,1fr,1fr,auto]">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <div className="group cursor-pointer">
              <p className="font-serif-display text-4xl font-bold tracking-tighter text-stark transition-all duration-300 group-hover:text-neon">
                AM<span className="text-neon">.</span>
              </p>
            </div>
            <p
              className="mt-6 max-w-xs text-[15px] leading-relaxed text-stark-muted"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Engineering a future where technology restores what nature has lost. Let&apos;s build something that matters.
            </p>
            <p
              className="mt-4 flex items-center gap-2 text-[13px] font-medium text-stark-dim"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
              Tamil Nadu, India
            </p>

            {/* Social icons */}
            <div className="mt-10 flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-stark-dim transition-all duration-500 hover:border-neon/30 hover:text-neon hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(0,255,148,0.2)]"
                  >
                    <Icon className="h-4 w-4 relative z-10" />
                    <div className="absolute inset-0 scale-0 rounded-xl bg-neon/5 transition-transform duration-500 group-hover:scale-100" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <p className="mb-4 font-mono text-[9px] tracking-[0.3em] text-stark-dim uppercase">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-stark-muted transition-colors duration-200 hover:text-neon"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ventures links */}
          <div>
            <p className="mb-4 font-mono text-[9px] tracking-[0.3em] text-stark-dim uppercase">
              Ventures
            </p>
            <ul className="space-y-2.5">
              {VENTURE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-stark-muted transition-colors duration-200 hover:text-neon"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top */}
          <div className="flex flex-col items-end justify-start">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-void-400/50 text-stark-dim transition-all duration-300 hover:border-neon/25 hover:text-neon"
              data-cursor-hover
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
            <span className="mt-2 font-mono text-[8px] tracking-wider text-stark-dim uppercase">
              Top
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 sm:flex-row">
          <p className="text-[12px] font-medium text-stark-dim/60">
            &copy; {new Date().getFullYear()} <span className="text-stark">Anbu Malligarjun</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2 text-[12px] font-medium text-stark-dim/60">
              Built with
              <Heart className="inline h-3.5 w-3.5 fill-neon text-neon animate-pulse" />
              and pure curiosity.
            </p>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-neon/60 transition-all duration-300 hover:text-neon"
              data-cursor-hover
            >
              Back to Top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
