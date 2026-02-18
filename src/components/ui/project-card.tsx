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
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-xl bg-void-200/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-void-200 hover:shadow-[0_10px_30px_-10px_rgba(0,255,148,0.15)]",
          className
        )}
        {...props}
      >
        {/* Left Accent Line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon transition-all duration-300 group-hover:w-1.5" />

        {/* Header: Folder Icon + Links */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-neon">
            <Folder className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-3 text-stark-dim">
            {featured && (
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            )}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neon" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="mb-2 text-xl font-bold text-stark transition-colors group-hover:text-neon">
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed text-stark-muted"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {description}
          </p>
        </div>

        {/* Footer: Tags */}
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-stark-dim">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </a>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
