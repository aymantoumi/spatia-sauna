"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ChevronRight, Home, ChevronDown } from "lucide-react";
import Link from "next/link";
import { spaContent } from "@/lib/content";

export default function StoryHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="50" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.nav
            variants={shouldReduceMotion ? {} : fadeIn}
            className="flex items-center gap-2 text-sm text-white/60 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Our Story</span>
          </m.nav>

          <m.h1
            variants={shouldReduceMotion ? {} : fadeIn}
            className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight"
          >
            {spaContent.story.hero.headline}
          </m.h1>

          <m.p
            variants={shouldReduceMotion ? {} : fadeIn}
            className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed"
          >
            {spaContent.story.hero.tagline}
          </m.p>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <m.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60"
        >
          <ChevronDown className="w-6 h-6" />
        </m.div>
      </m.div>
    </section>
  );
}