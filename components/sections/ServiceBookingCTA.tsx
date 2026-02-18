"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Calendar, Phone } from "lucide-react";

interface ServiceBookingCTAProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function ServiceBookingCTA({
  title = "Ready to Transform?",
  subtitle = "Reserve your spot and begin your journey to healing.",
  primaryButtonText = "Book Your Session",
  primaryButtonHref = "/booking",
  secondaryButtonText = "Contact Us",
  secondaryButtonHref = "/#contact",
}: ServiceBookingCTAProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-primary">
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          animate={shouldReduceMotion ? {} : {
            rotate: [0, 360],
          }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 w-96 h-96 opacity-5"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-white">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
          </svg>
        </m.div>
        <m.div
          animate={shouldReduceMotion ? {} : {
            rotate: [360, 0],
          }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute -left-24 -bottom-24 w-64 h-64 opacity-5"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-white">
            <path
              d="M100 10 C 140 30, 180 70, 160 120 C 140 170, 100 180, 100 180 C 100 180, 60 170, 40 120 C 20 70, 60 30, 100 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </m.div>
      </div>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={shouldReduceMotion ? {} : staggerContainer}
        className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center"
      >
        <m.h2
          variants={shouldReduceMotion ? {} : fadeUp}
          className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          {title}
        </m.h2>

        <m.p
          variants={shouldReduceMotion ? {} : fadeUp}
          className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
        >
          {subtitle}
        </m.p>

        <m.div
          variants={shouldReduceMotion ? {} : fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href={primaryButtonHref}>
            <Button variant="primary" size="lg" className="gap-2 bg-accent hover:bg-secondary">
              <Calendar className="w-5 h-5" />
              {primaryButtonText}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={secondaryButtonHref}>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <Phone className="w-5 h-5" />
              {secondaryButtonText}
            </Button>
          </Link>
        </m.div>

        <m.p
          variants={shouldReduceMotion ? {} : fadeUp}
          className="mt-8 text-sm text-white/60"
        >
          60-Day Satisfaction Guarantee · Free Consultation · Secure Booking
        </m.p>
      </m.div>
    </section>
  );
}
