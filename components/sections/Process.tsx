"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { spaContent } from "@/lib/content";
import { Calendar, Clock, Sparkles, Coffee } from "lucide-react";

const iconMap: Record<number, React.ReactNode> = {
  1: <Calendar className="w-6 h-6" />,
  2: <Clock className="w-6 h-6" />,
  3: <Sparkles className="w-6 h-6" />,
  4: <Coffee className="w-6 h-6" />,
};

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-24 md:py-36 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Your Wellness Journey"
          subtitle="A seamless process from booking to transformation"
        />

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="relative max-w-4xl mx-auto"
        >
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {spaContent.process.map((step, index) => (
              <m.div
                key={step.step}
                variants={shouldReduceMotion ? {} : fadeUp}
                className={cn(
                  "relative md:flex md:items-center",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "md:w-1/2 md:px-12",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}
                >
                  <div className="bg-bg p-8 rounded-2xl border border-border">
                    <h3 className="font-[var(--font-display)] text-2xl font-bold text-primary mb-4">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                </div>

                <div className="md:hidden flex items-center gap-4 mb-4 mt-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="text-primary">
                    {iconMap[step.step]}
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}