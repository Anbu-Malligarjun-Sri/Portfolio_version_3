"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
FaGithub,
FaTwitter,
FaFacebook,
FaInstagram,
FaLinkedin,
FaEnvelope,
FaDiscord,
} from "react-icons/fa";

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
{ letter: "G", icon: <FaGithub />, label: "Github", href: "https://github.com/Anbu-Malligarjun-Sri" },
{ letter: "L", icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/" },
{ letter: "Y", icon: <FaTwitter />, label: "YouTube", href: "https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg" },
{ letter: "E", icon: <FaEnvelope />, label: "Email", href: "mailto:anbumalligarjun1@gmail.com" },
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
const Wrapper = item.href ? "a" : "div";
const wrapperProps = item.href
  ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
  : { onClick: item.onClick };

return (
  <Wrapper
    {...wrapperProps}
    className={cn("relative h-12 w-12 cursor-pointer", itemClassName)}
    style={{ perspective: "1000px" }}
    onMouseEnter={() => setTooltipIndex(index)}
    onMouseLeave={() => setTooltipIndex(null)}
  >
    <AnimatePresence>
      {isHovered && tooltipIndex === index && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
          animate={{ opacity: 1, y: -55, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-white shadow-xl dark:bg-white dark:text-neutral-900 border border-white/10 uppercase"
        >
          {item.label}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-neutral-900 dark:bg-white" />
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
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xl font-serif-display font-bold text-stark shadow-sm backdrop-blur-md",
          frontClassName
        )}
        style={{ backfaceVisibility: "hidden" }}
      >
        {item.letter}
      </div>

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl bg-neon text-xl text-void shadow-[0_0_20px_rgba(0,255,148,0.3)]",
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
  </Wrapper>
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
      className="group relative flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 shadow-2xl backdrop-blur-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTooltipIndex(null);
      }}
    >
      <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon/50 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon/50 to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
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
