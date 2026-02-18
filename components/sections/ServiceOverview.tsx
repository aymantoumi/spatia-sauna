"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { Target, CheckCircle } from "lucide-react";

interface ServiceOverviewProps {
  service: ServiceData;
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
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
          <m.h2
            variants={shouldReduceMotion ? {} : fadeIn}
            className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-8"
          >
            What is {service.name}?
          </m.h2>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="prose prose-lg max-w-none"
          >
            {service.longDescription.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-text-secondary leading-relaxed mb-6 text-lg"
              >
                {paragraph}
              </p>
            ))}
          </m.div>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="mt-12 p-8 rounded-2xl bg-accent/5 border border-accent/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  Who is This For?
                </h3>
                <ul className="space-y-2">
                  {service.targetAudience.map((audience, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-text-secondary"
                    >
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.div>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="mt-12"
          >
            <h3 className="text-2xl font-semibold text-primary mb-4">
              What to Expect
            </h3>
            <p className="text-text-secondary leading-relaxed text-lg">
              {service.whatToExpect}
            </p>
          </m.div>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="mt-12"
          >
            <h3 className="text-2xl font-semibold text-primary mb-4">
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.includedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text-primary">{item}</span>
                </div>
              ))}
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
