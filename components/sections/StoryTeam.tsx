"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { spaContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function StoryTeam() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-primary">
            Meet the Healers
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Skilled professionals dedicated to your transformation
          </p>
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {spaContent.team.map((member, index) => (
            <m.div
              key={member.id}
              variants={shouldReduceMotion ? {} : fadeUp}
              className="bg-surface rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-colors"
            >
              <div className="aspect-[4/5] bg-primary/5 flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
              
              <div className="p-6">
                <h3 className="font-[var(--font-display)] text-xl font-semibold text-primary">
                  {member.name}
                </h3>
                <p className="text-accent text-sm mt-1">{member.role}</p>
                <p className="text-text-light text-sm italic mt-1">{member.credentials}</p>
                
                <p className="text-text-secondary text-sm mt-4 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{member.experience}</span>
                  <span className="text-sm font-medium text-accent-warm">★ {member.rating}</span>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}