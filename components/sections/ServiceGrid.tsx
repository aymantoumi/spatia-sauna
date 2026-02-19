"use client";

import { m, AnimatePresence } from "motion/react";
import { ServiceData } from "@/lib/servicesData";
import ServiceRowCard from "./ServiceRowCard";
import { Search } from "lucide-react";

interface ServiceGridProps {
  services: ServiceData[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {

  return (
    <section className="py-12 md:py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {services.length > 0 ? (
            <m.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {services.map((service, index) => (
                <ServiceRowCard key={service.id} service={service} index={index} />
              ))}
            </m.div>
          ) : (
            <m.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16 md:py-24"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">No services found</h3>
              <p className="text-text-secondary text-center max-w-md">
                We couldn&apos;t find any services matching your filters. Try adjusting your search criteria or reset the filters.
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
