"use client";

import { m, useScroll, useTransform, useSpring } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ChevronRight, Sparkles, ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { spaContent } from "@/lib/content";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function FloatingOrb({ delay = 0, size = 100, className = "" }: { delay?: number; size?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <m.div
      animate={shouldReduceMotion ? {} : {
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: size, height: size }}
      className={cn("rounded-full blur-3xl", className)}
    />
  );
}

function FloatingElement({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <m.div
      animate={shouldReduceMotion ? {} : {
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export default function BookingHero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative min-h-[450px] md:min-h-[550px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-white/30 to-bg" />
      
      <m.div
        style={shouldReduceMotion ? {} : { y: smoothY }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingOrb delay={0} size={400} className="absolute top-0 right-0 bg-primary/10" />
        <FloatingOrb delay={2} size={300} className="absolute bottom-0 left-0 bg-accent/10" />
        <FloatingOrb delay={4} size={250} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-warm/10" />
      </m.div>

      <div className="absolute top-20 left-20 opacity-20">
        <FloatingElement delay={0}>
          <div className="w-24 h-24 rounded-full border-2 border-primary/30" />
        </FloatingElement>
      </div>
      
      <div className="absolute bottom-20 right-20 opacity-20">
        <FloatingElement delay={2}>
          <div className="w-32 h-32 rounded-full border border-accent/30 rotate-45" />
        </FloatingElement>
      </div>

      <div className="absolute top-1/4 right-1/4 opacity-30">
        <FloatingElement delay={1}>
          <Calendar className="w-10 h-10 text-accent-warm/50" />
        </FloatingElement>
      </div>

      <m.div
        animate={shouldReduceMotion ? {} : {
          rotate: [0, 360],
        }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -right-48 -top-48 w-96 h-96 opacity-5 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </m.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 w-full">
        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="max-w-3xl"
        >
          <m.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 text-sm mb-8"
          >
            <Link 
              href="/" 
              className="group flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-text-secondary hover:text-primary hover:bg-white transition-all shadow-sm"
            >
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-text-light" />
            <Link 
              href="/services"
              className="px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-text-secondary hover:text-primary hover:bg-white transition-all shadow-sm"
            >
              Services
            </Link>
            <ChevronRight className="w-4 h-4 text-text-light" />
            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
              Booking
            </span>
          </m.nav>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-warm/10 text-accent-warm mb-6"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Book Your Session
            </span>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-accent-warm/10 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative">
              <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight leading-none mb-2">
                {spaContent.booking.hero.headline.split(' ').slice(0, 2).join(' ')}
              </h1>
              <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-accent tracking-tight leading-none mb-8">
                {spaContent.booking.hero.headline.split(' ').slice(2).join(' ')}
              </h1>
            </div>
          </m.div>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mb-8"
          >
            {spaContent.booking.hero.subtitle}
          </m.p>

          <m.div
            initial={{ width: 0 }}
            animate={{ width: 150 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 bg-gradient-to-r from-accent-warm via-primary to-accent rounded-full mb-8"
          />

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a href="#select-service">
              <m.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                  "bg-primary text-white font-medium",
                  "shadow-lg shadow-primary/25",
                  "hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                )}
              >
                Select Service
                <ArrowRight className="w-5 h-5" />
              </m.button>
            </a>
            
            <Link href="/services">
              <m.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                  "bg-white/80 backdrop-blur-sm border border-primary/20",
                  "text-primary font-medium",
                  "hover:bg-white hover:border-primary/40 transition-all"
                )}
              >
                View All Services
              </m.button>
            </Link>
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-warm/20 to-accent/20 rounded-3xl blur-2xl" />
            
            <div className="relative p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <m.div
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-accent-warm/10 flex items-center justify-center mb-3"
                  >
                    <Clock className="w-8 h-8 text-accent-warm" />
                  </m.div>
                  <p className="text-3xl font-bold text-primary">24h</p>
                  <p className="text-sm text-text-secondary">Confirmation</p>
                </div>
                
                <div className="text-center">
                  <m.div
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-3"
                  >
                    <Sparkles className="w-8 h-8 text-accent" />
                  </m.div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-text-secondary">Satisfaction</p>
                </div>
              </div>
              
              <m.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mt-6 origin-left"
              />
              
              <p className="text-center text-sm text-text-light mt-4">
                Easy & secure booking
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}