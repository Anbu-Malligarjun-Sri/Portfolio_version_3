"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { Home, PenTool, Youtube, Compass, X, Sparkles, Code2, Cpu } from "lucide-react";

/**
 * PORTFOLIO NAVIGATION: "Quantum Glass Hologram"
 * A highly interactive, physics-based orbital navigation system.
 */

const NAV_ITEMS = [
  { name: "Nexus", href: "/", icon: Home, color: "16, 185, 129", theme: "emerald" }, // rgb(16, 185, 129)
  { name: "Projects", href: "/projects", icon: Code2, color: "139, 92, 246", theme: "violet" }, // rgb(139, 92, 246)
  { name: "Systems", href: "/systems", icon: Cpu, color: "245, 158, 11", theme: "amber" }, // rgb(245, 158, 11)
  { name: "Media", href: "/media", icon: Youtube, color: "239, 68, 68", theme: "rose" }, // rgb(239, 68, 68)
];

// Reusable animated noise texture for the background
const NoiseOverlay = () => (
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const NavLens = ({
  item,
  index = 0,
  total = 0,
  isMain = false,
  isOpen = false,
  onClick,
}) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, high-fidelity springs for 3D rotation
  const rotateX = useSpring(useTransform(mouseY, [-50, 50], [25, -25]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-50, 50], [-25, 25]), { stiffness: 150, damping: 15 });
  
  // Parallax translation for the inner icon
  const x = useSpring(useTransform(mouseX, [-50, 50], [-8, 8]), { stiffness: 150, damping: 15 });
  const y = useSpring(useTransform(mouseY, [-50, 50], [-8, 8]), { stiffness: 150, damping: 15 });

  // Calculate orbital position
  const radius = 120;
  // Adjusted starting angle to fan out nicely (from top-left to top-right)
  const angle = isMain ? 0 : (index * (180 / (total - 1)) + 180) * (Math.PI / 180);
  const targetX = isMain ? 0 : Math.cos(angle) * radius;
  const targetY = isMain ? 0 : Math.sin(angle) * radius;

  // Interactive Lighting Template
  const lightPosition = useMotionTemplate`radial-gradient(circle at ${useTransform(mouseX, [-32, 32], [0, 100])}% ${useTransform(mouseY, [-32, 32], [0, 100])}%, rgba(255,255,255,0.8) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const resetPhysics = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = item.icon;

  const LensUI = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPhysics}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-pointer"
    >
      {/* Dynamic Ambient Glow */}
      <div 
        className="absolute -inset-6 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: `rgb(${item.color})` }}
      />

      {/* Main Glass Body */}
      <div className="relative w-16 h-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]">
        
        {/* Interactive Glint (Light tracking mouse) */}
        <motion.div 
          className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none"
          style={{ background: lightPosition }}
        />

        {/* Inner Colored Ring */}
        <div 
          className="absolute inset-[2px] rounded-full border border-white/5 opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:inset-[4px]"
          style={{ borderColor: `rgba(${item.color}, 0.5)` }}
        />

        {/* Floating Icon with Parallax */}
        <motion.div 
          style={{ x, y, translateZ: 20 }}
          className="relative z-20 text-white/60 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Sleek Slide-out Label (Only for satellites) */}
      {!isMain && (
        <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 pointer-events-none">
          <div className="overflow-hidden">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center"
            >
              {/* Connector line */}
              <div className="w-3 h-[1px] bg-white/20 mr-2" />
              {/* Label Pill */}
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-2xl">
                <span className="text-[10px] font-mono tracking-widest text-white/90 uppercase whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );

  if (isMain) {
    return (
      <div onClick={onClick} className="relative z-[1002]">
        {/* Continuous breathing animation for main button when closed */}
        <motion.div
          animate={!isOpen ? { scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 rgba(255,255,255,0)", "0 0 20px 2px rgba(255,255,255,0.1)", "0 0 0 0 rgba(255,255,255,0)"] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full"
        >
          {LensUI}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0.5, opacity: 0 }}
      animate={{ x: targetX, y: targetY, scale: 1, opacity: 1 }}
      exit={{ x: 0, y: 0, scale: 0.5, opacity: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.05 
      }}
      className="absolute top-0 left-0"
    >
      <a href={item.href} className="block outline-none" draggable={false}>
        {LensUI}
      </a>
    </motion.div>
  );
};

export default function PortfolioNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-16 right-16 z-[9999] flex items-center justify-center">
      
      {/* Orbital Resonance Rings (Background tracks) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -z-10 pointer-events-none flex items-center justify-center"
          >
            {/* Outer dotted track */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] rounded-full border border-white/10 border-dashed"
            />
            {/* Inner solid track */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] rounded-full border border-white/5"
            >
              {/* Track indicator dot */}
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Satellite Lenses */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0">
            {NAV_ITEMS.map((item, index) => (
              <NavLens 
                key={item.name} 
                item={item} 
                index={index} 
                total={NAV_ITEMS.length} 
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Primary Core Lens */}
      <NavLens 
        isMain 
        isOpen={isOpen}
        onClick={toggleMenu}
        item={{
          name: "Core",
          icon: isOpen ? X : Sparkles,
          color: isOpen ? "255, 255, 255" : "100, 150, 255", // White when open, cool blue when closed
        }} 
      />

      {/* Immersive Cinematic Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm -z-20"
            onClick={() => setIsOpen(false)}
          >
            <NoiseOverlay />
            
            {/* Dynamic Vignette / Radial Gradient Originating from the menu */}
            <div 
              className="absolute pointer-events-none w-[800px] h-[800px] rounded-full blur-[100px] opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0) 70%)',
                bottom: '-200px',
                right: '-200px',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}