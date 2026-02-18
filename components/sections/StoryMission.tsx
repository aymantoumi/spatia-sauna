"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { spaContent } from "@/lib/content";

export default function StoryMission() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-surface">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={shouldReduceMotion ? {} : fadeUp}
        >
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-primary mb-8">
            {spaContent.story.mission.heading}
          </h2>
          
          <p className="font-[var(--font-display)] text-3xl md:text-5xl font-medium text-primary leading-tight">
            {spaContent.story.mission.statement}
          </p>
          
          <div className="mt-12 h-px w-24 bg-accent mx-auto" />
          
          <h3 className="mt-12 font-[var(--font-display)] text-2xl font-semibold text-secondary">
            {spaContent.story.mission.visionHeading}
          </h3>
          
          <p className="mt-4 text-xl md:text-2xl text-text-primary leading-relaxed">
            {spaContent.story.mission.visionStatement}
          </p>
        </m.div>
      </div>
    </section>
  );
}