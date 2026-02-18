"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  Lightbulb,
  Heart,
  Users,
  Eye,
  BookOpen,
  Leaf,
} from "lucide-react";
import { spaContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="w-12 h-12" />,
  Heart: <Heart className="w-12 h-12" />,
  Users: <Users className="w-12 h-12" />,
  Eye: <Eye className="w-12 h-12" />,
  BookOpen: <BookOpen className="w-12 h-12" />,
  Leaf: <Leaf className="w-12 h-12" />,
};

export default function StoryValues() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-primary">
            Our Core Values
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Principles that guide every healing experience
          </p>
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {spaContent.story.values.map((value, index) => (
            <m.div
              key={value.name}
              variants={shouldReduceMotion ? {} : fadeUp}
              whileHover={{ y: -4 }}
              className="p-8 bg-surface rounded-2xl border border-border transition-all hover:border-accent/50"
            >
              <div className="text-accent mb-6">
                {iconMap[value.icon]}
              </div>
              <h3 className="font-[var(--font-display)] text-2xl font-semibold text-primary mb-4">
                {value.name}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}