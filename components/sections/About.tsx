"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";
import { useEffect, useState, useRef } from "react";
import { spaContent } from "@/lib/content";

interface CounterProps {
  value: number;
  label: string;
  suffix?: string;
}

function Counter({ value, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, shouldReduceMotion]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-accent">
        {count.toLocaleString()}{suffix}
      </span>
      <p className="mt-2 text-sm text-text-secondary tracking-wide">{label}</p>
    </div>
  );
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 md:py-36 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={shouldReduceMotion ? {} : slideInLeft}
            className="relative"
          >
            <blockquote className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light italic text-primary leading-snug">
              "{spaContent.about.quote}"
            </blockquote>
            <div className="mt-8 flex items-center gap-3 text-text-light">
              <span className="text-lg">✦</span>
              <span className="text-sm tracking-wide">{spaContent.about.since}</span>
            </div>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={shouldReduceMotion ? {} : slideInRight}
            className="space-y-6"
          >
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-primary">
              {spaContent.about.heading}
            </h3>
            {spaContent.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border mt-8">
              {spaContent.about.stats.map((stat) => (
                <Counter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                />
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}