"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData, getRelatedServices } from "@/lib/servicesData";
import { formatPrice } from "@/lib/serviceUtils";
import Link from "next/link";
import { ArrowRight, Star, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, { bg: string; accent: string }> = {
  massage: { bg: "from-primary/10 to-primary/5", accent: "text-primary" },
  facial: { bg: "from-accent-warm/10 to-accent-warm/5", accent: "text-accent-warm" },
  wellness: { bg: "from-accent/10 to-accent/5", accent: "text-accent" },
  package: { bg: "from-gold/10 to-gold/5", accent: "text-gold" },
  "body-treatment": { bg: "from-accent/10 to-accent/5", accent: "text-accent" },
};

interface RelatedServicesProps {
  currentService: ServiceData;
}

export default function RelatedServices({ currentService }: RelatedServicesProps) {
  const shouldReduceMotion = useReducedMotion();
  const relatedServices = getRelatedServices(currentService.id);

  if (relatedServices.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-bg to-white/50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={shouldReduceMotion ? {} : staggerContainer}>
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <m.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4"
            >You May Also Like</m.span>
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-4">Complete Your Wellness</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">Services that pair perfectly with {currentService.name}.</p>
            <m.div initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-accent via-primary to-accent-warm mx-auto mt-6 rounded-full"
            />
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => {
              const colors = categoryColors[service.category] || categoryColors.massage;
              return (
                <m.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/services/${service.slug}`} className="group block">
                    <m.div
                      whileHover={shouldReduceMotion ? {} : { y: -6 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "relative rounded-3xl overflow-hidden h-full",
                        "bg-gradient-to-br backdrop-blur-sm",
                        colors.bg,
                        "border-2 border-white/50",
                        "shadow-xl hover:shadow-2xl transition-all duration-500"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />

                      <div className="relative">
                        <div className="aspect-[16/9] bg-gradient-to-br from-white/50 to-white/20 flex items-center justify-center relative">
                          <m.div
                            animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg"
                          >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/60 to-white/20" />
                          </m.div>
                          <div className="absolute top-3 left-3">
                            <span className={cn("px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-sm shadow-sm", colors.accent)}>
                              {service.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{service.name}</h3>
                          <p className="text-sm text-text-secondary mb-3 line-clamp-2">{service.shortDescription}</p>
                          
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                              <span className="text-xs font-medium text-text-primary">{service.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-text-light">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-xs">{service.durations[0]}–{service.durations[service.durations.length - 1]} min</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/50">
                            <div>
                              <span className="text-xs text-text-light">From</span>
                              <p className="text-lg font-bold text-primary">{formatPrice(service.startingPrice)}</p>
                            </div>
                            <span className="flex items-center gap-1 text-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                              View Details <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>

                      <m.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent-warm origin-left"
                      />
                    </m.div>
                  </Link>
                </m.div>
              );
            })}
          </div>

          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="text-center mt-12">
            <Link href="/services">
              <m.button whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-medium shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-shadow"
              >
                View All Services <ArrowRight className="w-5 h-5" />
              </m.button>
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}