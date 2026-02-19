"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import { SplineScene } from "./ui/SplineScene";

/* ── Letter-by-letter title reveal ── */
function AnimatedTitle({ text, className, delay = 0, style }: {
  text: string;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <span className={className} style={style}>
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


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * `splineContainerRef` targets the Spline wrapper div so we
   * can query the <canvas> element inside it and dispatch
   * synthetic mousemove events from the window listener below.
   */
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const [splineReady, setSplineReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  /** Background gradient: fades gently (never fully hides) */
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  /**
   * Spline robot: two-step fade — raw transform + spring wrapper.
   * The spring (stiffness 80, damping 22) gives the fade a slight
   * physical "ease-out" feel instead of a mechanical linear curve.
   * Fully transparent by 55% scroll — before the next section arrives.
   */
  const splineOpacityRaw = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const splineOpacity = useSpring(splineOpacityRaw, { stiffness: 80, damping: 22 });

  const SPLINE_SCENE_URL =
    process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ??
    "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

  /**
   * GLOBAL MOUSE → SPLINE ROBOT
   *
   * Spline / Three.js uses the Pointer Events API (`pointermove`),
   * NOT the older Mouse Events API (`mousemove`). Dispatching a
   * MouseEvent was silently ignored by Spline's internal listeners.
   *
   * CSS `pointer-events: none` only blocks the BROWSER's hit-test
   * routing — it does NOT prevent programmatic `dispatchEvent()`
   * from firing listeners attached via `addEventListener`. So we
   * can keep the canvas non-blocking while still forwarding all
   * real window pointer moves into it.
   */
  useEffect(() => {
    if (!splineReady) return;

    const canvas = splineContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const forward = (e: PointerEvent) => {
      canvas.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          cancelable: false,
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          movementX: e.movementX,
          movementY: e.movementY,
          pointerType: "mouse",
          isPrimary: true,
        })
      );
    };

    /** Also fire `pointerover` once so Spline registers the cursor is present */
    const enter = (e: PointerEvent) => {
      canvas.dispatchEvent(
        new PointerEvent("pointerover", {
          bubbles: true, cancelable: false,
          clientX: e.clientX, clientY: e.clientY,
          pointerType: "mouse", isPrimary: true,
        })
      );
    };

    window.addEventListener("pointermove", forward, { passive: true });
    window.addEventListener("pointerenter", enter, { passive: true });
    return () => {
      window.removeEventListener("pointermove", forward);
      window.removeEventListener("pointerenter", enter);
    };
  }, [splineReady]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── MULTI-LAYER BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      {/* ── 3D SPLINE ROBOT ──────────────────────────────────────
           DESIGN DECISIONS:
           1. `absolute inset-0`  → canvas spans the full hero so
              global mouse tracking from the viewport edges works.
           2. `pointer-events-none` on ALL wrappers → zero click
              blocking. Mouse interaction delivered via the window
              listener above (not native canvas pointer events).
           3. `[&_canvas]:pointer-events-none` Tailwind child
              selector enforces no-block at the canvas level too.
           4. No background, border, or shadow → seamless.
           5. `z-[1]` keeps robot below text (z-10) but above bg (z-0).
           6. `will-change-[opacity]` promotes to GPU compositor
              layer so the scroll-fade never drops frames.
      ─────────────────────────────────────────────────────────── */}
      {/*
        ── 3D SPLINE ROBOT ────────────────────────────────────────
        Container anchored to the RIGHT half of the hero.
        - `right-0 w-[58%]` on md+: robot lives in the right column,
          leaving the left 42% fully clear for text clicks.
        - `pointer-events-none` on the wrapper only; the canvas
          itself is NOT set to pointer-events-none so Spline's own
          internal listeners fire when hovering in the right half.
        - A global `pointermove` window listener (above) forwards
          pointer position from the LEFT half too, giving the robot
          full-viewport awareness.
        - `[&_canvas]:bg-transparent` kills the default Spline
          canvas background so no rectangle frame is visible.
      ──────────────────────────────────────────────────────────── */}
      <motion.div
        ref={splineContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: splineOpacity }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="pointer-events-none absolute inset-y-0 right-0 z-1 w-full md:w-[58%] will-change-[opacity]"
        aria-hidden="true"
      >
        <SplineScene
          scene={SPLINE_SCENE_URL}
          className="h-full w-full [&_canvas]:pointer-events-auto [&_canvas]:bg-transparent! [&_canvas]:cursor-none"
          onLoad={() => setSplineReady(true)}
        />
      </motion.div>

      {/* ── FIXED LEFT MARGIN RULE — editorial grid marker ── */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 hidden lg:block"
        style={{ left: "clamp(32px, 4vw, 64px)", width: 1, background: "rgba(255,255,255,0.08)" }}
        aria-hidden="true"
      />

      {/* ── TEXT CONTENT ── */}
      <div
        className="relative z-10 w-full pointer-events-none"
        style={{ paddingLeft: "clamp(40px, 6vw, 96px)", paddingTop: "10vh", paddingBottom: "10vh" }}
      >
        <motion.div className="max-w-130" style={{ y: contentY }}>

          {/* Decorative entry line + role label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="mb-3 flex items-center gap-4"
          >
            {/* 40px horizontal rule */}
            <div className="h-px w-10 bg-white/20 shrink-0" />
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "rgba(0,255,148,0.55)",
                textTransform: "uppercase",
              }}
            >
              AI · Biology · Education
            </span>
          </motion.div>

          {/* Name block — Cormorant Garamond italic, tight leading */}
          <h1 style={{ lineHeight: 1, marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <AnimatedTitle
              text="Anbu"
              className="block"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(5.5rem, 13vw, 11rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.015em",
                /* White → warm off-white gradient painted via a non-clip method
                   so it stays visible inside Framer Motion opacity containers */
                color: "#F0EDE8",
                textShadow: "0 2px 40px rgba(255,255,255,0.06)",
              }}
              delay={0.35}
            />
            <AnimatedTitle
              text="Malligarjun"
              className="block"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(3rem, 8vw, 7.2rem)",
                lineHeight: 0.92,
                letterSpacing: "0.005em",
                color: "#C8F5E8",
              }}
              delay={0.65}
            />
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" }}
            style={{
              fontFamily: "'Eloquia', system-ui, sans-serif",
              fontWeight: 200,
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              lineHeight: 1.85,
              letterSpacing: "0.01em",
              color: "rgba(161,161,170,0.85)",
              maxWidth: "420px",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Building at the intersection of{" "}
            <span style={{ color: "#2FFFB0" }}>AI</span>,{" "}
            <span style={{ color: "#2FFFB0" }}>Biology</span>, and{" "}
            <span style={{ color: "#2FFFB0" }}>Education</span>{" "}
            — engineering a future where technology restores what nature has lost.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35, ease: "easeOut" }}
            className="flex items-center gap-8 pointer-events-auto"
          >
            {/* Outlined teal button */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid rgba(0,255,148,0.45)",
                borderRadius: "9999px",
                padding: "10px 28px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00FF94",
                background: "transparent",
                transition: "background 0.25s, border-color 0.25s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,148,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,148,0.7)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,148,0.45)";
              }}
            >
              Explore My Vision
            </a>

            {/* Ghost text link */}
            <a
              href="#projects"
              className="group"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(242,242,242,0.55)",
                transition: "color 0.2s",
                position: "relative",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,242,242,0.9)";
                const line = (e.currentTarget as HTMLAnchorElement).querySelector("span") as HTMLSpanElement;
                if (line) { line.style.transform = "scaleX(1)"; line.style.transformOrigin = "left"; }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,242,242,0.55)";
                const line = (e.currentTarget as HTMLAnchorElement).querySelector("span") as HTMLSpanElement;
                if (line) { line.style.transform = "scaleX(0)"; line.style.transformOrigin = "right"; }
              }}
            >
              View Projects
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  height: 1,
                  width: "100%",
                  background: "rgba(242,242,242,0.35)",
                  transformOrigin: "right",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                }}
              />
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ──
           Lifted OUT of the max-w-2xl content div and into the
           section itself. Previously it was `absolute` inside a
           constrained container, making it visually off-center
           on wide screens. Now it properly centers on viewport width.
      ── */}
      {/* ── SCROLL DOT — pulsing scale only, no label, no arrow ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-2 rounded-full bg-neon shadow-[0_0_0_4px_rgba(0,255,148,0.15)]"
        />
      </motion.div>

      {/* ── BOTTOM GRADIENT FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-void to-transparent z-20 pointer-events-none" />
    </section>
  );
}
