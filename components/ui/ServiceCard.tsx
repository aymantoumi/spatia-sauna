"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import {
  Heart,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  HeartHandshake,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { spaContent } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Flame: <Flame className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8" />,
};

interface ServiceCardProps {
  service: (typeof spaContent.services)[0];
  isSelected: boolean;
  onSelect: (service: (typeof spaContent.services)[0], duration: number) => void;
  selectedDuration?: number;
}

export default function ServiceCard({
  service,
  isSelected,
  onSelect,
  selectedDuration,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localDuration, setLocalDuration] = useState<number>(
    selectedDuration || service.duration[0]
  );
  const shouldReduceMotion = useReducedMotion();

  const price =
    (service.pricing as unknown as Record<string, number>)[localDuration.toString()] ||
    service.startingPrice;

  const handleSelect = () => {
    onSelect(service, localDuration);
  };

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shouldReduceMotion ? {} : fadeUp}
      className={cn(
        "rounded-2xl border-2 p-6 bg-surface transition-all duration-300",
        "hover:-translate-y-1",
        isSelected
          ? "border-accent shadow-lg"
          : "border-border hover:border-accent/50"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-colors",
            isSelected ? "bg-accent text-white" : "bg-accent/10 text-accent"
          )}
        >
          {iconMap[service.icon]}
        </div>
        <div className="flex-grow">
          <h3 className="font-[var(--font-display)] text-xl font-bold text-primary">
            {service.name}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{service.shortDesc}</p>
        </div>
        {isSelected && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex gap-2">
          {service.durationLabels.map((d) => (
            <span
              key={d}
              className="px-2 py-1 text-xs font-medium bg-bg rounded-full text-text-secondary"
            >
              {d}
            </span>
          ))}
        </div>
        <span className="text-lg font-bold text-primary">
          ${service.startingPrice}+
        </span>
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
            View Details <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-text-secondary leading-relaxed">
                {service.fullDesc}
              </p>

              <div className="mt-6">
                <p className="text-sm font-medium text-text-primary mb-3">
                  Select Duration
                </p>
                <div className="flex gap-3">
                  {service.duration.map((d) => (
                    <button
                      key={d}
                      onClick={() => setLocalDuration(d)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        localDuration === d
                          ? "bg-accent text-white"
                          : "bg-bg text-text-secondary hover:bg-border"
                      )}
                    >
                      {d} min - $
                      {(service.pricing as unknown as Record<string, number>)[d.toString()]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-text-primary mb-3">
                  Benefits
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-light">Selected Price</p>
                  <p className="text-2xl font-bold text-primary">${price}</p>
                </div>
                <button
                  onClick={handleSelect}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-colors",
                    isSelected
                      ? "bg-success text-white"
                      : "bg-accent text-white hover:bg-secondary"
                  )}
                >
                  {isSelected ? "Selected" : "Select Service"}
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {!isExpanded && isSelected && (
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-sm text-text-light">
              {localDuration} min session
            </p>
            <p className="text-xl font-bold text-primary">${price}</p>
          </div>
          <button
            onClick={handleSelect}
            className="px-4 py-2 rounded-full bg-success text-white font-medium text-sm"
          >
            Selected
          </button>
        </div>
      )}
    </m.div>
  );
}