"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  TerminalSquare,
  Sparkles,
  Globe2,
  Fingerprint,
  Cpu
} from "lucide-react";
import { Github, Linkedin, Youtube, Code2, Terminal } from "lucide-react"; // Using lucide for consistency

/* ─────────────────────────────────────────────────────────────
   Config & Data
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
  { icon: Github, href: "https://github.com/Anbu-Malligarjun-Sri", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg", label: "YouTube" },
  { icon: Code2, href: "https://www.leetcode.com/Anbu_Malligarjun_Sri/", label: "LeetCode" },
  { icon: Terminal, href: "https://www.hackerrank.com/profile/anbumalligarjun1", label: "HackerRank" },
];

/* ─────────────────────────────────────────────────────────────
   Component: Neural Particle Canvas
───────────────────────────────────────────────────────────── */
function ParticleNetwork() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: undefined, y: undefined, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    setCanvasSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      draw() {
        ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouseRef.current.x != null) {
          let dx = mouseRef.current.x - this.x;
          let dy = mouseRef.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseRef.current.radius) {
            let force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            this.x -= (dx / distance) * force * this.density * 0.1;
            this.y -= (dy / distance) * force * this.density * 0.1;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - distance / 120) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
        
        if (mouseRef.current.x != null) {
           let dx = particlesArray[a].x - mouseRef.current.x;
           let dy = particlesArray[a].y - mouseRef.current.y;
           let distance = Math.sqrt(dx * dx + dy * dy);
           if (distance < 180) {
             ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - distance / 180) * 0.4})`;
             ctx.lineWidth = 1.2;
             ctx.beginPath();
             ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
             ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
             ctx.stroke();
           }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      setCanvasSize();
      init();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />;
}

/* ─────────────────────────────────────────────────────────────
   Component: Decrypt Text Effect
───────────────────────────────────────────────────────────── */
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|><?";

function DecryptText({ text, className, speed = 30, as: Component = "span" }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const triggerEffect = useCallback(() => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === " ") return " ";
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 3;
    }, speed);
  }, [text, speed]);

  const resetEffect = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <Component
      onMouseEnter={triggerEffect}
      onMouseLeave={resetEffect}
      className={`${className} cursor-crosshair`}
    >
      {displayText}
    </Component>
  );
}

/* ─────────────────────────────────────────────────────────────
   Component: Magnetic Wrapper
───────────────────────────────────────────────────────────── */
function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Component: Reliable Live Terminal Status Card
───────────────────────────────────────────────────────────── */
function LiveStatusCard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Magnetic strength={0.05}>
      {/* Explicit min-width prevents flex collapse, strict padding */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-2xl transition-all hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] w-full max-w-[400px] shadow-2xl shrink-0"
      >
        <motion.div 
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-0 h-16 w-full bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent pointer-events-none"
        />
        
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 opacity-50" />
        
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">System Core</span>
          </div>
          {/* Explicit flex row, no wrap */}
          <div className="flex flex-row items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 whitespace-nowrap">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Online</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 font-mono text-sm text-zinc-300 relative z-10">
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500 whitespace-nowrap">Local Time</span>
            <span className="flex items-center gap-1.5 text-zinc-100 font-semibold truncate">
              <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              {time || "Syncing..."} IST
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500 whitespace-nowrap">Coordinates</span>
            <span className="flex items-center gap-1.5 text-zinc-100 font-semibold truncate">
              <Globe2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              TN, IND
            </span>
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Current Objective</span>
            <p className="text-xs leading-relaxed text-emerald-400/90 font-medium">
              <DecryptText text="> Securing ML internships" speed={15} /> <br/>
              <DecryptText text="> Architecting AI systems" speed={15} /> <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </motion.div>
    </Magnetic>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Footer Component
───────────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <div className="relative w-full bg-zinc-950 font-sans selection:bg-emerald-400/30 pt-32">
      
      {/* Cinematic CRT Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-overlay" />

      <footer className="relative w-full overflow-hidden border-t border-emerald-400/20 bg-zinc-950">
        
        {/* Generative Interactive Background */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork />
        </div>

        {/* Ambient static glows */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-40 bottom-0 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />
          <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-emerald-800/10 blur-[150px]" />
        </div>

        {/* ── Strict Container ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12">
          
          {/* ── TOP GRID: Brand & Status ─────────────────── */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 mb-24">
            
            {/* Left: Brand Intro */}
            <div className="flex flex-col items-start lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group inline-block cursor-default"
              >
                <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-100 flex items-baseline">
                  <DecryptText text="ANBU" speed={40} className="text-zinc-100 whitespace-nowrap" />
                  <span className="text-emerald-400">.</span>
                </h2>
              </motion.div>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
                Engineering a future where technology restores what nature has lost.
                Building at the intersection of <span className="text-zinc-200 font-semibold">AI, robotics, and computational biology.</span>
              </p>

              <div className="mt-10">
                <Magnetic strength={0.2}>
                  {/* Strict inline-flex and whitespace-nowrap to prevent button text breaking */}
                  <motion.a
                    href="mailto:anbumalligarjun@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 pl-2 pr-6 py-2 text-emerald-400 backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400/20 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] whitespace-nowrap"
                  >
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-zinc-950 transition-transform duration-300 group-hover:rotate-180">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-sm tracking-wide font-medium hidden sm:inline-block">
                      <DecryptText text="anbumalligarjun@gmail.com" speed={20} />
                    </span>
                    <span className="font-mono text-sm tracking-wide font-medium sm:hidden">
                      Email Me
                    </span>
                    <ArrowUpRight className="ml-1 h-4 w-4 shrink-0 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                  </motion.a>
                </Magnetic>
              </div>
            </div>

            {/* Right: Live Terminal Status */}
            <div className="flex justify-start lg:col-span-5 lg:justify-end items-start w-full">
               <LiveStatusCard />
            </div>
          </div>

          {/* ── DIVIDER ─ */}
          <div className="mb-16 h-px w-full bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0" />

          {/* ── MIDDLE GRID: Links & Social ───────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Navigation */}
            <div className="col-span-1">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">
                Navigation
              </p>
              <ul className="space-y-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <Magnetic strength={0.1}>
                      <a href={l.href} className="group relative inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/0 transition-colors group-hover:bg-emerald-400" />
                        <DecryptText text={l.label} speed={15} />
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ventures */}
            <div className="col-span-1 sm:col-span-1 md:col-span-2">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">
                Ventures
              </p>
              <ul className="space-y-5">
                {VENTURE_LINKS.map((l) => (
                  <li key={l.label}>
                    <Magnetic strength={0.1}>
                      <a href={l.href} className="group flex flex-col gap-1">
                        <span className="relative text-sm font-medium text-zinc-300 transition-colors group-hover:text-emerald-400 w-fit">
                          <DecryptText text={l.label} speed={15} />
                        </span>
                        <span className="text-xs text-zinc-500 transition-colors group-hover:text-emerald-400/70 font-mono">{l.desc}</span>
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Dock */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-start md:items-end">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">
                Network
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Magnetic key={link.label} strength={0.3}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 shadow-lg backdrop-blur-md transition-all hover:bg-emerald-400/10 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      >
                        <Icon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-emerald-400" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── BOTTOM BAR ───────────────────────────── */}
          <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row relative z-10">
            <p className="font-mono text-xs text-zinc-500 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-zinc-300 font-medium tracking-wide">Anbu Malligarjun</span>. <br className="sm:hidden" />
              Matrix initialized.
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              Forged with 
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-emerald-400 mx-1 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              >
                ♥
              </motion.span>
              & kinetic physics.
            </div>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900 transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/10 sm:hidden"
            >
               <ArrowUp className="h-4 w-4 text-emerald-400 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}