"use client";

import { useState, useMemo } from "react";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Search, X } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import { spaContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const categories = spaContent.categories;

interface ServiceSelectorProps {
  selectedServiceId: string | null;
  selectedDuration: number | null;
  onSelectService: (service: (typeof spaContent.services)[0], duration: number) => void;
}

export default function ServiceSelector({
  selectedServiceId,
  selectedDuration,
  onSelectService,
}: ServiceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredServices = useMemo(() => {
    return spaContent.services.filter((service) => {
      const matchesSearch =
        searchQuery === "" ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : fadeUp}
          className="mb-12"
        >
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-primary mb-4">
            Select Your Service
          </h2>
          <p className="text-text-secondary max-w-xl">
            Browse our curated wellness experiences and choose the treatment that suits your needs.
          </p>
        </m.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border-2 border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-surface border border-border text-text-secondary hover:border-accent"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No services found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-accent hover:text-secondary"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={shouldReduceMotion ? {} : staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={selectedServiceId === service.id}
                selectedDuration={selectedDuration || undefined}
                onSelect={onSelectService}
              />
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
}