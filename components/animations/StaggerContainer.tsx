"use client";

import { ReactNode } from "react";
import { m } from "motion/react";
import { useInViewport } from "@/hooks/useInViewport";
import { staggerContainer, Variants } from "@/lib/animations";

interface StaggerContainerProps {
  children: ReactNode;
  variant?: Variants;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export default function StaggerContainer({
  children,
  variant = staggerContainer,
  threshold = 0.1,
  triggerOnce = true,
  className = "",
}: StaggerContainerProps) {
  const [ref, isInView] = useInViewport<HTMLDivElement>({ threshold, triggerOnce });

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      className={className}
    >
      {children}
    </m.div>
  );
}
