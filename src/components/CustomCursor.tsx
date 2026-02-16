"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const cursorSize = 12;
  const cursorOuterSize = 40;
  const isVisible = useRef(false);
  const [cursorText, setCursorText] = useState("");

  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const scale = useMotionValue(1);
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 400 });

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
      if (!isVisible.current) isVisible.current = true;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl =
        target.closest("[data-cursor-text]") ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]");

      if (hoverEl) {
        const text = hoverEl.getAttribute("data-cursor-text") || "";
        if (text) {
          scale.set(4);
          setCursorText(text);
        } else {
          scale.set(2.5);
          setCursorText("");
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("[data-cursor-text]") ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        scale.set(1);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouse.x, mouse.y, scale]);

  return (
    <>
      {/* Inner dot + context text */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden items-center justify-center rounded-full bg-emerald-DEFAULT mix-blend-difference md:flex"
        style={{
          width: cursorSize,
          height: cursorSize,
          x: smoothMouse.x,
          y: smoothMouse.y,
          translateX: "-50%",
          translateY: "-50%",
          scale: smoothScale,
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="whitespace-nowrap text-[3px] font-bold tracking-wider text-void uppercase"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden rounded-full border border-emerald-DEFAULT/30 mix-blend-difference md:block"
        style={{
          width: cursorOuterSize,
          height: cursorOuterSize,
          x: smoothMouse.x,
          y: smoothMouse.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
