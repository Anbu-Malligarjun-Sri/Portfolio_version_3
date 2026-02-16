"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SubPageNavProps {
  accentColor?: string;
}

export default function SubPageNav({ accentColor = "emerald" }: SubPageNavProps) {
  const colorMap: Record<string, string> = {
    emerald: "hover:text-emerald-DEFAULT hover:border-emerald-DEFAULT/30",
    red: "hover:text-red-500 hover:border-red-500/30",
    amber: "hover:text-amber-400 hover:border-amber-400/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link
        href="/"
        className={`group flex items-center gap-2 rounded-full border border-void-400 bg-void-50/80 px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${colorMap[accentColor] || colorMap.emerald}`}
        data-cursor-hover
      >
        <ArrowLeft className="h-4 w-4 text-stark-dim transition-transform group-hover:-translate-x-0.5" />
        <span className="font-mono text-xs tracking-wide text-stark-dim uppercase">
          Home
        </span>
      </Link>
    </motion.div>
  );
}
