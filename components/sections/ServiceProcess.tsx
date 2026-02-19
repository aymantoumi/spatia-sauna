"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceProcessProps {
  service: ServiceData;
}

const stepColors = [
  { bg: "from-accent/10 to-accent/5", accent: "text-accent", ring: "ring-accent/30" },
  { bg: "from-primary/10 to-primary/5", accent: "text-primary", ring: "ring-primary/30" },
  { bg: "from-accent-warm/10 to-accent-warm/5", accent: "text-accent-warm", ring: "ring-accent-warm/30" },
  { bg: "from-gold/10 to-gold/5", accent: "text-gold", ring: "ring-gold/30" },
];

export default function ServiceProcess({ service }: ServiceProcessProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-bg to-white/50" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={shouldReduceMotion ? {} : staggerContainer}>
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <m.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            >Step by Step</m.span>
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-4">Your Service Experience</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">A step-by-step look at what to expect during your appointment.</p>
            <m.div initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-accent via-primary to-accent-warm mx-auto mt-6 rounded-full"
            />
          </m.div>

          <div className="space-y-6">
            {service.process.map((step, index) => {
              const colors = stepColors[index % stepColors.length];
              return (
                <m.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <m.div
                    whileHover={shouldReduceMotion ? {} : { y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "relative rounded-3xl overflow-hidden",
                      "bg-gradient-to-br backdrop-blur-sm",
                      colors.bg,
                      "border-2 border-white/50",
                      "shadow-xl hover:shadow-2xl transition-all duration-500"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />
                    <div className="relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
                      <m.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0",
                          "bg-gradient-to-br from-white to-white/80",
                          "shadow-xl ring-4",
                          colors.ring
                        )}
                      >
                        <span className="font-[var(--font-display)] text-2xl font-bold text-primary">{step.step}</span>
                      </m.div>

                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl md:text-2xl font-semibold text-primary">{step.title}</h3>
                          <span className="px-3 py-1 rounded-full bg-white/80 text-sm font-medium flex items-center gap-1 shadow-sm text-text-secondary">
                            <Clock className="w-3 h-3" />{step.duration}
                          </span>
                        </div>
                        <p className="text-text-secondary leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    <m.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent-warm origin-left"
                    />
                  </m.div>
                </m.div>
              );
            })}
          </div>

          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-8 relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-white/50 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />
            <div className="relative p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">Total Duration</h3>
                <p className="text-text-secondary">
                  Your complete experience, including consultation, treatment, and relaxation time, will take approximately{" "}
                  <span className="font-semibold text-primary">{service.durations[service.durations.length - 1] + 30} minutes</span>.
                </p>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}