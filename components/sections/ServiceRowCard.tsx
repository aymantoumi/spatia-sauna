"use client";

import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { formatPrice } from "@/lib/serviceUtils";
import Link from "next/link";
import { Star, Clock, ChevronDown, ChevronUp, ArrowRight, Check, Heart, Zap, Sparkles, Flame, Droplets, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  HeartHandshake,
};

const categoryColors: Record<string, { bg: string; accent: string; border: string }> = {
  Massage: { bg: "from-primary/10 to-primary/5", accent: "text-primary", border: "border-primary/20" },
  Facials: { bg: "from-accent-warm/10 to-accent-warm/5", accent: "text-accent-warm", border: "border-accent-warm/20" },
  Wellness: { bg: "from-accent/10 to-accent/5", accent: "text-accent", border: "border-accent/20" },
  Packages: { bg: "from-gold/10 to-gold/5", accent: "text-gold", border: "border-gold/20" },
};

interface ServiceRowCardProps {
  service: ServiceData;
  index?: number;
}

export default function ServiceRowCard({ service, index = 0 }: ServiceRowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const colors = categoryColors[service.category] || categoryColors.Massage;

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={shouldReduceMotion ? {} : fadeUp}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
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

        <div className="relative flex flex-col lg:flex-row">
          <div className="relative lg:w-72 xl:w-80 flex-shrink-0">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[200px] overflow-hidden bg-gradient-to-br from-white/50 to-white/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20 z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <m.div
                  animate={shouldReduceMotion ? {} : {
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/60 to-white/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/80 to-white/40" />
                  </div>
                </m.div>
              </div>

              <div className="absolute top-4 left-4 z-20">
                <span className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold",
                  "bg-white/80 backdrop-blur-sm shadow-sm",
                  colors.accent
                )}>
                  {service.categoryLabel}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 lg:hidden">
                <h3 className="font-[var(--font-display)] text-xl font-bold text-primary">
                  {service.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 lg:p-8">
            <div className="flex flex-col h-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="hidden lg:block font-[var(--font-display)] text-2xl font-bold text-primary mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-accent italic mb-2">{service.tagline}</p>
                  <p className="text-text-secondary text-sm leading-relaxed lg:max-w-xl">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:text-right">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-medium text-text-primary">{service.rating}</span>
                      <span className="text-xs text-text-light">({service.reviews})</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-text-light">Starting at</span>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(service.startingPrice)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration:</span>
                </div>
                {service.durations.map((dur) => (
                  <span
                    key={dur}
                    className="px-3 py-1 rounded-full bg-white/60 text-text-secondary text-xs font-medium"
                  >
                    {dur} min
                  </span>
                ))}
                {service.packages && service.packages.length > 0 && (
                  <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                    Save up to {Math.round(
                      ((service.packages[0].originalPrice - service.packages[0].discountedPrice) /
                        service.packages[0].originalPrice) *
                        100
                    )}%
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.benefits.slice(0, 4).map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/60 text-text-secondary text-xs"
                  >
                    <Check className="w-3 h-3 text-success" />
                    {benefit}
                  </span>
                ))}
                {service.benefits.length > 4 && (
                  <span className="px-3 py-1 rounded-full bg-white/40 text-text-light text-xs">
                    +{service.benefits.length - 4} more
                  </span>
                )}
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/50 mb-4">
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {service.fullDescription}
                      </p>
                      
                      {service.packages && service.packages.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-primary mb-2">Available Packages:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.packages.map((pkg) => (
                              <div
                                key={pkg.id}
                                className="px-4 py-2 rounded-xl bg-white/60 border border-white/50 shadow-sm"
                              >
                                <span className="text-sm font-medium text-text-primary">{pkg.name}</span>
                                <span className="text-xs text-text-light ml-2">
                                  {formatPrice(pkg.discountedPrice)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/50">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex gap-3 sm:ml-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex-1 sm:flex-initial py-2.5 px-6 rounded-full bg-white/60 border border-primary/20 text-primary text-sm font-medium text-center hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/booking?service=${service.slug}`}
                    className="flex-1 sm:flex-initial py-2.5 px-6 rounded-full bg-accent text-white text-sm font-medium text-center hover:bg-secondary transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-1"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent-warm origin-left"
        />
      </m.div>
    </m.div>
  );
}
