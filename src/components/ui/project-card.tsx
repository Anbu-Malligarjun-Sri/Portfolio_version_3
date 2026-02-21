"use client";

import * as React from "react";
import { ArrowUpRight, Crosshair } from "lucide-react";
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
          "group relative flex flex-col justify-between overflow-hidden border-2 border-[#121212] bg-[#EBE8DF] p-6 lg:p-8 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#121212]",
          className
        )}
        {...props}
      >
        {/* Print Texture Overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }} 
        />

        {/* Header: Editorial Section / Featured Tag */}
        <div className="mb-8 flex items-end justify-between border-b-4 border-[#121212] pb-4 relative z-10">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">
              {featured ? "Ref: Premium Edition" : "Ref: Standard Index"}
            </span>
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#121212]">
              {featured ? "★ Cover Feature" : "Archived Project"}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {featured && (
              <Crosshair className="h-6 w-6 text-[#121212] opacity-50 animate-pulse" />
            )}
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 border-2 border-[#121212] rounded-full transition-all duration-300 group-hover:bg-[#121212] group-hover:text-[#EBE8DF]"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex-1">
          <h3 className="mb-6 font-forbes text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.95] text-[#121212]">
            {title}
          </h3>
          <p
            className="text-base leading-relaxed text-gray-800 text-justify font-body"
          >
            {/* We apply a mini drop-cap effect to the first letter to match the magazine vibe */}
            <span className="float-left font-forbes text-4xl leading-[0.8] pt-1 pr-2 font-black text-[#121212]">
              {description.charAt(0)}
            </span>
            {description.slice(1)}
          </p>
        </div>

        {/* Footer: Tags & Blueprint Specs */}
        <div className="mt-10 flex flex-col gap-4 relative z-10 border-t-2 border-[#121212] pt-4">
          <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
            Tech Specifications
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider border border-[#121212] bg-white px-2 py-1 text-[#121212] transition-colors group-hover:bg-[#121212] group-hover:text-[#EBE8DF]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };