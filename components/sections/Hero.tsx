"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { ChevronDown, ArrowRight, BookOpen } from "lucide-react";
import { spaContent } from "@/lib/content";
import Link from "next/link";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
          <div className="lg:col-span-6">
            <m.div
              initial="hidden"
              animate="visible"
              variants={shouldReduceMotion ? {} : staggerContainer}
              className="space-y-4"
            >
              <m.p
                variants={shouldReduceMotion ? {} : fadeIn}
                className="font-[var(--font-display)] text-3xl md:text-4xl font-light text-text-primary tracking-wide"
              >
                <RevealText text={spaContent.hero.line1} delay={0.2} />
              </m.p>

              <m.h1
                variants={shouldReduceMotion ? {} : fadeIn}
                className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold italic text-primary tracking-tight leading-none"
              >
                <RevealText text={spaContent.hero.line2} delay={0.4} />
              </m.h1>

              <m.p
                variants={shouldReduceMotion ? {} : fadeIn}
                className="font-[var(--font-display)] text-3xl md:text-4xl font-light text-text-primary tracking-wide"
              >
                <RevealText text={spaContent.hero.line3} delay={0.6} />
              </m.p>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="pt-4 text-lg md:text-xl text-text-secondary max-w-md"
              >
                {spaContent.hero.subtitle}
              </m.p>

              <m.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-24 bg-accent origin-left mt-8 mb-8"
              />

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/booking">
                  <Button variant="primary" size="lg" className="gap-2">
                    Book a Session
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/story">
                  <Button variant="outline" size="lg" className="gap-2">
                    Discover Our Story
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </Link>
              </m.div>
            </m.div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-80 h-80"
            >
              <m.svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                animate={shouldReduceMotion ? {} : {
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <m.path
                  d="M100 10 C 140 30, 180 70, 160 120 C 140 170, 100 180, 100 180 C 100 180, 60 170, 40 120 C 20 70, 60 30, 100 10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  className="text-primary/30"
                />
                <m.path
                  d="M100 40 C 120 50, 140 80, 130 110 C 120 140, 100 150, 100 150 C 100 150, 80 140, 70 110 C 60 80, 80 50, 100 40"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  className="text-primary/50"
                />
                <m.path
                  d="M100 70 C 110 80, 120 90, 110 110 C 100 130, 100 130, 100 130 C 100 130, 100 130, 90 110 C 80 90, 90 80, 100 70"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                  className="text-accent"
                />
              </m.svg>
            </m.div>
          </div>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <m.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-primary/60" />
        </m.div>
      </m.div>
    </section>
  );
}