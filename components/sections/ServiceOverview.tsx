"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { Target, CheckCircle, Eye, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceOverviewProps {
  service: ServiceData;
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-bg to-white/50" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={shouldReduceMotion ? {} : staggerContainer}>
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-12">
            <m.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            >About This Service</m.span>
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-4">What is {service.name}?</h2>
            <m.div initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-accent via-primary to-accent-warm mx-auto mt-4 rounded-full"
            />
          </m.div>

          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="space-y-6 mb-12">
            {service.longDescription.split("\n\n").map((paragraph, index) => (
              <m.p key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="text-text-secondary leading-relaxed text-lg"
              >{paragraph}</m.p>
            ))}
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-white/50 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />
              <div className="relative p-8">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">Who is This For?</h3>
                <ul className="space-y-3">
                  {service.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-center gap-3 text-text-secondary">
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>

            <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-warm/10 to-accent-warm/5 border-2 border-white/50 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />
              <div className="relative p-8">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-accent-warm" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">What to Expect</h3>
                <p className="text-text-secondary leading-relaxed">{service.whatToExpect}</p>
              </div>
            </m.div>
          </div>

          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-white/50 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                  <Package className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">What&apos;s Included</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.includedItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/60">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}