"use client";

import React from "react";
import { Timeline } from "./ui/Timeline";
import { StaggeredGrid, BentoItem } from "./ui/StaggeredGrid";
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Award,
  Brain,
  Code2,
  Globe,
  Terminal,
  Cpu,
  Database,
  Layers,
  Zap,
  GitBranch,
  Monitor,
} from "lucide-react";
import {
  FaPython,
  FaJava,
  FaReact,
  FaGitAlt,
  FaLinux,
  FaDocker,
} from "react-icons/fa";
import {
  SiTensorflow,
  SiPytorch,
  SiTypescript,
  SiCplusplus,
  SiNextdotjs,
  SiTailwindcss,
  SiOpencv,
  SiRos,
} from "react-icons/si";

/* ── Timeline Content Blocks ── */

function TimelineCard({
  icon,
  iconColor = "text-neon",
  iconBg = "bg-neon/10",
  title,
  subtitle,
  description,
  tags,
  highlights,
}: {
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  highlights?: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-void-400/60 bg-void-100/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neon/20 hover:bg-void-200/60 md:p-8">
      {/* Corner glow on hover */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-neon/3 blur-3xl transition-all duration-500 group-hover:bg-neon/6" />

      {/* Header */}
      <div className="relative z-10 mb-5 flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${iconBg} ${iconColor} transition-all duration-300 group-hover:scale-110`}
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {icon}
        </div>
        <div>
          <h4 className="text-base font-semibold tracking-tight text-stark md:text-lg">
            {title}
          </h4>
          <p className="font-mono text-[10px] tracking-wider text-neon">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="relative z-10 mb-6 text-[13px] leading-relaxed text-stark-muted md:text-sm" style={{ fontFamily: 'var(--font-body)' }}>
        {description}
      </p>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div className="relative z-10 mb-6 space-y-2.5">
          {highlights.map((h) => (
            <div
              key={h}
              className="flex items-center gap-2.5 text-[13px] text-stark-muted"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neon/10 text-[8px] text-neon">
                &#10003;
              </span>
              {h}
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 font-mono text-[10px] tracking-wide ${
                idx === 0
                  ? "border border-neon/15 bg-neon/8 text-neon/80"
                  : "bg-void-300/50 text-stark-muted"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom gradient line on hover */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-neon/0 to-transparent transition-all duration-500 group-hover:via-neon/30" />
    </div>
  );
}

const TIMELINE_DATA = [
  {
    title: "2025",
    content: (
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-stark-muted md:text-base">
          Stepping into industry research, applying years of self-taught ML
          knowledge under world-class mentorship.
        </p>
        <TimelineCard
          icon={<Briefcase className="h-5 w-5" />}
          title="AI-ML Research Intern — BITS Pilani Hyderabad"
          subtitle="June — July 2025"
          description="Completed a 7-week intensive internship focused on developing and applying machine learning models for real-world problem-solving under faculty guidance."
          tags={["Python", "TensorFlow", "Computer Vision", "Deep Learning", "Research"]}
          highlights={[
            "Hands-on data preprocessing, model training, and performance evaluation",
            "Production-grade ML pipelines using Python-based frameworks",
          ]}
        />
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-stark-muted md:text-base">
          A defining year — founding two ventures, building real products, and
          sharing knowledge with thousands.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <TimelineCard
            icon={<Rocket className="h-5 w-5" />}
            title="Sagittarius Technologies"
            subtitle="Co-founder · GitHub Organization"
            description="Co-founded a technology organization focused on building advanced software solutions combining AI, biotechnology, and environmental science."
            tags={["Leadership", "Open Source", "Biotech", "AI"]}
            highlights={[
              "Built de-extinction research platform",
              "Managing team of developers across projects",
            ]}
          />
          <TimelineCard
            icon={<Award className="h-5 w-5" />}
            iconColor="text-red-400"
            iconBg="bg-red-500/10"
            title="Sam SciTech — YouTube"
            subtitle="Creator · Science Education in Tamil"
            description="Making Computer Science, Machine Learning, and the Sciences accessible to every student in Tamil Nadu — in their native language."
            tags={["Content Creation", "Education", "Tamil", "YouTube"]}
            highlights={[
              "CS & ML tutorials in Tamil",
              "Growing student community",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-stark-muted md:text-base">
          The foundation year — building core engineering skills, shipping first
          real projects, and discovering the power of open source.
        </p>
        <TimelineCard
          icon={<GraduationCap className="h-5 w-5" />}
          title="B.E. Computer Science & Engineering"
          subtitle="Pre-final Year"
          description="Strong foundation in data structures, algorithms, systems design, and machine learning. Active contributor to open-source with 153+ GitHub contributions."
          tags={["DSA", "Systems Design", "ML", "Open Source"]}
          highlights={[
            "TARS — Local LLM assistant built from scratch",
            "Retail Price Optimization using ML pipelines",
            "TechAzura 2K26 — National level tech fest organizer",
            "Multiple open-source tools & utility libraries",
          ]}
        />
      </div>
    ),
  },
];

/* ── Icon Grid Data ── */
const GRID_ICONS = [
  { icon: <FaPython className="h-7 w-7" />, label: "Python" },
  { icon: <SiCplusplus className="h-7 w-7" />, label: "C++" },
  { icon: <FaJava className="h-7 w-7" />, label: "Java" },
  { icon: <SiTypescript className="h-7 w-7" />, label: "TypeScript" },
  { icon: <SiTensorflow className="h-7 w-7" />, label: "TensorFlow" },
  { icon: <SiPytorch className="h-7 w-7" />, label: "PyTorch" },
  { icon: <SiOpencv className="h-7 w-7" />, label: "OpenCV" },
  { icon: <FaReact className="h-7 w-7" />, label: "React" },
  { icon: <SiNextdotjs className="h-7 w-7" />, label: "Next.js" },
  { icon: <SiTailwindcss className="h-7 w-7" />, label: "Tailwind" },
  { icon: <FaGitAlt className="h-7 w-7" />, label: "Git" },
  { icon: <FaLinux className="h-7 w-7" />, label: "Linux" },
  { icon: <FaDocker className="h-7 w-7" />, label: "Docker" },
  { icon: <SiRos className="h-7 w-7" />, label: "ROS2" },
];

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 1,
    title: "Deep Learning",
    subtitle: "TensorFlow · PyTorch · Computer Vision",
    description: "Building production ML pipelines and neural networks.",
    icon: <Brain className="h-4 w-4" />,
    color: "rgba(0,255,136,0.2)",
  },
  {
    id: 2,
    title: "Full-Stack",
    subtitle: "Next.js · React · TypeScript",
    description: "End-to-end web applications with modern frameworks.",
    icon: <Code2 className="h-4 w-4" />,
    color: "rgba(59,130,246,0.2)",
  },
  {
    id: 3,
    title: "Systems & AI",
    subtitle: "RAG · LLM · Bioinformatics",
    description: "Intelligent systems at the edge of research.",
    icon: <Cpu className="h-4 w-4" />,
    color: "rgba(251,191,36,0.2)",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative bg-void">
      {/* Section header */}
      <div className="px-6 pt-24 sm:px-12 md:pt-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-neon/50" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-neon uppercase">
              Experience
            </span>
          </div>
          <h2 className="mb-5 text-display font-bold tracking-tight text-stark">
            My Journey
          </h2>
          <p className="max-w-lg text-[15px] leading-relaxed text-stark-muted" style={{ fontFamily: 'var(--font-body)' }}>
            From university lectures to building real-world AI systems — a
            timeline of growth, creation, and impact.
          </p>
        </div>
      </div>

      {/* Timeline — full width */}
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <Timeline data={TIMELINE_DATA} />
      </div>

      {/* Staggered Tech Grid — "What I Build With" */}
      <div className="relative overflow-hidden">
        <StaggeredGrid
          gridIcons={GRID_ICONS}
          bentoItems={BENTO_ITEMS}
          centerText="TOOLS"
        />
      </div>
    </section>
  );
}
