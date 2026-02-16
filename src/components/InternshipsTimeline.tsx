"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { FiAward, FiCode, FiBriefcase, FiGlobe, FiBook } from 'react-icons/fi';

/* ────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────── */
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  category?: string;
  color?: string;
  link?: {
    url: string;
    text: string;
  };
}

/* ────────────────────────────────────────────────
   Single Timeline Event Card (hooks-safe)
   ──────────────────────────────────────────────── */
function TimelineEventCard({
  event,
  index,
  activeEvent,
  setActiveEvent,
  mousePosition,
  primaryColor,
  accentColor,
}: {
  event: TimelineEvent;
  index: number;
  activeEvent: string | null;
  setActiveEvent: (id: string | null) => void;
  mousePosition: { x: number; y: number };
  primaryColor: string;
  accentColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;
  const eventColor = primaryColor;

  return (
    <motion.div
      ref={cardRef}
      className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${
        isEven ? 'md:justify-start' : 'md:justify-end'
      }`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: isEven ? 50 : -50,
          y: 20,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.8,
            ease: 'easeOut',
          },
        },
      }}
    >
      {/* Timeline node */}
      <div
        className={`absolute left-1/2 md:left-auto ${
          isEven ? 'md:left-0' : 'md:right-0'
        } top-0 transform -translate-x-1/2 z-20`}
      >
        <motion.div
          className={`w-10 h-10 rounded-full ${eventColor} flex items-center justify-center border-4 border-void cursor-pointer shadow-[0_12px_32px_rgba(0,255,148,0.25)]`}
          whileHover={{ scale: 1.2 }}
          onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
          animate={{
            boxShadow:
              activeEvent === event.id
                ? [
                    `0 0 0 rgba(255,255,255,0.5)`,
                    `0 0 20px rgba(255,255,255,0.8)`,
                    `0 0 0 rgba(255,255,255,0.5)`,
                  ]
                : `0 0 0 rgba(255,255,255,0)`,
          }}
          transition={{
            repeat: activeEvent === event.id ? Infinity : 0,
            duration: 1.5,
          }}
        >
          {event.icon || (
            <span className="text-white font-bold">
              {index + 1}
            </span>
          )}
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        className={`relative z-10 bg-void-200/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl w-full md:w-[calc(100%-2rem)] ${
          isEven ? 'md:ml-12' : 'md:mr-12'
        } border border-white/10`}
        whileHover={{
          y: -5,
          x: isEven ? 5 : -5,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateY(${
            mousePosition.x * (isEven ? -3 : 3)
          }deg) rotateX(${mousePosition.y * -3}deg)`,
        }}
        onMouseEnter={() => setActiveEvent(event.id)}
        onMouseLeave={() => setActiveEvent(null)}
      >
        {event.image && (
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{
                scale: activeEvent === event.id ? 1.05 : 1,
                y: activeEvent === event.id ? -10 : 0,
              }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>

            {event.category && (
              <div className="absolute top-4 right-4">
                <span className={`${accentColor} px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-white`}>
                  {event.category}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-mono ${accentColor.replace('bg-', 'text-')} tracking-wider`}>
              {event.date}
            </span>

            <motion.div
              className={`w-3 h-3 rounded-full ${eventColor}`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: 'reverse',
              }}
            />
          </div>

          <h3 className="text-2xl font-bold mb-2 text-stark">{event.title}</h3>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeEvent === event.id ? 'auto' : 0,
              opacity: activeEvent === event.id ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-stark-muted mt-3 leading-relaxed">
              {event.description}
            </p>

            {event.link && (
              <a
                href={event.link.url}
                className={`inline-block mt-4 px-4 py-2 ${primaryColor} hover:bg-opacity-80 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-1 text-white`}
              >
                {event.link.text}
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${eventColor}`}
          initial={{ width: '0%' }}
          animate={{ width: activeEvent === event.id ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Timeline 3D Component
   ──────────────────────────────────────────────── */
function Timeline3D({
  events,
  primaryColor = 'bg-neon',
  secondaryColor = 'bg-white/10',
  accentColor = 'bg-neon',
}: {
  events: TimelineEvent[];
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}) {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className="w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-white bg-void"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative floating spheres */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full opacity-20 ${i % 2 === 0 ? primaryColor : secondaryColor}`}
              animate={{
                x: [`${20 + i * 10}%`, `${30 + i * 8}%`, `${15 + i * 12}%`, `${20 + i * 10}%`],
                y: [`${10 + i * 12}%`, `${20 + i * 10}%`, `${30 + i * 8}%`, `${10 + i * 12}%`],
                scale: [1, 1.2, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
              }}
              style={{
                width: `${50 + i * 20}px`,
                height: `${50 + i * 20}px`,
                filter: 'blur(8px)',
                zIndex: 0,
              }}
            />
          ))}
        </div>

        {/* Main timeline content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight text-stark">
            <span className="inline-block">
              <span className="relative inline-block">
                <span className={`absolute -inset-1 rounded-lg ${accentColor} blur opacity-30`}></span>
                <span className="relative">Internships & Workshops</span>
              </span>
            </span>
          </h2>

          <div className="relative">
            {/* Central line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/12 rounded-full"
            ></div>

            {/* Timeline events */}
            {events.map((event, index) => (
              <TimelineEventCard
                key={event.id}
                event={event}
                index={index}
                activeEvent={activeEvent}
                setActiveEvent={setActiveEvent}
                mousePosition={mousePosition}
                primaryColor={primaryColor}
                accentColor={accentColor}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Main Export: Internships Timeline Page Section
   ──────────────────────────────────────────────── */
export default function InternshipsTimeline() {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: 'January 2022',
      title: 'Project Genesis',
      description:
        'Initiated the groundbreaking project that would revolutionize how we interact with digital interfaces. The team assembled key talents from across the globe to create something truly unique.',
      icon: <FiCode className="text-white" />,
      image: '/Philosophy/1769969164918.jpeg',
      category: 'Development',
      link: {
        url: '#',
        text: 'View Project Details',
      },
    },
    {
      id: '2',
      date: 'March 2022',
      title: 'First Major Milestone',
      description:
        'Achieved our first significant breakthrough with the core algorithm. Performance benchmarks showed a 200% improvement over existing solutions in the market.',
      icon: <FiAward className="text-white" />,
      image: '/Philosophy/1769969171995.jpeg',
      category: 'Achievement',
      color: 'emerald',
    },
    {
      id: '3',
      date: 'June 2022',
      title: 'Global Partnership',
      description:
        'Formed strategic alliance with international partners to expand our reach and implement our solutions across five continents. This partnership opened doors to new markets and technological collaborations.',
      icon: <FiGlobe className="text-white" />,
      image: '/Philosophy/1769969177076.jpeg',
      category: 'Partnership',
      color: 'amber',
    },
    {
      id: '4',
      date: 'October 2022',
      title: 'Product Launch',
      description:
        'Successfully launched our flagship product to enthusiastic market reception. First-week downloads exceeded projections by 340%, signaling strong product-market fit.',
      icon: <FiBriefcase className="text-white" />,
      image: '/Philosophy/Gemini_Generated_Image_wif5znwif5znwif5.png',
      category: 'Product',
      color: 'rose',
      link: {
        url: '#',
        text: 'See Launch Statistics',
      },
    },
    {
      id: '5',
      date: 'February 2023',
      title: 'Research Publication',
      description:
        'Published groundbreaking research paper in collaboration with leading academic institutions, detailing our novel approach and methodologies that have since been adopted as industry standards.',
      icon: <FiBook className="text-white" />,
      image: '/Philosophy/wallpaperflare.com_wallpaper (13).jpg',
      category: 'Research',
      color: 'blue',
    },
  ];

  return (
    <section id="internships" className="relative bg-void">
      <Timeline3D
        events={timelineEvents}
        primaryColor="bg-neon"
        secondaryColor="bg-white/10"
        accentColor="bg-neon"
      />
    </section>
  );
}
