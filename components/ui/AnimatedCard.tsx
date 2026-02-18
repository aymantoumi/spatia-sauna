"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, scaleIn } from "@/lib/animations";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "scaleIn";
  delay?: number;
}

export default function AnimatedCard({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
}: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = variant === "fadeUp" ? fadeUp : scaleIn;

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shouldReduceMotion ? {} : variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}