"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`mb-20 md:mb-28 ${align === "center" ? "text-center" : ""}`}
    >
      <div
        className="mb-5 flex items-center gap-3 transition-all duration-700"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <span className="h-px w-10 bg-neon/50" />
        <span className="font-mono text-[10px] tracking-[0.5em] text-neon uppercase">
          {label}
        </span>
      </div>
      <h2
        className="font-sans font-bold text-display tracking-tight text-stark transition-all duration-700 delay-100"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-stark-muted transition-all duration-700 delay-200"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            fontFamily: 'var(--font-body)',
            ...(align === "left" ? {} : { marginInline: "auto" }),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
