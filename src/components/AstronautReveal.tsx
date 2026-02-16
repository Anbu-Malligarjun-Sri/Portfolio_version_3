"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/* ═══════════════════════════ CONFIG ═══════════════════════════ */

const TOTAL_FRAMES = 261;
const FRAME_PATH = "/Video_frames_updated/ezgif-frame-";

/*
 * Scroll-phase timeline (0 → 1 of section scroll):
 *
 *  ╔═══════════════════════════════════════════════════════════════╗
 *  ║  0.00  Astronaut visible (contain-fit, natural size)         ║
 *  ║  0.00─0.82  Frame sequence plays                             ║
 *  ║  0.25─0.65  Canvas subtly zooms (contain → cover blend)      ║
 *  ║  0.40─0.70  Dark letterbox bars transition → white           ║
 *  ║  0.35─0.65  Vignette dissolves away                          ║
 *  ║  0.75─0.92  Text content fades in on white background        ║
 *  ╚═══════════════════════════════════════════════════════════════╝
 */
const REVEAL_START = 0.75;
const REVEAL_END = 0.92;

const pad = (n: number) => String(n).padStart(3, "0");
const frameSrc = (i: number) => `${FRAME_PATH}${pad(i + 1)}.jpg`;

/** Clamp-based lerp helper */
const remap = (value: number, inLow: number, inHigh: number) =>
  Math.min(1, Math.max(0, (value - inLow) / (inHigh - inLow)));

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

export default function AstronautReveal() {
  /* ── Refs ── */
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const scrollRef = useRef(0); // raw scroll progress (0–1)
  const rafRef = useRef<number | null>(null);

  /* ── State ── */
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealOpacity, setRevealOpacity] = useState(0);

  /* ── Scroll ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 0.82], [0, TOTAL_FRAMES - 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.65], [1, 0.5, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  /* "ABOUT ME" title: fades in early, stays visible, fades out when paper unfolds */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.38], [0, 1, 1, 0]);

  useMotionValueEvent(frameIndex, "change", (v) => {
    frameRef.current = Math.max(0, Math.min(Math.round(v), TOTAL_FRAMES - 1));
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
    if (v < REVEAL_START) setRevealOpacity(0);
    else if (v >= REVEAL_END) setRevealOpacity(1);
    else setRevealOpacity((v - REVEAL_START) / (REVEAL_END - REVEAL_START));
  });

  /* ══════════════════════════════════════════════════════════════
   *  DRAW — the heart of the storytelling
   *
   *  This function does THREE things based on scroll progress:
   *    1. Blends between contain-fit and cover-fit (zoom into scene)
   *    2. Transitions the letterbox bar color from black → white
   *    3. Fades the vignette out so white paper stays crisp
   * ══════════════════════════════════════════════════════════════ */
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const cw = c.width;
    const ch = c.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const progress = scrollRef.current;

    /* ── 1. Blended scale: contain → cover ── */
    const containScale = Math.min(cw / iw, ch / ih);
    const coverScale = Math.max(cw / iw, ch / ih);
    const zoomT = remap(progress, 0.25, 0.65); // ease into cover
    const scale = containScale + (coverScale - containScale) * (zoomT * zoomT); // quad ease

    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    /* ── 2. Background/letterbox color: #050505 → white ── */
    const colorT = remap(progress, 0.40, 0.70);
    const fillVal = Math.round(5 + 250 * colorT);
    ctx.fillStyle = `rgb(${fillVal},${fillVal},${fillVal})`;
    ctx.fillRect(0, 0, cw, ch);

    /* ── Draw the frame ── */
    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);

    /* ── 3. Vignette (dissolves as paper takes over) ── */
    const vigStrength = 1 - remap(progress, 0.35, 0.65);
    if (vigStrength > 0.01) {
      const vig = ctx.createRadialGradient(
        cw / 2, ch / 2, cw * 0.28,
        cw / 2, ch / 2, cw * 0.72
      );
      vig.addColorStop(0, "rgba(5,5,5,0)");
      vig.addColorStop(0.65, `rgba(5,5,5,${0.25 * vigStrength})`);
      vig.addColorStop(1, `rgba(5,5,5,${0.85 * vigStrength})`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, cw, ch);
    }
  }, []);

  /* ── Resize ── */
  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    c.style.width = `${window.innerWidth}px`;
    c.style.height = `${window.innerHeight}px`;
    const img = imagesRef.current[frameRef.current];
    if (img?.complete) drawFrame(img);
  }, [drawFrame]);

  /* ── Preload ── */
  useEffect(() => {
    let dead = false;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let n = 0;
    const done = () => {
      if (dead) return;
      n++;
      setLoadProgress(Math.round((n / TOTAL_FRAMES) * 100));
      if (n === TOTAL_FRAMES) {
        imagesRef.current = imgs;
        setIsLoaded(true);
      }
    };
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = done;
      img.onerror = done;
      imgs[i] = img;
    }
    return () => {
      dead = true;
    };
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  /* ── rAF loop ── */
  useEffect(() => {
    if (!isLoaded) return;
    let last = -1;
    const tick = () => {
      const idx = Math.min(Math.max(frameRef.current, 0), TOTAL_FRAMES - 1);
      if (idx !== last) {
        const img = imagesRef.current[idx];
        if (img?.complete) {
          drawFrame(img);
          last = idx;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, drawFrame]);

  useEffect(() => {
    if (isLoaded) resizeCanvas();
  }, [isLoaded, resizeCanvas]);

  /* ═══════════════════════════ JSX ═══════════════════════════ */
  return (
    <section
      ref={sectionRef}
      className="relative h-[350vh] bg-[#050505]"
      aria-label="Astronaut paper-throw reveal"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* ────── Loading ────── */}
        {!isLoaded && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#050505]">
            <div className="relative mb-6">
              <svg className="h-20 w-20" viewBox="0 0 80 80">
                <circle
                  cx="40" cy="40" r="34"
                  fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5"
                />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none" stroke="url(#astrGrad)" strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${loadProgress * 2.136} 213.6`}
                  style={{ transition: "stroke-dasharray 0.3s ease" }}
                  transform="rotate(-90 40 40)"
                />
                <defs>
                  <linearGradient id="astrGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00FF94" />
                    <stop offset="100%" stopColor="#00ccff" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-medium tracking-wider text-white/60">
                {loadProgress}
              </span>
            </div>
            <p className="font-mono text-[9px] tracking-[0.5em] text-white/20 uppercase">
              Preparing experience
            </p>
          </div>
        )}

        {/* ────── Canvas ────── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: isLoaded ? "block" : "none" }}
        />

        {/* ────── "ABOUT ME" display title ────── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-5 flex items-start justify-center pt-[12vh]"
          style={{ opacity: titleOpacity }}
        >
          <h2
            className="text-center text-[clamp(3rem,8vw,7rem)] leading-none tracking-[0.15em] text-white/90 uppercase"
            style={{ fontFamily: "'Ultramagnetic', sans-serif" }}
          >
            About Me
          </h2>
        </motion.div>

        {/* ────── Ambient glow (dissolves with vignette) ────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-1"
          style={{ opacity: glowOpacity }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%]"
            style={{
              width: "min(600px, 70vw)",
              height: "min(600px, 70vh)",
              background:
                "radial-gradient(ellipse at center, rgba(255,140,50,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-[40%] -translate-y-[55%]"
            style={{
              width: "min(350px, 45vw)",
              height: "min(350px, 45vh)",
              background:
                "radial-gradient(ellipse at center, rgba(0,200,255,0.04) 0%, transparent 65%)",
            }}
          />
        </motion.div>

        {/* ────── Cinematic bars (fade with vignette) ────── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-2 h-28"
          style={{
            background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
            opacity: glowOpacity,
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-28"
          style={{
            background: "linear-gradient(to top, #050505 0%, transparent 100%)",
            opacity: glowOpacity,
          }}
        />

        {/* ────── Scroll hint ────── */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-3 -translate-x-1/2"
          style={{ opacity: scrollHintOpacity }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[8px] tracking-[0.5em] text-white/25 uppercase">
              Scroll to explore
            </span>
            <div className="relative h-10 w-px overflow-hidden bg-white/6">
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-4 bg-linear-to-b from-neon/60 to-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* ────── Text reveal ────── */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            opacity: revealOpacity,
            pointerEvents: revealOpacity > 0.15 ? "auto" : "none",
          }}
        >
          <div className="mx-auto max-w-2xl px-8 text-center">
            {/* Label */}
            <div
              className="mb-6 flex items-center justify-center gap-3"
              style={{ opacity: Math.min(1, revealOpacity * 1.5) }}
            >
              <span className="h-px w-8 bg-neutral-400/50" />
              <span className="font-mono text-[9px] tracking-[0.45em] text-neutral-500 uppercase">
                About me
              </span>
              <span className="h-px w-8 bg-neutral-400/50" />
            </div>

            {/* Headline */}
            <h2 className="font-sans text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-none tracking-[-0.035em] text-neutral-900">
              I build things
              <br />
              <span
                className="bg-linear-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-body)" }}
              >
                that matter.
              </span>
            </h2>

            {/* Bio */}
            <p
              className="mx-auto mt-8 max-w-lg text-[15px] font-light leading-loose text-neutral-600"
              style={{
                fontFamily: "var(--font-body)",
                opacity: Math.max(0, (revealOpacity - 0.3) / 0.7),
              }}
            >
              Engineer, founder, and researcher — working at the intersection of{" "}
              <span className="font-medium text-neutral-800">AI</span>,{" "}
              <span className="font-medium text-neutral-800">Deep Learning</span>,
              and{" "}
              <span className="font-medium text-neutral-800">Computer Vision</span>.
              From fine-tuning LLMs to shipping full-stack products.
            </p>

            {/* Stats */}
            <div
              className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-8"
              style={{ opacity: Math.max(0, (revealOpacity - 0.5) * 2) }}
            >
              {[
                { num: "6+", label: "Projects" },
                { num: "2", label: "Ventures" },
                { num: "5", label: "Languages" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="block font-sans text-2xl font-bold text-neutral-900">
                    {s.num}
                  </span>
                  <span className="mt-0.5 block font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
