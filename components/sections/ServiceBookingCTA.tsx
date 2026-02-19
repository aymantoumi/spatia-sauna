"use client";

import { m, useScroll, useTransform, useSpring } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { ArrowRight, Calendar, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ServiceBookingCTAProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

function FloatingOrb({ delay = 0, size = 100, className = "" }: { delay?: number; size?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <m.div
      animate={shouldReduceMotion ? {} : { y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className={cn("rounded-full blur-3xl", className)}
    />
  );
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-primary">
      <m.div style={shouldReduceMotion ? {} : { y: smoothY }} className="absolute inset-0 pointer-events-none">
        <FloatingOrb delay={0} size={350} className="absolute top-0 right-0 bg-white/5" />
        <FloatingOrb delay={2} size={250} className="absolute bottom-0 left-0 bg-accent/10" />
        <FloatingOrb delay={4} size={200} className="absolute top-1/2 left-1/3 bg-accent-warm/5" />
      </m.div>

      <m.div
        animate={shouldReduceMotion ? {} : { rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -right-32 -top-32 w-96 h-96 opacity-5 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-white">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </m.div>

      <m.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={shouldReduceMotion ? {} : staggerContainer}
        className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center"
      >
        <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">Begin Your Journey</span>
        </m.div>

        <m.h2 variants={shouldReduceMotion ? {} : fadeUp}
          className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >{title}</m.h2>

        <m.p variants={shouldReduceMotion ? {} : fadeUp}
          className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto"
        >{subtitle}</m.p>

        <m.div initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-accent via-accent-warm to-accent mx-auto mb-8 rounded-full"
        />

        <m.div variants={shouldReduceMotion ? {} : fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryButtonHref}>
            <m.button whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-lg shadow-xl shadow-accent/30 hover:shadow-2xl transition-shadow"
            >
              <Calendar className="w-5 h-5" />{primaryButtonText}<ArrowRight className="w-5 h-5" />
            </m.button>
          </Link>
          <Link href={secondaryButtonHref}>
            <m.button whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />{secondaryButtonText}
            </m.button>
          </Link>
        </m.div>

        <m.p variants={shouldReduceMotion ? {} : fadeUp} className="mt-8 text-sm text-white/40">
          60-Day Satisfaction Guarantee · Free Consultation · Secure Booking
        </m.p>
      </m.div>
    </section>
  );
}