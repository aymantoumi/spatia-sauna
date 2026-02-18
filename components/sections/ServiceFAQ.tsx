"use client";

import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ServiceFAQProps {
  service: ServiceData;
}

export default function ServiceFAQ({ service }: ServiceFAQProps) {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="text-center mb-12">
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary">
              Everything you need to know about {service.name}.
            </p>
          </m.div>

          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border transition-all overflow-hidden",
                  openIndex === index
                    ? "border-accent bg-accent/5"
                    : "border-border bg-white hover:border-accent/50"
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-primary pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </m.div>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="mt-12 text-center"
          >
            <p className="text-text-secondary mb-4">
              Still have questions?
            </p>
            <a
              href="tel:+212673740018"
              className="text-accent font-medium hover:text-secondary transition-colors"
            >
              Call us at 06 73 74 00 18
            </a>
            <span className="text-text-light mx-2">or</span>
            <a
              href="mailto:hello@spatiasauna.com"
              className="text-accent font-medium hover:text-secondary transition-colors"
            >
              email us
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
