"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData, DetailedBenefit } from "@/lib/servicesData";
import {
  Heart,
  Activity,
  Wind,
  Moon,
  Zap,
  Flame,
  Sparkles,
  Star,
  Sun,
  Flower2,
  Users,
  Gift,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface ServiceBenefitsProps {
  service: ServiceData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Activity,
  Wind,
  Moon,
  Zap,
  Flame,
  Sparkles,
  Star,
  Sun,
  Flower2,
  Users,
  Gift,
  TrendingUp,
};

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedBenefit, setSelectedBenefit] = useState<DetailedBenefit | null>(
    service.detailedBenefits[0] || null
  );

  const IconComponent = selectedBenefit
    ? iconMap[selectedBenefit.icon] || Heart
    : Heart;

  return (
    <section className="py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.h2
            variants={shouldReduceMotion ? {} : fadeIn}
            className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary text-center mb-4"
          >
            Benefits of {service.name}
          </m.h2>

          <m.p
            variants={shouldReduceMotion ? {} : fadeIn}
            className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto"
          >
            Discover how this treatment can transform your body, mind, and spirit.
          </m.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <m.div variants={shouldReduceMotion ? {} : fadeIn}>
              <div className="space-y-3">
                {service.detailedBenefits.map((benefit, index) => {
                  const BenefitIcon = iconMap[benefit.icon] || Heart;
                  const isSelected = selectedBenefit?.title === benefit.title;

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedBenefit(benefit)}
                      className={cn(
                        "w-full flex items-start gap-4 p-4 rounded-xl transition-all text-left",
                        isSelected
                          ? "bg-accent text-white shadow-lg"
                          : "bg-white border border-border hover:border-accent/50 hover:shadow"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          isSelected ? "bg-white/20" : "bg-accent/10"
                        )}
                      >
                        <BenefitIcon
                          className={cn(
                            "w-5 h-5",
                            isSelected ? "text-white" : "text-accent"
                          )}
                        />
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "font-semibold mb-1",
                            isSelected ? "text-white" : "text-primary"
                          )}
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className={cn(
                            "text-sm line-clamp-2",
                            isSelected ? "text-white/80" : "text-text-secondary"
                          )}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </m.div>

            <m.div
              variants={shouldReduceMotion ? {} : fadeIn}
              className="hidden lg:block"
            >
              {selectedBenefit && (
                <div className="sticky top-32 p-8 rounded-2xl bg-white border border-border shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    {selectedBenefit.title}
                  </h3>

                  <p className="text-text-secondary leading-relaxed text-lg">
                    {selectedBenefit.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-text-light mb-3">
                      Related Benefits
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.slice(0, 4).map((benefit, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-bg text-text-secondary text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
