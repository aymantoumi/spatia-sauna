"use client";

import { useState, useMemo } from "react";
import ServicesHero from "@/components/sections/ServicesHero";
import ServiceFilters from "@/components/sections/ServiceFilters";
import ServiceGrid from "@/components/sections/ServiceGrid";
import ServiceBookingCTA from "@/components/sections/ServiceBookingCTA";
import { servicesData } from "@/lib/servicesData";
import { FilterState, filterServices, defaultFilters } from "@/lib/serviceUtils";

export default function ServicesPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filteredServices = useMemo(() => {
    return filterServices(servicesData, filters);
  }, [filters]);

  return (
    <main>
      <ServicesHero />
      <ServiceFilters
        filters={filters}
        setFilters={setFilters}
        resultCount={filteredServices.length}
        totalCount={servicesData.length}
      />
      <ServiceGrid services={filteredServices} />
      <ServiceBookingCTA />
    </main>
  );
}
