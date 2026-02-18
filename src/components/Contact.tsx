"use client";

import { motion } from "framer-motion";
import SocialFlipButton from "./ui/social-flip-button";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 sm:px-12 lg:px-24 bg-void overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
      
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-neon mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-serif-display text-5xl md:text-7xl font-bold tracking-tighter text-stark mb-8">
            Let&apos;s build the <span className="text-gradient-display">future</span>.
          </h2>
          <p className="text-stark-muted text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
            Open for collaborations, interesting projects, or just a deep conversation about AI and biology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SocialFlipButton />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20"
        >
          <a 
            href="mailto:anbumalligarjun1@gmail.com" 
            className="text-stark-dim hover:text-neon font-mono text-xs tracking-widest uppercase transition-colors"
          >
            anbumalligarjun1@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
