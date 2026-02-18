"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { formatPrice, calculatePackageSavings } from "@/lib/serviceUtils";
import Link from "next/link";
import { useState } from "react";
import { Check, Star, ArrowRight, Clock, Tag } from "lucide-react";

interface ServicePricingPlansProps {
  service: ServiceData;
}

export default function ServicePricingPlans({ service }: ServicePricingPlansProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"sessions" | "packages">("sessions");

  return (
    <section id="pricing" className="py-16 md:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.div variants={shouldReduceMotion ? {} : fadeIn} className="text-center mb-12">
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-4">
              Pricing & Plans
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Flexible options for your wellness journey. Choose the duration and package that works best for you.
            </p>
          </m.div>

          {service.packages && service.packages.length > 0 && (
            <m.div
              variants={shouldReduceMotion ? {} : fadeIn}
              className="flex justify-center mb-12"
            >
              <div className="inline-flex bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                    activeTab === "sessions"
                      ? "bg-accent text-white"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  Single Sessions
                </button>
                <button
                  onClick={() => setActiveTab("packages")}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                    activeTab === "packages"
                      ? "bg-accent text-white"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  Packages
                </button>
              </div>
            </m.div>
          )}

          {activeTab === "sessions" && (
            <m.div
              variants={shouldReduceMotion ? {} : fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {service.durations.map((duration) => {
                const price = service.pricing[duration];
                const isPopular = duration === 90 || (duration === 60 && service.durations.length === 2);

                return (
                  <div
                    key={duration}
                    className={cn(
                      "relative rounded-2xl p-6 transition-all",
                      isPopular
                        ? "bg-accent text-white shadow-xl scale-105"
                        : "bg-white text-primary shadow-lg"
                    )}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full bg-gold text-primary text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className={cn("w-5 h-5", isPopular ? "text-white/70" : "text-accent")} />
                        <span className={cn("text-sm font-medium", isPopular ? "text-white/70" : "text-text-secondary")}>
                          Duration
                        </span>
                      </div>
                      <h3 className={cn("text-3xl font-bold", isPopular ? "text-white" : "text-primary")}>
                        {duration} Minutes
                      </h3>
                    </div>

                    <div className="text-center mb-6">
                      <span className={cn("text-sm", isPopular ? "text-white/70" : "text-text-light")}>
                        Starting at
                      </span>
                      <p className={cn("text-4xl font-bold", isPopular ? "text-white" : "text-primary")}>
                        {formatPrice(price)}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {service.includedItems.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className={cn("w-4 h-4 flex-shrink-0", isPopular ? "text-white/70" : "text-success")} />
                          <span className={cn("text-sm", isPopular ? "text-white/90" : "text-text-secondary")}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link href={`/booking?service=${service.id}&duration=${duration}`} className="block">
                      <button
                        className={cn(
                          "w-full py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2",
                          isPopular
                            ? "bg-white text-accent hover:bg-white/90"
                            : "bg-accent text-white hover:bg-secondary"
                        )}
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                );
              })}
            </m.div>
          )}

          {activeTab === "packages" && service.packages && (
            <m.div
              variants={shouldReduceMotion ? {} : fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {service.packages.map((pkg) => {
                const savings = calculatePackageSavings(pkg.originalPrice, pkg.discountedPrice);

                return (
                  <div
                    key={pkg.id}
                    className={cn(
                      "relative rounded-2xl p-8 transition-all",
                      pkg.popular
                        ? "bg-accent text-white shadow-xl ring-4 ring-gold/30"
                        : "bg-white text-primary shadow-lg"
                    )}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full bg-gold text-primary text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Best Value
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      <Tag className={cn("w-5 h-5", pkg.popular ? "text-white/70" : "text-accent")} />
                      <span className={cn("text-sm font-medium", pkg.popular ? "text-white/70" : "text-text-secondary")}>
                        {pkg.sessions} Sessions
                      </span>
                    </div>

                    <h3 className={cn("text-2xl font-bold mb-2", pkg.popular ? "text-white" : "text-primary")}>
                      {pkg.name}
                    </h3>

                    <div className="flex items-baseline gap-3 mb-6">
                      <span className={cn("text-lg line-through", pkg.popular ? "text-white/50" : "text-text-light")}>
                        {formatPrice(pkg.originalPrice)}
                      </span>
                      <span className={cn("text-4xl font-bold", pkg.popular ? "text-white" : "text-primary")}>
                        {formatPrice(pkg.discountedPrice)}
                      </span>
                    </div>

                    <div className={cn("inline-flex items-center gap-1 px-3 py-1 rounded-full mb-6", pkg.popular ? "bg-white/20 text-white" : "bg-success/10 text-success")}>
                      <span className="text-sm font-semibold">Save {savings.percentage}%</span>
                      <span className="text-sm">({formatPrice(savings.amount)})</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className={cn("w-4 h-4 flex-shrink-0 mt-0.5", pkg.popular ? "text-white/70" : "text-success")} />
                          <span className={cn("text-sm", pkg.popular ? "text-white/90" : "text-text-secondary")}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className={cn("text-sm mb-6", pkg.popular ? "text-white/70" : "text-text-light")}>
                      Valid for {pkg.validity}
                    </div>

                    <Link href={`/booking?service=${service.id}&package=${pkg.id}`} className="block">
                      <button
                        className={cn(
                          "w-full py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2",
                          pkg.popular
                            ? "bg-white text-accent hover:bg-white/90"
                            : "bg-accent text-white hover:bg-secondary"
                        )}
                      >
                        Choose This Package
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                );
              })}
            </m.div>
          )}

          <m.p
            variants={shouldReduceMotion ? {} : fadeIn}
            className="text-center text-white/50 text-sm mt-8"
          >
            All prices include tax. Gift cards available. Contact us for custom packages.
          </m.p>
        </m.div>
      </div>
    </section>
  );
}
