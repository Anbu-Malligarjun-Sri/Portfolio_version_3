"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface BentoItem {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  color?: string;
}

export interface StaggeredGridProps {
  gridIcons: {
    icon: React.ReactNode;
    label: string;
  }[];
  bentoItems: BentoItem[];
  centerText?: string;
  className?: string;
}

export function StaggeredGrid({
  gridIcons,
  bentoItems,
  centerText = "JOURNEY",
  className,
}: StaggeredGridProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const gridFullRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [activeBento, setActiveBento] = useState<number>(0);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ willChange: "transform" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    const handleLoad = () => {
      document.body.classList.remove("loading");
      setIsLoaded(true);
    };
    imagesLoaded(
      document.querySelectorAll(".grid__item-img"),
      { background: true },
      handleLoad
    );
    // Fallback — if no images, trigger after a short delay
    const fallback = setTimeout(handleLoad, 500);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Animate Text Element
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".char");
      gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: "center center-=25%",
          scrub: 1,
        },
      }).from(chars, {
        ease: "sine.out",
        yPercent: 300,
        autoAlpha: 0,
        stagger: { each: 0.05, from: "center" },
      });
    }

    // Animate Full Grid
    if (gridFullRef.current) {
      const gridFullItems =
        gridFullRef.current.querySelectorAll(".grid__item");
      const numColumns = getComputedStyle(gridFullRef.current)
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
      const middleColumnIndex = Math.floor(numColumns / 2);

      const columns: Element[][] = Array.from(
        { length: numColumns },
        () => []
      );
      gridFullItems.forEach((item, index) => {
        columns[index % numColumns].push(item);
      });

      columns.forEach((columnItems, columnIndex) => {
        const delayFactor =
          Math.abs(columnIndex - middleColumnIndex) * 0.2;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: gridFullRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 1.5,
            },
          })
          .from(columnItems, {
            yPercent: 450,
            autoAlpha: 0,
            delay: delayFactor,
            ease: "sine.out",
          })
          .from(
            columnItems.map((item) =>
              item.querySelector(".grid__item-img")
            ),
            {
              transformOrigin: "50% 0%",
              ease: "sine.out",
            },
            0
          );
      });

      // Bento Container Animation
      const bentoContainer =
        gridFullRef.current.querySelector(".bento-container");
      if (bentoContainer) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: gridFullRef.current,
              start: "top top+=15%",
              end: "bottom center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            bentoContainer,
            {
              y: window.innerHeight * 0.1,
              scale: 1.5,
              zIndex: 1000,
              ease: "power2.out",
              duration: 1,
              force3D: true,
            },
            0
          );
      }
    }
  }, [isLoaded]);

  // Build grid items array: 35 icon cells, with bento group at position 16
  const totalCells = 35;
  const bentoPosition = 16;
  const gridItems: ("ICON" | "BENTO")[] = Array.from(
    { length: totalCells },
    (_, i) => (i === bentoPosition ? "BENTO" : "ICON")
  );

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ "--grid-item-translate": "0px" } as React.CSSProperties}
    >
      {/* Center text reveal */}
      <section className="relative mt-[10vh] grid w-full place-items-center">
        <div
          ref={textRef}
          className="flex content-center font-bold text-[clamp(3rem,14vw,10rem)] uppercase leading-[0.7] text-white"
        >
          {splitText(centerText)}
        </div>
      </section>

      {/* Staggered grid */}
      <section className="relative grid w-full place-items-center">
        <div
          ref={gridFullRef}
          className="grid--full relative my-[10vh] grid aspect-[1.1] h-auto w-full max-w-none grid-cols-7 grid-rows-5 gap-4 p-4"
        >
          {gridItems.map((type, i) => {
            if (type === "BENTO") {
              if (!bentoItems || bentoItems.length === 0) return null;
              return (
                <div
                  key="bento-group"
                  className="bento-container grid__item relative z-20 col-span-3 row-span-1 flex h-full w-full items-center justify-center gap-2 will-change-transform"
                >
                  {bentoItems.map((bentoItem, index) => {
                    const isActive = activeBento === index;
                    return (
                      <div
                        key={bentoItem.id}
                        className={cn(
                          "relative h-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                          isActive
                            ? "bg-void-200 shadow-2xl"
                            : "bg-void-100"
                        )}
                        style={{ width: isActive ? "60%" : "20%" }}
                        onMouseEnter={() => setActiveBento(index)}
                        onClick={() => setActiveBento(index)}
                      >
                        {/* Border overlay */}
                        <div
                          className={cn(
                            "pointer-events-none absolute inset-0 z-50 rounded-2xl border transition-colors duration-700",
                            isActive
                              ? "border-emerald-DEFAULT/30"
                              : "border-void-400"
                          )}
                        />

                        {/* Expanded content */}
                        <div className="relative z-10 flex h-full w-full flex-col p-0">
                          <div
                            className={cn(
                              "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                              isActive
                                ? "translate-y-0 opacity-100"
                                : "pointer-events-none translate-y-4 opacity-0"
                            )}
                          >
                            <div className="group/img absolute inset-0 z-0 overflow-hidden bg-void-100">
                              <div
                                className="absolute inset-0"
                                style={{
                                  background: `radial-gradient(circle at 30% 40%, ${bentoItem.color || "rgba(0,255,136,0.15)"}, transparent 70%)`,
                                }}
                              />
                              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-void via-void/50 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 z-20 flex h-20 w-full items-center justify-between px-5">
                              <div>
                                <h3 className="text-sm font-bold text-stark drop-shadow-md">
                                  {bentoItem.title}
                                </h3>
                                <p className="text-[10px] text-stark-muted">
                                  {bentoItem.subtitle}
                                </p>
                              </div>
                              <div className="text-emerald-DEFAULT">
                                {bentoItem.icon}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Collapsed icon */}
                        <div
                          className={cn(
                            "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                            isActive
                              ? "pointer-events-none scale-90 opacity-0"
                              : "scale-100 opacity-100"
                          )}
                        >
                          <div className="text-stark-dim">
                            {bentoItem.icon}
                          </div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-stark-dim">
                            {bentoItem.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Skip cells adjacent to bento (it spans 3 cols)
            if (i === bentoPosition + 1 || i === bentoPosition + 2)
              return null;

            // Regular icon cell
            const iconIndex = i % gridIcons.length;
            const iconData = gridIcons[iconIndex];

            return (
              <figure
                key={`cell-${i}`}
                className="grid__item group relative z-10 m-0 cursor-pointer will-change-[transform,opacity] [perspective:800px]"
              >
                <div className="grid__item-img flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-void-400 bg-void-100 shadow-sm transition-all duration-500 ease-out [backface-visibility:hidden] will-change-transform group-hover:scale-105 group-hover:shadow-xl">
                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-void/40 via-void/80 to-void opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                    <div className="text-stark-dim transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-DEFAULT">
                      {iconData.icon}
                    </div>
                    <div className="translate-y-2 transform text-center opacity-0 transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="mb-0.5 block text-[10px] font-medium uppercase tracking-wider text-stark-muted">
                        Built with
                      </span>
                      <span className="block text-sm font-bold tracking-tight text-stark">
                        {iconData.label}
                      </span>
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default StaggeredGrid;
