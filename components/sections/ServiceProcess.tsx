"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { Clock, CheckCircle } from "lucide-react";

interface ServiceProcessProps {
  service: ServiceData;
}

export default function ServiceProcess({ service }: ServiceProcessProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="text-center mb-12">
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-4">
              Your Service Experience
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A step-by-step look at what to expect during your appointment.
            </p>
          </m.div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-accent/20" />

            <div className="space-y-8">
              {service.process.map((step) => (
                <m.div
                  key={step.step}
                  variants={shouldReduceMotion ? {} : fadeIn}
                  className="relative flex gap-6"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  <div className="flex-grow pb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-semibold text-primary">
                        {step.title}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="mt-12 p-6 rounded-2xl bg-accent/5 border border-accent/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Total Duration
                </h3>
                <p className="text-text-secondary">
                  Your complete experience, including consultation, treatment, and relaxation time,
                  will take approximately{" "}
                  <span className="font-semibold text-primary">
                    {service.durations[service.durations.length - 1] + 30} minutes
                  </span>
                  .
                </p>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
