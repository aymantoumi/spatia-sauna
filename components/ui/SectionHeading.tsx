"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shouldReduceMotion ? {} : fadeUp}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className
      )}
    >
      <h2 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-6 h-px bg-border origin-left",
          align === "center" && "mx-auto w-24",
          align === "left" && "w-24",
          align === "right" && "ml-auto w-24"
        )}
      />
    </m.div>
  );
}