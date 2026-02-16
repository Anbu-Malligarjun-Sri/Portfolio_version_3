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
    <footer className="relative border-t border-void-400/50 bg-void-50/50 px-6 py-16 backdrop-blur-sm sm:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr,1fr,auto]">
          {/* Brand */}
          <div>
            <p className="font-sans text-2xl font-bold text-gradient">AM</p>
            <p
              className="mt-3 text-[13px] leading-relaxed text-stark-dim"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Engineer. Founder. Builder.
            </p>
            <p
              className="mt-1 text-[13px] text-stark-dim"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Tamil Nadu, India
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-void-400/50 text-stark-dim transition-all duration-300 hover:border-neon/25 hover:text-neon hover:scale-105"
                  >
                    <Icon className="h-3.5 w-3.5" />
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
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-void-400/40 pt-8 sm:flex-row">
          <p className="text-[11px] text-stark-dim">
            &copy; {new Date().getFullYear()} Anbu Malligarjun. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-stark-dim">
            Built with
            <Heart className="inline h-3 w-3 fill-neon text-neon" />
            and an unreasonable amount of curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
