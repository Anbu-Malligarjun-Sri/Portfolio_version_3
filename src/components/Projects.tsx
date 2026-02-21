'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// ── GOOGLE FONTS ──
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

// ── DATA ──
const projects = [
  {
    title: "Project Alpha",
    tagline: "The Digital Frontier",
    description: "An innovative digital experience built with modern web technologies, showcasing advanced development capabilities, fluid animations, and a highly responsive architecture that pushes the boundaries of what browsers can render.",
    technologies: ["React", "Next.js", "Tailwind", "WebGL"],
    githubLink: "#",
    liveLink: "#",
    frame: "01",
    year: "2024",
    accent: "#c8a96e",
    accentDim: "rgba(200,169,110,0.15)",
  },
  {
    title: "Data Pipeline Beta",
    tagline: "Silicon Minds",
    description: "High-performance data pipeline for processing massive biological datasets, executing complex neural network queries, and visualizing genomic structures in real-time. The future of data is here.",
    technologies: ["Python", "Machine Learning", "AWS", "Manim"],
    githubLink: "#",
    liveLink: "#",
    frame: "02",
    year: "2024",
    accent: "#7eb8c8",
    accentDim: "rgba(126,184,200,0.15)",
  },
  {
    title: "Neuro-Habit Gamma",
    tagline: "Rewiring the Mind",
    description: "A beautiful, minimalist daily habit tracker with gamified progression systems, intelligent analytics, and interactive charts that adapt to user behavior patterns. Behavior design meets software craftsmanship.",
    technologies: ["TypeScript", "Framer Motion", "CSS", "Node.js"],
    githubLink: "#",
    liveLink: null,
    frame: "03",
    year: "2023",
    accent: "#b8c87e",
    accentDim: "rgba(184,200,126,0.15)",
  },
  {
    title: "System Delta",
    tagline: "Cloud Empire",
    description: "A decentralized computing interface designed to optimize distributed workloads across cloud architectures. Features a completely custom glassmorphic UI built from scratch — a monument to engineering ambition.",
    technologies: ["Vue", "Rust", "Docker", "PostgreSQL"],
    githubLink: "#",
    liveLink: "#",
    frame: "04",
    year: "2023",
    accent: "#c87ea0",
    accentDim: "rgba(200,126,160,0.15)",
  },
];

const IMAGE_PATH = "/projects/habit-tracker.png";

// ── FILM GRAIN OVERLAY ──
const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; data[i+1] = v; data[i+2] = v;
        data[i+3] = Math.random() * 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 10, mixBlendMode: 'overlay',
    }} />
  );
};

// ── FILM STRIP SPROCKET ──
const SprocketHoles = ({ count = 12, color = 'rgba(255,255,255,0.12)' }: { count?: number; color?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0', justifyContent: 'space-evenly', height: '100%', padding: '24px 0', alignItems: 'center' }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        width: '14px', height: '10px',
        border: `1.5px solid ${color}`,
        borderRadius: '2px',
        flexShrink: 0,
      }} />
    ))}
  </div>
);

// ── LIGHT BEAM ──
const LightBeam = ({ isTransitioning }: { isTransitioning: boolean }) => (
  <motion.div
    animate={{ opacity: isTransitioning ? [0, 0.4, 0] : 0 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    style={{
      position: 'absolute', top: 0, left: '50%',
      width: '120px', height: '100%',
      background: 'linear-gradient(to bottom, rgba(255,240,200,0.6), rgba(255,240,200,0) 40%)',
      transform: 'translateX(-50%)',
      pointerEvents: 'none', zIndex: 20,
    }}
  />
);

// ── COUNTER ──
const FrameCounter = ({ current, total, accent }: { current: number; total: number; accent: string }) => (
  <div style={{
    fontFamily: "'Space Mono', monospace",
    fontSize: '11px', letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.4)',
    display: 'flex', alignItems: 'center', gap: '8px',
  }}>
    <span style={{ color: accent, fontSize: '14px', fontWeight: 700 }}>
      {String(current + 1).padStart(2, '0')}
    </span>
    <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
    <span>{String(total).padStart(2, '0')}</span>
  </div>
);

// ── SLIDE ──
const ProjectSlide = ({
  project,
  direction,
}: {
  project: typeof projects[0];
  direction: number;
}) => {
  const variants = {
    enter: { x: direction > 0 ? 80 : -80, opacity: 0, scale: 0.96, filter: 'brightness(0.4) blur(6px)' },
    center: { x: 0, opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' },
    exit: { x: direction > 0 ? -80 : 80, opacity: 0, scale: 0.96, filter: 'brightness(0.4) blur(6px)' },
  };

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: '48px 1fr 48px',
        background: '#0d0d0d',
      }}
    >
      {/* Left film strip */}
      <div style={{
        background: '#111',
        borderRight: '2px solid #1a1a1a',
        display: 'flex', alignItems: 'stretch',
      }}>
        <SprocketHoles color="rgba(255,255,255,0.1)" />
      </div>

      {/* Main content area */}
      <div style={{
        display: 'grid',
        gridTemplateRows: '1fr auto',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Top content split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          overflow: 'hidden',
        }}>
          {/* Image panel */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRight: '1px solid #222',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(135deg, #111 0%, #1a1a1a 100%)`,
            }} />
            <img
              src={IMAGE_PATH}
              alt={project.title}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(30%) contrast(1.1) brightness(0.75)',
                mixBlendMode: 'luminosity',
              }}
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = 'none';
              }}
            />
            {/* Color tint overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to bottom right, ${project.accentDim}, transparent 60%)`,
              mixBlendMode: 'color',
            }} />
            {/* Vignette */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
            }} />
            {/* Frame number badge */}
            <div style={{
              position: 'absolute', top: '16px', left: '16px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.3em',
              color: project.accent, opacity: 0.9,
              background: 'rgba(0,0,0,0.6)',
              padding: '4px 8px', border: `1px solid ${project.accent}40`,
            }}>
              FRAME {project.frame}
            </div>
            {/* Year tag */}
            <div style={{
              position: 'absolute', bottom: '16px', right: '16px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '32px', fontWeight: 700,
              color: 'rgba(255,255,255,0.06)',
              letterSpacing: '-0.04em', lineHeight: 1,
              userSelect: 'none',
            }}>
              {project.year}
            </div>
          </div>

          {/* Text panel */}
          <div style={{
            padding: 'clamp(24px, 4vw, 48px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Background accent glow */}
            <div style={{
              position: 'absolute', top: '-20%', right: '-10%',
              width: '300px', height: '300px',
              background: `radial-gradient(circle, ${project.accentDim} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Tagline */}
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(9px, 0.9vw, 11px)', letterSpacing: '0.35em',
              color: project.accent, textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{ width: '24px', height: '1px', background: project.accent }} />
              {project.tagline}
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(24px, 3.5vw, 52px)',
              fontWeight: 400, lineHeight: 1.0,
              letterSpacing: '-0.02em', color: '#f0ece4',
              margin: '0 0 24px 0',
              position: 'relative', zIndex: 1,
            }}>
              {project.title}
            </h2>

            {/* Divider */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ width: '4px', height: '4px', background: project.accent, transform: 'rotate(45deg)' }} />
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(13px, 1.3vw, 17px)', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.55)', fontStyle: 'italic',
              margin: '0 0 28px 0', fontWeight: 300,
            }}>
              {project.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
              {project.technologies.map((tech, i) => (
                <span key={i} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px', letterSpacing: '0.15em',
                  color: project.accent,
                  border: `1px solid ${project.accent}50`,
                  padding: '4px 10px',
                  background: `${project.accent}08`,
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {project.githubLink && (
                <a href={project.githubLink} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '10px',
                  letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none', display: 'flex', alignItems: 'center',
                  gap: '6px', padding: '8px 16px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all 0.2s',
                  background: 'rgba(255,255,255,0.04)',
                }}>
                  <Github size={12} />
                  SOURCE
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '10px',
                  letterSpacing: '0.15em', color: '#0d0d0d',
                  textDecoration: 'none', display: 'flex', alignItems: 'center',
                  gap: '6px', padding: '8px 16px',
                  background: project.accent,
                  transition: 'all 0.2s',
                }}>
                  <ExternalLink size={12} />
                  LIVE
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #1e1e1e',
          padding: '10px clamp(16px, 3vw, 32px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#0a0a0a',
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: '9px',
            letterSpacing: '0.25em', color: 'rgba(255,255,255,0.2)',
          }}>
            PORTFOLIO · {project.year}
          </div>
          <div style={{
            display: 'flex', gap: '4px', alignItems: 'center',
          }}>
            {projects.map((p, i) => (
              <div key={i} style={{
                width: i === projects.indexOf(project) ? '20px' : '4px',
                height: '2px',
                background: i === projects.indexOf(project) ? project.accent : 'rgba(255,255,255,0.15)',
                transition: 'all 0.4s ease',
                borderRadius: '1px',
              }} />
            ))}
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: '9px',
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)',
          }}>
            {project.technologies.length} TECHNOLOGIES
          </div>
        </div>
      </div>

      {/* Right film strip */}
      <div style={{
        background: '#111',
        borderLeft: '2px solid #1a1a1a',
        display: 'flex', alignItems: 'stretch',
      }}>
        <SprocketHoles color="rgba(255,255,255,0.1)" />
      </div>
    </motion.div>
  );
};

// ── NAV ARROWS ──
const NavArrow = ({
  direction,
  onClick,
  disabled,
  accent,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
  accent: string;
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={!disabled ? { scale: 1.1 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    style={{
      position: 'fixed', top: '50%', transform: 'translateY(-50%)',
      [direction === 'left' ? 'left' : 'right']: '24px',
      zIndex: 200, background: 'none', border: 'none',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.15 : 0.7,
      color: '#fff', padding: '12px',
      transition: 'opacity 0.3s',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
  >
    {direction === 'left'
      ? <ChevronLeft size={28} strokeWidth={1.5} />
      : <ChevronRight size={28} strokeWidth={1.5} />
    }
  </motion.button>
);

// ══════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = 1 / projects.length;
    const newIndex = Math.min(Math.floor(latest / step), projects.length - 1);
    if (newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 1 : -1);
      setIsTransitioning(true);
      setActiveIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 550);
    }
  });

  const goTo = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= projects.length) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setIsTransitioning(true);
    setActiveIndex(newIndex);
    // Also scroll to match
    if (containerRef.current) {
      const step = 1 / projects.length;
      const targetScroll = containerRef.current.scrollHeight * (step * newIndex + step * 0.5);
      containerRef.current.scrollTop = targetScroll;
    }
    setTimeout(() => setIsTransitioning(false), 550);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIndex, goTo]);

  const currentProject = projects[activeIndex];

  return (
    <>
      <FontInjector />
      <section
        id="projects"
        ref={containerRef}
        style={{ position: 'relative', background: '#0a0a0a', height: `${projects.length * 100}vh` }}
      >
        <div style={{
          position: 'sticky', top: 0, left: 0,
          width: '100%', height: '100vh',
          overflow: 'hidden', background: '#0a0a0a',
        }}>
          {/* Film grain */}
          <FilmGrain />

          {/* Light beam on transition */}
          <LightBeam isTransitioning={isTransitioning} />

          {/* Top label */}
          <div style={{
            position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 50, display: 'flex', alignItems: 'center', gap: '32px',
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: '10px',
              letterSpacing: '0.4em', color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              ← Projects →
            </div>
          </div>

          {/* Frame counter top-right */}
          <div style={{
            position: 'absolute', top: '20px', right: '70px', zIndex: 50,
          }}>
            <FrameCounter current={activeIndex} total={projects.length} accent={currentProject.accent} />
          </div>

          {/* Scroll hint */}
          <AnimatePresence>
            {activeIndex === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
                style={{
                  position: 'absolute', bottom: '28px', left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: "'Space Mono', monospace", fontSize: '9px',
                  letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)',
                  zIndex: 50, whiteSpace: 'nowrap',
                }}
              >
                ↓ SCROLL OR USE ARROW KEYS
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main slide container */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Projector frame border */}
            <div style={{
              position: 'relative',
              width: 'min(95vw, 1200px)',
              height: 'min(80vh, 680px)',
              boxShadow: [
                '0 0 0 1px #1a1a1a',
                '0 0 0 2px #111',
                '0 0 0 12px #0d0d0d',
                '0 0 80px rgba(0,0,0,0.9)',
                `0 0 120px ${currentProject.accent}12`,
              ].join(', '),
              transition: 'box-shadow 0.8s ease',
            }}>
              {/* Slide content */}
              <AnimatePresence mode="wait" custom={direction}>
                <ProjectSlide
                  key={activeIndex}
                  project={currentProject}
                  direction={direction}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Nav arrows */}
          <NavArrow
            direction="left"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            accent={currentProject.accent}
          />
          <NavArrow
            direction="right"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            accent={currentProject.accent}
          />

          {/* Vertical slide nav dots (right side) */}
          <div style={{
            position: 'absolute', right: '22px', top: '50%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 100,
          }}>
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: '8px', height: i === activeIndex ? '28px' : '8px',
                  background: i === activeIndex ? currentProject.accent : 'rgba(255,255,255,0.18)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  borderRadius: '4px', transition: 'all 0.4s ease',
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}