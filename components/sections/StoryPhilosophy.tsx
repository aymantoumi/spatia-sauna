"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { spaContent } from "@/lib/content";

export default function StoryPhilosophy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : fadeUp}
          className="text-center mb-12"
        >
          <h2 className="font-[var(--font-display)] text-4xl font-semibold text-primary">
            {spaContent.story.philosophy.heading}
          </h2>
          <p className="mt-4 text-text-secondary">
            {spaContent.story.philosophy.subtitle}
          </p>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-text-secondary leading-relaxed mb-12"
        >
          {spaContent.story.philosophy.introduction}
        </m.p>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="space-y-12"
        >
          {spaContent.story.philosophy.sections.map((section, index) => (
            <m.div
              key={section.title}
              variants={shouldReduceMotion ? {} : fadeUp}
              className="border-l-2 border-accent/30 pl-6"
            >
              <h3 className="font-[var(--font-display)] text-2xl font-semibold text-primary mb-4">
                {section.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {section.content}
              </p>
            </m.div>
          ))}
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-lg text-text-secondary leading-relaxed text-center"
        >
          {spaContent.story.philosophy.closing}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/booking">
            <Button variant="primary" size="lg">
              Book Your Experience
            </Button>
          </Link>
        </m.div>
      </div>
    </section>
  );
}