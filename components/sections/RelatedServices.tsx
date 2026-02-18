"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData, getRelatedServices } from "@/lib/servicesData";
import { formatPrice } from "@/lib/serviceUtils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedServicesProps {
  currentService: ServiceData;
}

export default function RelatedServices({ currentService }: RelatedServicesProps) {
  const shouldReduceMotion = useReducedMotion();
  const relatedServices = getRelatedServices(currentService.id);

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="text-center mb-12">
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-4">
              Complete Your Wellness
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Services that pair perfectly with {currentService.name}.
            </p>
          </m.div>

          <m.div
            variants={shouldReduceMotion ? {} : fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {relatedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-accent/50 transition-all hover:-translate-y-1">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/10 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-accent/20" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-accent/90 text-white text-xs font-semibold">
                        {service.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-text-light">From</span>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(service.startingPrice)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-accent font-medium text-sm">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </m.div>

          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-accent font-medium hover:text-secondary transition-colors"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
