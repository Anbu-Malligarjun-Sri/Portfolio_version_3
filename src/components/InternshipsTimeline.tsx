"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiBriefcase, FiCpu, FiBook } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

/* ────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────── */
interface WorkshopEvent {
  id: string;
  year: string;
  date: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  accentColor: string;
}

/* ────────────────────────────────────────────────
   Single Timeline Card (animated on scroll)
   ──────────────────────────────────────────────── */
function TimelineCard({
  event,
  index,
}: {
  event: WorkshopEvent;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.3, once: true });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`relative mb-12 md:mb-16 md:w-1/2 ${
        isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
      }`}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Timeline node */}
      <div
        className={`absolute top-0 hidden md:flex ${
          isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
        } z-20 h-10 w-10 items-center justify-center rounded-full border-4 border-void bg-void-200`}
        style={{ boxShadow: `0 0 20px ${event.accentColor}40` }}
      >
        <div className="text-neon">{event.icon}</div>
      </div>

      {/* Content card */}
      <div className="group relative overflow-hidden rounded-2xl border border-void-400/60 bg-void-100/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neon/20 hover:bg-void-200/60 md:p-8">
        {/* Corner glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-neon/3 blur-3xl transition-all duration-500 group-hover:bg-neon/6" />

        {/* Mobile icon */}
        <div className="mb-4 flex items-center gap-3 md:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon/10 text-neon">
            {event.icon}
          </div>
          <span className="font-mono text-[10px] tracking-wider text-neon uppercase">
            {event.year}
          </span>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-4">
          <span className="mb-2 hidden font-mono text-[10px] tracking-wider text-neon uppercase md:block">
            {event.date}
          </span>
          <h4 className="text-base font-semibold tracking-tight text-stark md:text-lg">
            {event.title}
          </h4>
          <p className="mt-1 font-mono text-[11px] tracking-wide text-stark-muted">
            {event.organization}
          </p>
        </div>

        {/* Description */}
        <p
          className="relative z-10 mb-5 text-[13px] leading-relaxed text-stark-muted md:text-sm"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {event.description}
        </p>

        {/* Highlights */}
        <div className={`relative z-10 space-y-2 ${isEven ? 'md:text-left' : ''}`}>
          {event.highlights.map((h) => (
            <div
              key={h}
              className="flex items-start gap-2.5 text-[13px] text-stark-muted"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neon/10 text-[8px] text-neon">
                &#10003;
              </span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-neon/0 to-transparent transition-all duration-500 group-hover:via-neon/30" />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Event Data (from resume)
   ──────────────────────────────────────────────── */
const EVENTS: WorkshopEvent[] = [
  {
    id: 'bits-pilani',
    year: '2025',
    date: 'June – July 2025',
    title: 'AI/ML Research Internship',
    organization: 'BITS Pilani, Hyderabad',
    description:
      'Completed a 7-week intensive internship focused on developing and applying machine learning models for real-world problem-solving.',
    highlights: [
      'Hands-on experience in data preprocessing, model training, and performance evaluation',
      'Python-based ML frameworks for production-grade pipelines',
    ],
    icon: <FiBriefcase className="h-4 w-4" />,
    accentColor: '#00ff94',
  },
  {
    id: 'iisc-workshop',
    year: '2024',
    date: '2024',
    title: 'AI & Machine Learning Workshop',
    organization: 'Indian Institute of Science (IISc), Bangalore',
    description:
      'Gained foundational insights into Artificial Intelligence and Machine Learning at one of India\'s premier research institutions.',
    highlights: [
      'Participated in hands-on sessions on model training and real-world applications',
      'Explored foundational AI concepts under expert guidance',
    ],
    icon: <FiCpu className="h-4 w-4" />,
    accentColor: '#3b82f6',
  },
  {
    id: 'psg-labview',
    year: '2024',
    date: '2024',
    title: 'LabVIEW with Arduino Workshop',
    organization: 'PSG College of Technology, Coimbatore',
    description:
      'Learned to integrate LabVIEW with Arduino for real-time system control and embedded automation.',
    highlights: [
      'Built simple embedded automation projects during guided sessions',
      'Integrated LabVIEW with Arduino for real-time system control',
    ],
    icon: <FiCode className="h-4 w-4" />,
    accentColor: '#f59e0b',
  },
  {
    id: 'micro-dots',
    year: '2023',
    date: 'May – August 2023',
    title: 'Diploma in Python Programming',
    organization: 'Micro Dots Computer Education, Erode',
    description:
      'Completed a diploma course covering Python fundamentals, control structures, functions, file handling, and basic projects.',
    highlights: [
      'Strengthened programming logic and practical coding skills',
      'Built foundational projects using core Python',
    ],
    icon: <FiBook className="h-4 w-4" />,
    accentColor: '#a855f7',
  },
];

/* ────────────────────────────────────────────────
   Main Export
   ──────────────────────────────────────────────── */
export default function InternshipsTimeline() {
  return (
    <section id="internships" className="relative bg-void px-6 py-24 sm:px-12 md:py-32 lg:px-24">
      {/* Subtle ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-neon/2 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/2 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Workshops & Internships"
          title="Learning by Doing"
          subtitle="Real-world experiences that sharpened my engineering edge — from research labs to hands-on workshops."
          align="center"
        />

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Central line */}
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-void-400/60 md:block" />

          {/* Mobile line */}
          <div className="absolute left-5 top-0 h-full w-px bg-void-400/40 md:hidden" />

          {EVENTS.map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
