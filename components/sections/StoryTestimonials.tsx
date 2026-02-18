"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Star } from "lucide-react";
import { spaContent } from "@/lib/content";

export default function StoryTestimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-primary">
            Real Transformations
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Stories of healing and change
          </p>
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {spaContent.story.extendedTestimonials.map((testimonial, index) => (
            <m.div
              key={index}
              variants={shouldReduceMotion ? {} : fadeUp}
              className="p-8 bg-surface rounded-2xl border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FFC107] text-[#FFC107]"
                  />
                ))}
              </div>
              
              <blockquote className="font-[var(--font-display)] text-lg italic text-text-primary leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-medium text-primary">{testimonial.client}</p>
                <p className="text-sm text-text-secondary">{testimonial.title}</p>
                
                {testimonial.transformation && (
                  <div className="mt-4 p-4 bg-bg rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-text-light">Before</p>
                        <p className="text-text-secondary">{testimonial.transformation.before}</p>
                      </div>
                      <div>
                        <p className="text-text-light">After</p>
                        <p className="text-accent">{testimonial.transformation.after}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <span className="inline-block mt-4 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  {testimonial.treatment}
                </span>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}