"use client";

import { m, useScroll, useTransform, useSpring } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { formatPrice } from "@/lib/serviceUtils";
import Link from "next/link";
import { ChevronRight, Star, Clock, DollarSign, ArrowRight, Check, Sparkles, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ServiceDetailHeroProps {
  service: ServiceData;
}

function FloatingOrb({ delay = 0, size = 100, className = "" }: { delay?: number; size?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <m.div
      animate={shouldReduceMotion ? {} : { y: [0, -20, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className={cn("rounded-full blur-3xl", className)}
    />
  );
}

function FloatingElement({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <m.div
      animate={shouldReduceMotion ? {} : { y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-white/30 to-bg" />

      <m.div style={shouldReduceMotion ? {} : { y: smoothY }} className="absolute inset-0 pointer-events-none">
        <FloatingOrb delay={0} size={400} className="absolute top-0 right-0 bg-primary/10" />
        <FloatingOrb delay={2} size={300} className="absolute bottom-0 left-0 bg-accent/10" />
        <FloatingOrb delay={4} size={250} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-warm/10" />
      </m.div>

      <div className="absolute top-20 left-20 opacity-20">
        <FloatingElement delay={0}><div className="w-24 h-24 rounded-full border-2 border-primary/30" /></FloatingElement>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20">
        <FloatingElement delay={2}><div className="w-32 h-32 rounded-full border border-accent/30 rotate-45" /></FloatingElement>
      </div>
      <div className="absolute top-1/4 right-1/4 opacity-30">
        <FloatingElement delay={1}><Sparkles className="w-10 h-10 text-accent-warm/50" /></FloatingElement>
      </div>
      <div className="absolute bottom-1/3 left-1/4 opacity-30">
        <FloatingElement delay={3}><Leaf className="w-8 h-8 text-accent/50" /></FloatingElement>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <m.div initial="hidden" animate="visible" variants={shouldReduceMotion ? {} : staggerContainer}>
            <m.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-sm mb-8"
            >
              <Link href="/" className="px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-text-secondary hover:text-primary hover:bg-white transition-all shadow-sm">Home</Link>
              <ChevronRight className="w-4 h-4 text-text-light" />
              <Link href="/services" className="px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-text-secondary hover:text-primary hover:bg-white transition-all shadow-sm">Services</Link>
              <ChevronRight className="w-4 h-4 text-text-light" />
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">{service.name}</span>
            </m.nav>

            <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">{service.categoryLabel}</span>
            </m.div>

            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-accent-warm/10 rounded-3xl blur-2xl opacity-50" />
              <div className="relative">
                <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-primary tracking-tight leading-none mb-3">{service.name}</h1>
                <p className="text-xl md:text-2xl text-accent italic">{service.tagline}</p>
              </div>
            </m.div>

            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mt-6 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-text-secondary text-sm">{service.durations[0]}–{service.durations[service.durations.length - 1]} min</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm">
                <DollarSign className="w-4 h-4 text-accent" />
                <span className="text-text-secondary text-sm">From {formatPrice(service.startingPrice)}</span>
              </div>
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="font-semibold text-text-primary text-sm">{service.rating}</span>
                <span className="text-text-light text-xs">({service.reviews} reviews)</span>
              </div>
            </m.div>

            <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              {service.fullDescription}
            </m.p>

            <m.div initial={{ width: 0 }} animate={{ width: 150 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-1 bg-gradient-to-r from-accent via-primary to-accent-warm rounded-full mb-8"
            />

            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="flex flex-wrap gap-4">
              <Link href={`/booking?service=${service.slug}`}>
                <m.button whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-medium text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-shadow"
                >
                  Book This Service <ArrowRight className="w-5 h-5" />
                </m.button>
              </Link>
              <m.button whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 text-primary font-medium hover:bg-white hover:border-primary/40 transition-all"
              >
                View Pricing
              </m.button>
            </m.div>
          </m.div>

          <m.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-warm/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm border border-white/50 shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center relative">
                  <m.div animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/60 to-white/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/80 to-white/30" />
                    </div>
                  </m.div>
                </div>

                <div className="p-6 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-sm font-semibold text-primary">Highly rated by {service.reviews}+ clients</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.includedItems.slice(0, 4).map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bg text-xs text-text-secondary">
                        <Check className="w-3 h-3 text-success" />{item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}