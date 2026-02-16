"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items?: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}

const defaultItems: SocialItem[] = [
  { letter: "C", icon: <FaGithub size={18} />, label: "GitHub", href: "https://github.com/Anbu-Malligarjun-Sri" },
  { letter: "O", icon: <FaLinkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/" },
  { letter: "N", icon: <FaYoutube size={18} />, label: "YouTube", href: "https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg" },
  { letter: "N", icon: <SiLeetcode size={18} />, label: "LeetCode", href: "https://www.leetcode.com/Anbu_Malligarjun_Sri/" },
  { letter: "E", icon: <SiHackerrank size={18} />, label: "HackerRank", href: "https://www.hackerrank.com/profile/anbumalligarjun1" },
  { letter: "C", icon: <FaEnvelope size={18} />, label: "Email", href: "mailto:anbumalligarjun@gmail.com" },
  { letter: "T", icon: <FaGithub size={18} />, label: "Sam-SciTech", href: "https://github.com/Sam-SciTech" },
];

const SocialFlipNode = ({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}) => {
  const isLink = !!item.href;

  const sharedProps = {
    className: cn("relative h-11 w-11 cursor-pointer", itemClassName),
    style: { perspective: "1000px" } as React.CSSProperties,
    onMouseEnter: () => setTooltipIndex(index),
    onMouseLeave: () => setTooltipIndex(null),
  };

  const inner = (
    <>
      <AnimatePresence>
        {isHovered && tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-void-200 px-3 py-1.5 text-xs font-semibold text-stark shadow-xl border border-void-400"
          >
            {item.label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-void-200 border-b border-r border-void-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
          damping: 15,
          delay: index * 0.08,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Letter */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl bg-void-200 text-lg font-bold text-stark-muted shadow-sm border border-void-400",
            frontClassName
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>

        {/* Back - Icon */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-DEFAULT text-void",
            backClassName
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {item.icon}
        </div>
      </motion.div>
    </>
  );

  if (isLink) {
    return (
      <a
        href={item.href!}
        target="_blank"
        rel="noopener noreferrer"
        {...sharedProps}
      >
        {inner}
      </a>
    );
  }

  return (
    <div onClick={item.onClick} {...sharedProps}>
      {inner}
    </div>
  );
};

export default function SocialFlipButton({
  items = defaultItems,
  className,
  itemClassName,
  frontClassName,
  backClassName,
}: SocialFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div
        className="group relative flex items-center justify-center gap-2.5 rounded-2xl glass-border bg-void-100 p-4 shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTooltipIndex(null);
        }}
      >
        {/* Animated border lines */}
        <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-DEFAULT/50 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-DEFAULT/50 to-transparent"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {items.map((item, index) => (
          <SocialFlipNode
            key={index}
            item={item}
            index={index}
            isHovered={isHovered}
            setTooltipIndex={setTooltipIndex}
            tooltipIndex={tooltipIndex}
            itemClassName={itemClassName}
            frontClassName={frontClassName}
            backClassName={backClassName}
          />
        ))}
      </div>
    </div>
  );
}
