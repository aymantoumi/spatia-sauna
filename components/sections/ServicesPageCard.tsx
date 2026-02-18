"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { formatPrice } from "@/lib/serviceUtils";
import Link from "next/link";
import { Star, Clock, ArrowRight } from "lucide-react";

interface ServicesPageCardProps {
  service: ServiceData;
  index?: number;
}

export default function ServicesPageCard({ service, index = 0 }: ServicesPageCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shouldReduceMotion ? {} : fadeUp}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-accent/30" />
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 rounded-full bg-accent/90 text-white text-xs font-semibold backdrop-blur-sm">
            {service.categoryLabel}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-1">
            {service.name}
          </h3>
          <p className="text-sm text-white/80 italic">{service.tagline}</p>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {service.shortDescription}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-text-primary">{service.rating}</span>
            <span className="text-xs text-text-light">({service.reviews})</span>
          </div>
          <span className="text-text-light">·</span>
          <div className="flex items-center gap-1 text-text-secondary">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {service.durations[0]}–{service.durations[service.durations.length - 1]} min
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {service.durations.map((dur) => (
            <span
              key={dur}
              className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
            >
              {dur} min
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-text-light">Starting at</span>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(service.startingPrice)}
              </p>
            </div>
            {service.packages && service.packages.length > 0 && (
              <span className="text-xs text-success font-medium">
                Save up to {Math.round(
                  ((service.packages[0].originalPrice - service.packages[0].discountedPrice) /
                    service.packages[0].originalPrice) *
                    100
                )}%
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              href={`/services/${service.slug}`}
              className="flex-1 py-2.5 px-4 rounded-full border-2 border-primary text-primary text-sm font-medium text-center hover:bg-primary hover:text-white transition-all"
            >
              View Details
            </Link>
            <Link
              href={`/booking?service=${service.id}`}
              className="flex-1 py-2.5 px-4 rounded-full bg-accent text-white text-sm font-medium text-center hover:bg-secondary transition-all flex items-center justify-center gap-1"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </m.div>
  );
}
