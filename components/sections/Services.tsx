"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import {
  Heart,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { spaContent } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Flame: <Flame className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8" />,
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof spaContent.services)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedCard delay={index * 0.1}>
      <div
        className={cn(
          "rounded-2xl border border-border p-8 bg-surface transition-all duration-300",
          "hover:-translate-y-1 hover:border-accent"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            {iconMap[service.icon]}
          </div>
          <div className="flex-grow">
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-primary">
              {service.name}
            </h3>
            <p className="mt-2 text-text-secondary">{service.shortDesc}</p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-accent font-medium text-sm tracking-wide hover:text-secondary transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Learn More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-border"
          >
            <p className="text-text-secondary leading-relaxed">
              {service.fullDesc}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-text-light mb-2">Duration</p>
                <div className="flex flex-wrap gap-2">
                  {service.duration.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1 text-xs font-medium bg-bg rounded-full text-text-secondary"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-light mb-2">Starting at</p>
                <p className="text-2xl font-bold text-primary">
                  ${service.startingPrice}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-text-light mb-3">Benefits</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Button variant="secondary" size="md">
                Book Now
              </Button>
            </div>
          </m.div>
        )}
      </div>
    </AnimatedCard>
  );
}

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-24 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Tailored experiences designed for your unique wellness journey"
        />

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {spaContent.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </m.div>
      </div>
    </section>
  );
}