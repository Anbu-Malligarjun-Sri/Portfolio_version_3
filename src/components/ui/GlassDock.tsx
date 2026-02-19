'use client';

import React, { useState, useRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DockItem {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  href?: string;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  dockClassName?: string;
  activeItem?: string;
}

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  (
      {
          items,
          className,
          dockClassName,
          activeItem,
          ...props
      },
      ref
  ) => {
      const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
      const [direction, setDirection] = useState(0);

      /**
       * WHY: Instead of calculating tooltip position with fixed math
       * (`index * 56 + 28`), which breaks when padding, gap, or item
       * count changes, we read the ACTUAL center of each item from the
       * DOM. `offsetLeft + offsetWidth / 2` gives the pixel-perfect
       * horizontal center of any item regardless of viewport or layout.
       */
      const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
      const [tooltipX, setTooltipX] = useState(0);

      const handleMouseEnter = (index: number) => {
          if (hoveredIndex !== null && index !== hoveredIndex) {
              setDirection(index > hoveredIndex ? 1 : -1);
          }
          setHoveredIndex(index);

          const item = itemRefs.current[index];
          if (item) {
              setTooltipX(item.offsetLeft + item.offsetWidth / 2);
          }
      };

      return (
          <div
              ref={ref}
              className={cn('w-max', className)}
              {...props}
          >
              <div
                  className={cn(
                      "relative flex gap-4 items-center px-6 py-4 rounded-2xl",
                      "glass-border bg-void/80",
                      "backdrop-blur-xl shadow-2xl border border-white/10",
                      dockClassName
                  )}
                  onMouseLeave={() => {
                      setHoveredIndex(null);
                      setDirection(0);
                  }}
              >
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: -65,
                /**
                 * `tooltipX` is the absolute left-center of the hovered
                 * item (set via itemRefs on hover). The inner tooltip div
                 * uses `-translate-x-1/2` so it auto-centers over the item.
                 * Removing the conflicting outer `style.transform` that
                 * was fighting Framer Motion's own transform management.
                 */
                x: tooltipX,
              }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="absolute top-0 left-0 pointer-events-none z-30"
            >
              <div
                className={cn(
                  '-translate-x-1/2 px-4 py-1.5 rounded-lg',
                  'bg-neon text-void font-mono text-[10px] font-bold tracking-[0.2em] uppercase',
                  'shadow-[0_10px_30px_rgba(0,255,148,0.3)] flex items-center justify-center',
                  'min-w-25'
                )}
              >
                <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.span
                      key={items[hoveredIndex].title}
                      custom={direction}
                      initial={{
                        x: direction > 0 ? 35 : -35,
                        opacity: 0,
                        filter: 'blur(6px)',
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        x: direction > 0 ? -35 : 35,
                        opacity: 0,
                        filter: 'blur(6px)',
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      className="whitespace-nowrap"
                    >
                      {items[hoveredIndex].title}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-neon" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {items.map((el, index) => {
          const Icon = el.icon;
          const isHovered = hoveredIndex === index;
          const isActive = activeItem === el.href?.replace('#', '') || activeItem === el.title.toLowerCase();
          
          const handleClick = () => {
            if (el.onClick) {
              el.onClick();
            } else if (el.href) {
              const target = document.querySelector(el.href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = el.href;
              }
            }
          };

          return (
            <div
              key={el.title}
              ref={(el) => { itemRefs.current[index] = el; }}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={handleClick}
              className={cn(
                "relative w-10 h-10 flex items-center justify-center cursor-pointer rounded-xl transition-all duration-300",
                isActive ? "bg-neon/20 text-neon shadow-[0_0_15px_rgba(0,255,148,0.2)]" : "text-stark-dim hover:text-stark hover:bg-white/5"
              )}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick();
                }
              }}
              data-cursor-hover
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  y: isHovered ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    'transition-colors duration-300',
                    isActive && "animate-pulse"
                  )}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
);

GlassDock.displayName = 'GlassDock';

export default GlassDock;
