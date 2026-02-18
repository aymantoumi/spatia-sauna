"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations";
import { spaContent } from "@/lib/content";

export default function StoryOrigins() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={shouldReduceMotion ? {} : slideInLeft}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl bg-surface border border-border flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-6xl">🌿</span>
                <p className="mt-4 text-text-secondary">Founder Portrait</p>
              </div>
            </div>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={shouldReduceMotion ? {} : slideInRight}
          >
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-primary mb-8">
              {spaContent.story.origins.heading}
            </h2>
            
            <div className="space-y-6">
              {spaContent.story.origins.paragraphs.map((paragraph, index) => (
                <m.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-lg text-text-secondary leading-relaxed"
                >
                  {paragraph}
                </m.p>
              ))}
            </div>

            <m.blockquote
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-8 pl-6 border-l-4 border-accent"
            >
              <p className="font-[var(--font-display)] text-2xl italic text-primary">
                "{spaContent.story.origins.pullQuote}"
              </p>
            </m.blockquote>
          </m.div>
        </div>
      </div>
    </section>
  );
}