"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ServiceData } from "@/lib/servicesData";
import { spaContent } from "@/lib/content";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Star, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ServiceTherapistsProps {
  service: ServiceData;
}

export default function ServiceTherapists({ service }: ServiceTherapistsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [scrollPosition, setScrollPosition] = useState(0);

  const therapists = service.therapistIds
    .map((id) => spaContent.team.find((t) => t.id === id))
    .filter(Boolean);

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < therapists.length - 1;

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && canScrollLeft) {
      setScrollPosition((prev) => Math.max(0, prev - 1));
    } else if (direction === "right" && canScrollRight) {
      setScrollPosition((prev) => Math.min(therapists.length - 1, prev + 1));
    }
  };

  if (therapists.length === 0) return null;

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
              Meet Your Therapists
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our skilled professionals trained specifically in {service.name}.
            </p>
          </m.div>

          <div className="relative">
            {therapists.length > 3 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all",
                    canScrollLeft
                      ? "text-primary hover:bg-accent hover:text-white"
                      : "text-text-light cursor-not-allowed"
                  )}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all",
                    canScrollRight
                      ? "text-primary hover:bg-accent hover:text-white"
                      : "text-text-light cursor-not-allowed"
                  )}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="overflow-hidden">
              <m.div
                variants={shouldReduceMotion ? {} : fadeIn}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {therapists.map((therapist) => {
                  if (!therapist) return null;

                  return (
                    <div
                      key={therapist.id}
                      className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="aspect-[4/5] bg-gradient-to-br from-primary/5 to-accent/10 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
                            <span className="text-3xl font-bold text-accent">
                              {therapist.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-1 text-gold">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < Math.floor(therapist.rating)
                                    ? "fill-current"
                                    : "stroke-current"
                                )}
                              />
                            ))}
                            <span className="text-sm text-white/80 ml-1">
                              {therapist.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-primary mb-1">
                          {therapist.name}
                        </h3>
                        <p className="text-sm text-accent font-medium mb-2">
                          {therapist.role}
                        </p>
                        <p className="text-xs text-text-light italic mb-3">
                          {therapist.credentials}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {therapist.specialties.slice(0, 3).map((specialty, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                          {therapist.bio}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-text-light mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>{therapist.experience} experience</span>
                        </div>

                        <Link
                          href={`/booking?service=${service.id}&therapist=${therapist.id}`}
                          className="block"
                        >
                          <Button variant="outline" className="w-full">
                            Book with {therapist.name.split(" ")[0]}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
