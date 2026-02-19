"use client";

import { cn } from "@/lib/utils";
import { m, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useReducedMotion } from "motion/react";
import { staggerContainer, scaleIn } from "@/lib/animations";
import { useEffect, useState, useRef } from "react";
import { spaContent } from "@/lib/content";
import { ArrowRight, Sparkles, Heart, Leaf, Award, Users } from "lucide-react";
import Link from "next/link";

interface CounterProps {
  value: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
  delay?: number;
}

function Counter({ value, label, suffix = "", icon, delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(value * easeOut));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      setTimeout(() => requestAnimationFrame(animate), delay);
    }
  }, [value, shouldReduceMotion, isInView, delay]);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3 text-accent">
            {icon}
          </div>
        )}
        
        <span className="font-[var(--font-display)] text-3xl md:text-4xl font-bold text-primary">
          {count.toLocaleString()}{suffix}
        </span>
        <p className="mt-1 text-sm text-text-secondary tracking-wide">{label}</p>
      </div>
    </m.div>
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
        rotate: [0, 2, -2, 0],
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

function ParallaxText({ children, speed = 1 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <m.div ref={ref} style={shouldReduceMotion ? {} : { y: smoothY }}>
      {children}
    </m.div>
  );
}

function RevealParagraph({ children, delay = 0 }: { children: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
        {children}
      </p>
    </m.div>
  );
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 50, damping: 30 });

  return (
    <section ref={containerRef} id="about" className="relative py-24 md:py-36 overflow-hidden">
      <m.div
        style={shouldReduceMotion ? {} : { y: smoothBackgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-accent/5 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-accent-warm/3 to-transparent blur-3xl" />
      </m.div>

      <div className="absolute top-20 left-10 opacity-20">
        <FloatingElement delay={0}>
          <div className="w-20 h-20 rounded-full border-2 border-primary/30" />
        </FloatingElement>
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-20">
        <FloatingElement delay={2}>
          <div className="w-32 h-32 rounded-full border border-accent/30 rotate-45" />
        </FloatingElement>
      </div>

      <div className="absolute top-1/3 right-20 opacity-30">
        <FloatingElement delay={1}>
          <Sparkles className="w-8 h-8 text-accent/50" />
        </FloatingElement>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          <div className="relative">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white via-white to-white/80 backdrop-blur-sm shadow-2xl border border-white/50">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    Our Philosophy
                  </span>
                </m.div>

                <ParallaxText speed={0.5}>
                  <blockquote className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-light text-primary leading-snug">
                    <span className="text-accent">"</span>
                    {spaContent.about.quote.split(' ').slice(0, 3).join(' ')}
                    <span className="block mt-2">
                      {spaContent.about.quote.split(' ').slice(3, 6).join(' ')}
                    </span>
                    <span className="block mt-2 text-primary/80">
                      {spaContent.about.quote.split(' ').slice(6).join(' ')}
                      <span className="text-accent">"</span>
                    </span>
                  </blockquote>
                </ParallaxText>

                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex items-center gap-3"
                >
                  <div className="w-12 h-px bg-gradient-to-r from-accent to-transparent" />
                  <span className="text-sm text-text-secondary tracking-widest uppercase">
                    {spaContent.about.since}
                  </span>
                </m.div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl flex items-center justify-center"
            >
              <Heart className="w-10 h-10 text-white" />
            </m.div>
          </div>

          <div className="space-y-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                About Us
              </span>
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary">
                {spaContent.about.heading}
              </h2>
            </m.div>

            <div className="space-y-6">
              {spaContent.about.paragraphs.map((paragraph, index) => (
                <RevealParagraph key={index} delay={0.2 + index * 0.15}>
                  {paragraph}
                </RevealParagraph>
              ))}
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Link href="/story">
                <m.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 5 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="inline-flex items-center gap-2 text-accent font-medium hover:text-secondary transition-colors group"
                >
                  Read Our Full Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </m.button>
              </Link>
            </m.div>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Counter
              value={spaContent.about.stats[0].value}
              label={spaContent.about.stats[0].label}
              suffix={spaContent.about.stats[0].suffix}
              icon={<Award className="w-5 h-5" />}
              delay={0}
            />
            <Counter
              value={spaContent.about.stats[1].value}
              label={spaContent.about.stats[1].label}
              suffix={spaContent.about.stats[1].suffix}
              icon={<Users className="w-5 h-5" />}
              delay={100}
            />
            <Counter
              value={spaContent.about.stats[2].value}
              label={spaContent.about.stats[2].label}
              suffix={spaContent.about.stats[2].suffix}
              icon={<Heart className="w-5 h-5" />}
              delay={200}
            />
            <Counter
              value={spaContent.about.stats[3].value}
              label={spaContent.about.stats[3].label}
              suffix={spaContent.about.stats[3].suffix}
              icon={<Leaf className="w-5 h-5" />}
              delay={300}
            />
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/80 shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm text-text-secondary">
              Join <span className="font-semibold text-primary">5,000+</span> happy clients
            </span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
