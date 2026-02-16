"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "words" | "chars" | "lines";

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  animation?: AnimationType;
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  scrub?: boolean;
  /** Trigger start position, default "top 85%" */
  start?: string;
}

export default function AnimatedText({
  children,
  as: Tag = "p",
  className = "",
  animation = "words",
  stagger = 0.04,
  duration = 0.6,
  delay = 0,
  once = true,
  scrub = false,
  start = "top 85%",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split text into spans
    const text = el.textContent || "";
    let fragments: string[] = [];

    if (animation === "chars") {
      fragments = text.split("");
    } else if (animation === "words") {
      fragments = text.split(/(\s+)/);
    } else {
      fragments = text.split("\n");
    }

    // Build innerHTML with wrapped spans
    el.innerHTML = fragments
      .map((frag) => {
        if (/^\s+$/.test(frag)) return frag; // preserve whitespace
        return `<span class="at-wrap" style="display:inline-block;overflow:hidden"><span class="at-inner" style="display:inline-block">${frag}</span></span>`;
      })
      .join("");

    const inners = el.querySelectorAll(".at-inner");

    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: el,
      start,
      ...(scrub
        ? { scrub: 1, end: "bottom 60%" }
        : { toggleActions: once ? "play none none none" : "play reverse play reverse" }),
    };

    gsap.fromTo(
      inners,
      { y: "110%", opacity: 0, rotateX: 30 },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: scrollTriggerConfig,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      // Restore original text
      el.textContent = text;
    };
  }, [children, animation, stagger, duration, delay, once, scrub, start]);

  return (
    <div ref={containerRef} className={className} role={Tag === "p" ? undefined : "heading"} aria-level={Tag === "h1" ? 1 : Tag === "h2" ? 2 : Tag === "h3" ? 3 : Tag === "h4" ? 4 : undefined}>
      {children}
    </div>
  );
}
