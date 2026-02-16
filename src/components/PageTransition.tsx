"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Transition curtain */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={pathname}
            className="pointer-events-none fixed inset-0 z-[9990] flex items-center justify-center"
          >
            {/* Top slab */}
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-void-100"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-DEFAULT to-transparent" />
            </motion.div>

            {/* Bottom slab */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-void-100"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-DEFAULT to-transparent" />
            </motion.div>

            {/* Center monogram */}
            <motion.span
              className="relative z-10 font-sans font-bold text-4xl text-gradient"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              AM
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
