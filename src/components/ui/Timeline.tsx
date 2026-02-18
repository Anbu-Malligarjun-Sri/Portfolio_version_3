"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-16 md:gap-14 md:pt-40"
          >
            {/* Sticky year label */}
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-void/80 backdrop-blur-md border border-white/10 md:left-3 shadow-[0_0_20px_rgba(0,255,148,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:border-neon/50">
                <div className="h-3 w-3 rounded-full bg-neon shadow-[0_0_12px_rgba(0,255,148,0.6)] animate-pulse" />
              </div>
              <h3 className="hidden font-serif-display font-bold text-6xl tracking-tighter text-stark/10 md:block md:pl-24 transition-colors duration-500 group-hover:text-neon/20">
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative w-full pl-20 pr-4 md:pl-4 transition-all duration-500 group-hover:translate-x-2">
              <h3 className="mb-6 block font-serif-display font-bold text-4xl tracking-tight text-neon/40 md:hidden">
                {item.title}
              </h3>
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* Progress line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-void-400 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-emerald-DEFAULT via-emerald-600 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
