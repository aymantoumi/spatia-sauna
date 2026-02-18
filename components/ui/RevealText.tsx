"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function RevealText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.15,
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  if (shouldReduceMotion) {
    return (
      <span className={cn("inline", className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em]">
            {word}
          </span>
        ))}
      </span>
    );
  }

  return (
    <m.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("inline", className)}
    >
      {words.map((word, i) => (
        <m.span key={i} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </m.span>
      ))}
    </m.span>
  );
}