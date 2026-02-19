"use client";

import { cn } from "@/lib/utils";
import { m, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useReducedMotion } from "motion/react";
import { staggerContainer, scaleIn } from "@/lib/animations";
import { spaContent } from "@/lib/content";
import { Calendar, Clock, Sparkles, Coffee, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const iconMap: Record<number, React.ComponentType<{ className?: string }>> = {
  1: Calendar,
  2: Clock,
  3: Sparkles,
  4: Coffee,
};

const stepColors = [
  { bg: "from-accent/10 to-accent/5", accent: "text-accent", ring: "ring-accent/30" },
  { bg: "from-primary/10 to-primary/5", accent: "text-primary", ring: "ring-primary/30" },
  { bg: "from-accent-warm/10 to-accent-warm/5", accent: "text-accent-warm", ring: "ring-accent-warm/30" },
  { bg: "from-gold/10 to-gold/5", accent: "text-gold", ring: "ring-gold/30" },
];

function FloatingOrb({ delay = 0, size = 100, className = "" }: { delay?: number; size?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <m.div
      animate={shouldReduceMotion ? {} : {
        y: [0, -20, 0],
        scale: [1, 1.05, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: size, height: size }}
      className={cn("rounded-full blur-3xl", className)}
    />
  );
}

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof spaContent.process)[0];
  index: number;
  isLast: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = stepColors[index % stepColors.length];
  const IconComponent = iconMap[step.step];

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="relative"
    >
      <div className={cn(
        "flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12",
        index % 2 === 1 && "md:flex-row-reverse"
      )}>
        <m.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex-1 w-full",
            index % 2 === 1 && "md:text-right"
          )}
        >
          <div
            ref={cardRef}
            className={cn(
              "relative p-8 rounded-3xl overflow-hidden",
              "bg-gradient-to-br backdrop-blur-sm",
              colors.bg,
              "border border-white/50",
              "shadow-xl hover:shadow-2xl transition-all duration-500"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30" />
            
            <div className="relative">
              <div className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4",
                "bg-white/80 shadow-sm"
              )}>
                <span className={cn("text-sm font-semibold", colors.accent)}>
                  Step {step.step}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  "bg-white shadow-lg",
                  index % 2 === 1 && "md:order-last"
                )}>
                  {IconComponent && <IconComponent className={cn("w-6 h-6", colors.accent)} />}
                </div>
                <h3 className="font-[var(--font-display)] text-2xl font-bold text-primary">
                  {step.title}
                </h3>
              </div>

              <p className="text-text-secondary leading-relaxed text-lg">
                {step.description}
              </p>

              <m.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className={cn(
                  "h-1 bg-gradient-to-r from-accent via-primary to-accent mt-6 rounded-full origin-left",
                  index % 2 === 1 && "md:origin-right"
                )}
              />
            </div>
          </div>
        </m.div>

        <div className="hidden md:flex flex-col items-center">
          <m.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.2 + index * 0.1, 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className={cn(
              "relative w-20 h-20 rounded-full",
              "bg-gradient-to-br from-white to-white/80",
              "shadow-2xl",
              "flex items-center justify-center",
              "ring-4",
              colors.ring
            )}
          >
            <span className="font-[var(--font-display)] text-3xl font-bold text-primary">
              {step.step}
            </span>
            
            <m.div
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                delay: index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={cn(
                "absolute inset-0 rounded-full",
                "bg-gradient-to-br",
                colors.bg,
                "opacity-50"
              )}
            />
          </m.div>

          {!isLast && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="w-1 bg-gradient-to-b from-primary/50 via-accent/30 to-primary/50 rounded-full mt-4"
            />
          )}
        </div>

        <div className="md:hidden flex items-center gap-4 mb-2">
          <m.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className={cn(
              "w-14 h-14 rounded-full",
              "bg-gradient-to-br from-primary to-primary/80",
              "shadow-xl",
              "flex items-center justify-center",
              "ring-4 ring-primary/20"
            )}
          >
            <span className="font-[var(--font-display)] text-xl font-bold text-white">
              {step.step}
            </span>
          </m.div>
          
          {!isLast && (
            <div className="flex-1 h-1 bg-gradient-to-r from-primary/30 to-transparent rounded-full" />
          )}
        </div>

        <div className="hidden md:block flex-1" />
      </div>
    </m.div>
  );
}

export default function Process() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} id="process" className="relative py-24 md:py-36 overflow-hidden">
      <m.div
        style={shouldReduceMotion ? {} : { y: smoothY }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingOrb delay={0} size={400} className="absolute top-0 right-0 bg-primary/10" />
        <FloatingOrb delay={2} size={300} className="absolute bottom-0 left-0 bg-accent/10" />
        <FloatingOrb delay={4} size={250} className="absolute top-1/2 left-1/3 bg-accent-warm/10" />
      </m.div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-bg to-white/50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <m.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            >
              How It Works
            </m.span>
            
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
              Your Wellness Journey
            </h2>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              A seamless process from booking to transformation
            </p>

            <m.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto mt-8 rounded-full"
            />
          </m.div>

          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
            {spaContent.process.map((step, index) => (
              <ProcessStep
                key={step.step}
                step={step}
                index={index}
                isLast={index === spaContent.process.length - 1}
              />
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-white to-accent/5 border border-white/50 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-primary">Ready to begin?</p>
                  <p className="text-sm text-text-secondary">Start your journey today</p>
                </div>
              </div>
              
              <Link href="/booking">
                <m.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </m.button>
              </Link>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
