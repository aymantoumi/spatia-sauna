"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer, slideInLeft } from "@/lib/animations";
import RevealText from "@/components/ui/RevealText";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

export default function ServicesHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[350px] md:min-h-[400px] flex items-center overflow-hidden bg-gradient-to-b from-bg to-surface">
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          animate={shouldReduceMotion ? {} : {
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 w-96 h-96 opacity-10"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-accent">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </m.div>
        <m.div
          animate={shouldReduceMotion ? {} : {
            rotate: [360, 0],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -left-24 bottom-0 w-64 h-64 opacity-5"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
            <path
              d="M100 10 C 140 30, 180 70, 160 120 C 140 170, 100 180, 100 180 C 100 180, 60 170, 40 120 C 20 70, 60 30, 100 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </m.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 w-full">
        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="max-w-3xl"
        >
          <m.nav
            variants={shouldReduceMotion ? {} : slideInLeft}
            className="flex items-center gap-2 text-sm text-text-light mb-6"
          >
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-text-secondary">Services</span>
          </m.nav>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent tracking-wide uppercase">
              Wellness Experiences
            </span>
          </m.div>

          <m.h1
            variants={shouldReduceMotion ? {} : fadeIn}
            className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic text-primary tracking-tight leading-none mb-4"
          >
            <RevealText text="Our Wellness" delay={0.2} />
          </m.h1>

          <m.h1
            variants={shouldReduceMotion ? {} : fadeIn}
            className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-secondary tracking-tight leading-none mb-6"
          >
            <RevealText text="Services" delay={0.4} />
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
          >
            Curated experiences designed to transform your body, mind, and spirit.
            Discover the perfect treatment for your wellness journey.
          </m.p>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-32 bg-accent origin-left mt-8"
          />
        </m.div>
      </div>
    </section>
  );
}
