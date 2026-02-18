"use client";

import { ReactNode } from "react";
import { m } from "motion/react";
import { useInViewport } from "@/hooks/useInViewport";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  scaleIn,
  fadeIn,
  Variants,
} from "@/lib/animations";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fadeUp" | "slideLeft" | "slideRight" | "scale" | "fadeIn" | "custom";
  customVariant?: Variants;
  delay?: number;
  triggerOnce?: boolean;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  customVariant,
  delay = 0,
  triggerOnce = true,
  threshold = 0.2,
  className = "",
}: ScrollRevealProps) {
  const [ref, isInView] = useInViewport<HTMLDivElement>({ threshold, triggerOnce });

  const variantMap: Record<string, Variants> = {
    fadeUp,
    slideLeft: slideInLeft,
    slideRight: slideInRight,
    scale: scaleIn,
    fadeIn,
  };

  const selectedVariant = customVariant || variantMap[variant] || fadeUp;

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
