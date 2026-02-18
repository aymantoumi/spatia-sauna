"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { spaContent } from "@/lib/content";

export default function BookingHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.nav
            variants={shouldReduceMotion ? {} : fadeIn}
            className="flex items-center gap-2 text-sm text-text-secondary mb-8"
          >
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="#services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-medium">Booking</span>
          </m.nav>

          <m.h1
            variants={shouldReduceMotion ? {} : fadeIn}
            className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-semibold text-primary tracking-tight"
          >
            {spaContent.booking.hero.headline}
          </m.h1>

          <m.p
            variants={shouldReduceMotion ? {} : fadeIn}
            className="mt-4 text-lg md:text-xl text-text-secondary max-w-2xl"
          >
            {spaContent.booking.hero.subtitle}
          </m.p>
        </m.div>
      </div>
    </section>
  );
}