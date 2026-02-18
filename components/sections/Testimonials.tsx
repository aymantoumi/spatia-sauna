"use client";

import { cn } from "@/lib/utils";
import { m, useAnimation } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { spaContent } from "@/lib/content";

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof spaContent.testimonials)[0];
}) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 p-8 bg-surface rounded-2xl border border-border shadow-sm">
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
        <p className="text-sm text-text-light">{testimonial.title}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  const doubledTestimonials = [...spaContent.testimonials, ...spaContent.testimonials];

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: [0, -50 * spaContent.testimonials.length * 24],
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [isPaused, controls, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <section id="testimonials" className="py-24 md:py-36 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Real transformations from real people"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaContent.testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 md:py-36 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Real transformations from real people"
        />
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <m.div
          animate={controls}
          className="flex gap-6 px-6"
          style={{ width: "fit-content" }}
        >
          {doubledTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </m.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center">
        <p className="text-lg text-text-secondary mb-6">
          Ready to experience it yourself?
        </p>
        <Button variant="primary" size="lg">
          Book Your Session
        </Button>
      </div>
    </section>
  );
}