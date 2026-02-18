"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer, slideInLeft } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { formatPrice } from "@/lib/serviceUtils";
import RevealText from "@/components/ui/RevealText";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ChevronRight, Star, Clock, DollarSign, ArrowRight } from "lucide-react";

interface ServiceDetailHeroProps {
  service: ServiceData;
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-gradient-to-b from-bg to-surface">
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          animate={shouldReduceMotion ? {} : {
            rotate: [0, 360],
          }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -right-48 -top-48 w-96 h-96 opacity-5"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
          </svg>
        </m.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <m.div
            initial="hidden"
            animate="visible"
            variants={shouldReduceMotion ? {} : staggerContainer}
          >
            <m.nav
              variants={shouldReduceMotion ? {} : slideInLeft}
              className="flex items-center gap-2 text-sm text-text-light mb-6"
            >
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/services" className="hover:text-accent transition-colors">
                Services
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-text-secondary">{service.name}</span>
            </m.nav>

            <m.div
              variants={shouldReduceMotion ? {} : fadeIn}
              className="mb-4"
            >
              <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                {service.categoryLabel}
              </span>
            </m.div>

            <m.h1
              variants={shouldReduceMotion ? {} : fadeIn}
              className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-primary tracking-tight leading-none mb-3"
            >
              <RevealText text={service.name} delay={0.2} />
            </m.h1>

            <m.p
              variants={shouldReduceMotion ? {} : fadeIn}
              className="text-xl md:text-2xl text-secondary italic mb-6"
            >
              {service.tagline}
            </m.p>

            <m.div
              variants={shouldReduceMotion ? {} : fadeIn}
              className="flex flex-wrap items-center gap-6 mb-6"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-text-secondary">
                  {service.durations[0]}–{service.durations[service.durations.length - 1]} min
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="text-text-secondary">
                  From {formatPrice(service.startingPrice)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <span className="font-semibold text-text-primary">{service.rating}</span>
                <span className="text-text-light">({service.reviews} reviews)</span>
              </div>
            </m.div>

            <m.p
              variants={shouldReduceMotion ? {} : fadeIn}
              className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              {service.fullDescription}
            </m.p>

            <m.div
              variants={shouldReduceMotion ? {} : fadeIn}
              className="flex flex-wrap gap-4"
            >
              <Link href={`/booking?service=${service.id}`}>
                <Button variant="primary" size="lg" className="gap-2">
                  Book This Service
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Pricing
              </Button>
            </m.div>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/10 border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-accent/10 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent/30" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span>Highly rated by {service.reviews}+ clients</span>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
