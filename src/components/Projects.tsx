'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, Code2, Sparkles } from 'lucide-react';

// Import raw data and safely parse it regardless of structure (Array vs Object)
import _projectsData from '../data/projects.json';
const projects: any[] = Array.isArray(_projectsData) 
  ? _projectsData 
  : (_projectsData as any).projects || Object.values(_projectsData);

// Array of images from your public folder to use as vibrant placeholders
const projectImages = [
  '/projects/tars-terminal.png',
  '/projects/habit-tracker.png',
  '/Images/Bits pilani.jpg',
  '/Images/IISC bangaluru.jpg',
  '/Philosophy/wallpaperflare.com_wallpaper (13).jpg',
  '/Philosophy/1769969164918.jpeg',
  '/Images/PSG.jpg'
];

// Vibrant gradient palettes for each card's hover state
const hoverGradients = [
  'from-violet-500 via-fuchsia-500 to-pink-500',
  'from-cyan-400 via-blue-500 to-indigo-600',
  'from-emerald-400 via-teal-500 to-cyan-500',
  'from-amber-400 via-orange-500 to-rose-500',
  'from-pink-400 via-rose-500 to-red-500',
  'from-indigo-400 via-purple-500 to-fuchsia-500',
];

/**
 * 3D Interactive Project Card
 * Uses Framer Motion for a stunning tilt effect, glowing borders, and parallax image zoom.
 */
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Framer motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth return
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Transform mapped to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const imageSrc = projectImages[index % projectImages.length];
  const activeGradient = hoverGradients[index % hoverGradients.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-full group perspective-[1000px]"
    >
      {/* Animated Glowing Border Background */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${activeGradient} rounded-[2rem] opacity-0 group-hover:opacity-100 blur-md transition-all duration-700 ease-out group-hover:duration-300`} />
      
      {/* Main Card Container */}
      <div className="relative flex flex-col h-full rounded-[2rem] overflow-hidden bg-[#0a0a0f]/90 border border-white/10 backdrop-blur-xl transition-all duration-500 z-10">
        
        {/* Image Section */}
        <div className="relative h-60 w-full overflow-hidden" style={{ transform: "translateZ(40px)" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-transparent to-transparent z-10" />
          <Image 
            src={imageSrc} 
            alt={project.title || "Project Image"} 
            fill 
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle Color Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${activeGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay`} />
        </div>

        {/* Content Section (Centered Alignment) */}
        <div className="relative flex flex-col items-center text-center p-8 pt-4 flex-grow z-20" style={{ transform: "translateZ(50px)" }}>
          
          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 transition-all duration-500 group-hover:from-white group-hover:to-white/90">
            {project.title || 'Untitled Project'}
          </h3>
          
          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
            {project.description || 'An innovative digital experience built with modern web technologies, showcasing advanced development capabilities.'}
          </p>

          {/* Tech Stack Pills (Centered Flex Wrap) */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8 mt-auto">
            {(project.technologies || ['React', 'Next.js', 'Tailwind', 'Framer Motion']).map((tech: string, i: number) => (
              <span 
                key={i} 
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex justify-center items-center gap-4 w-full" style={{ transform: "translateZ(60px)" }}>
            {(project.githubLink || project.repo) && (
              <a 
                href={project.githubLink || project.repo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 text-white font-medium text-sm group/btn hover:border-white/30"
              >
                <Github size={16} className="transition-transform group-hover/btn:scale-110" />
                <span>Source</span>
              </a>
            )}
            
            {(project.liveLink || project.link) && (
              <a 
                href={project.liveLink || project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${activeGradient} text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:brightness-110 group/btn`}
              >
                <ExternalLink size={16} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

/**
 * Main Projects Component
 */
export default function Projects() {
  return (
    <section id="projects" className="relative py-32 min-h-screen overflow-hidden bg-[#030305]">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header Section (Centered) */}
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Code2 size={16} className="text-purple-400" />
            <span className="text-sm font-medium text-purple-200 uppercase tracking-wider">Featured Work</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 flex flex-wrap justify-center gap-3"
          >
            <span className="text-white">Selected</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 flex items-center gap-2">
              Projects <Sparkles className="text-rose-400" size={40} />
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl"
          >
            A collection of innovative applications, beautiful interfaces, and robust systems crafted with passion and precision.
          </motion.p>
        </div>

        {/* Dynamic Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-[2000px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15, // Staggered entrance
                ease: "easeOut" 
              }}
              className="h-full"
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}