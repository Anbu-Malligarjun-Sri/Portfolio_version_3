"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Home, Briefcase, FolderOpen, User, Mail, Rocket, Menu, X } from "lucide-react";
import { GlassDock } from "./ui/GlassDock";

const NAV_LINKS = [
  { label: "Home", href: "#home", sectionId: "home", icon: Home },
  { label: "About", href: "#about", sectionId: "about", icon: User },
  { label: "Ventures", href: "#sagittarius", sectionId: "sagittarius", icon: Rocket },
  { label: "Projects", href: "#projects", sectionId: "projects", icon: FolderOpen },
  { label: "Experience", href: "#experience", sectionId: "experience", icon: Briefcase },
  { label: "Contact", href: "#contact", sectionId: "contact", icon: Mail },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.sectionId);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  /**
   * BUG FIX: was `const lastScrollY = { current: 0 }` — a plain
   * object literal recreated on EVERY render, so the previous
   * scroll position was always 0, making direction detection wrong.
   * A `useRef` persists its `.current` value across renders.
   */
  const lastScrollY = useRef(0);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on Escape key (accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Scroll direction-based auto-hide
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (direction === "down" && latest > 500) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollY.current = latest;
  });

  const dockItems = NAV_LINKS.map((link) => ({
    title: link.label,
    icon: link.icon,
    href: link.href,
  }));

  return (
    <>
      {/* ── Desktop GlassDock Navbar ── */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <GlassDock items={dockItems} activeItem={activeSection} />
      </motion.div>

      {/* ── Mobile Hamburger ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: isVisible ? 0 : -80,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl glass md:hidden"
        data-cursor-hover
      >
        {isOpen ? (
          <X className="h-5 w-5 text-stark" />
        ) : (
          <Menu className="h-5 w-5 text-stark" />
        )}
      </motion.button>

      {/* ── Mobile Fullscreen Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-void/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((item, i) => {
                const isActive = activeSection === item.sectionId;
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    onClick={() => {
                      setIsOpen(false);
                      const el = document.querySelector(item.href);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="relative flex items-center gap-3"
                  >
                    <Icon
                      className={`h-6 w-6 ${isActive ? "text-neon" : "text-stark-muted"}`}
                    />
                    <span
                      className={`text-3xl font-light tracking-wide transition-colors ${
                        isActive ? "text-neon" : "text-stark-muted hover:text-stark"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="mobile-active"
                        className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-neon"
                      />
                    )}
                  </motion.button>
                );
              })}

              <motion.a
                href="mailto:anbumalligarjun1@gmail.com"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon/10 border border-neon/20 text-neon font-mono text-xs font-medium tracking-wider uppercase"
              >
                anbumalligarjun1@gmail.com
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
