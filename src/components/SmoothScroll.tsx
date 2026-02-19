"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    /**
     * WHY: Lenis eases scroll position between frames. GSAP ScrollTrigger
     * reads scroll position on its own tick, which can be BEFORE Lenis
     * has applied its eased value — causing animations to lag behind
     * the visual scroll position. Syncing via the Lenis scroll event
     * forces ScrollTrigger to recompute after Lenis has settled.
     */
    lenis.on("scroll", ScrollTrigger.update);

    /**
     * WHY: Replace the custom rAF loop with GSAP's ticker so both
     * Lenis easing AND GSAP animations share the same frame budget
     * and never compete for independent animation frames. Without
     * this, a Lenis rAF and a GSAP rAF can fire in the wrong order,
     * causing one frame of visual jitter per scroll event (especially
     * noticeable in the VenturesPreview horizontal scroll scene).
     *
     * `lagSmoothing(0)` disables GSAP's built-in lag compensation
     * so Lenis's easing curve drives timing cleanly.
     */
    const tickFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickFn);
    };
  }, []);

  return <>{children}</>;
}
