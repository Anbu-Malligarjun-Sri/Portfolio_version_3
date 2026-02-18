"use client";

import * as React from "react";
import { ArrowUpRight, Folder, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  imgSrc?: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  tags?: string[];
  featured?: boolean;
}

const ProjectCard = React.forwardRef<HTMLAnchorElement, ProjectCardProps>(
  (
    {
      className,
      imgSrc,
      title,
      description,
      link,
      linkText = "View Project",
      tags = [],
      featured = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref as any}
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-void-50/30 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-neon/20 hover:bg-void-50/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),0_0_30px_rgba(0,255,148,0.05)]",
          className
        )}
      >
        {/* Visual Header / Glow */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-neon/5 blur-[60px] transition-all duration-700 group-hover:bg-neon/15 group-hover:blur-[80px]" />

        {/* Header: Folder Icon + Links */}
        <div className="mb-6 flex items-center justify-between relative z-10">
          <div className="text-neon/80 group-hover:text-neon transition-colors duration-300">
            <Folder className="h-10 w-10" strokeWidth={1.2} />
          </div>
          <div className="flex items-center gap-3">
            {featured && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neon/10 border border-neon/20 shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_8px_rgba(0,255,148,0.8)]" />
              </div>
            )}
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stark-dim transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neon"
            >
              <ArrowUpRight className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="mb-4 font-serif-display text-2xl font-bold tracking-tight text-stark group-hover:text-neon transition-colors duration-300">
            {title}
          </h3>
          <p
            className="text-[14px] leading-relaxed text-stark-muted transition-colors duration-300 group-hover:text-stark/80"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {description}
          </p>
        </div>

        {/* Footer: Tags */}
        <div className="mt-8 flex flex-wrap gap-2 relative z-10 pt-6 border-t border-white/5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/5 bg-white/5 px-3 py-1 font-mono text-[9px] font-medium tracking-wider uppercase text-stark-dim transition-colors group-hover:border-neon/20 group-hover:text-neon/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
