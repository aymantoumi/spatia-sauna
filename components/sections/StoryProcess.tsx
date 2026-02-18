"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Calendar, Clock, User, Sparkles, Coffee, Mail } from "lucide-react";
import { spaContent } from "@/lib/content";

const iconMap: Record<number, React.ReactNode> = {
  1: <Calendar className="w-6 h-6" />,
  2: <Clock className="w-6 h-6" />,
  3: <User className="w-6 h-6" />,
  4: <Sparkles className="w-6 h-6" />,
  5: <Coffee className="w-6 h-6" />,
  6: <Mail className="w-6 h-6" />,
};

export default function StoryProcess() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-surface">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-primary">
            Your Wellness Journey
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            A detailed look at how we guide your transformation
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border" />
          
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={shouldReduceMotion ? {} : staggerContainer}
            className="space-y-12"
          >
            {spaContent.story.detailedProcess.map((step, index) => (
              <m.div
                key={step.step}
                variants={shouldReduceMotion ? {} : fadeUp}
                className="relative flex gap-6"
              >
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-primary text-white items-center justify-center font-bold text-xl z-10">
                  {step.step}
                </div>
                
                <div className="flex-grow bg-white p-6 rounded-2xl border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="md:hidden w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <span className="text-sm text-accent font-medium">{step.duration}</span>
                  </div>
                  
                  <h3 className="font-[var(--font-display)] text-xl font-semibold text-primary mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                  
                  {step.keyPoints && (
                    <ul className="mt-4 space-y-2">
                      {step.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}