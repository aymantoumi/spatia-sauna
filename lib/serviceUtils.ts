import { ServiceData, ServiceCategory, servicesData } from "./servicesData";

export interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  duration: string[];
}

export const defaultFilters: FilterState = {
  search: "",
  category: "all",
  priceRange: [0, 500],
  duration: [],
};

export function filterServices(
  services: ServiceData[],
  filters: FilterState
): ServiceData[] {
  return services.filter((service) => {
    const matchesSearch =
      filters.search === "" ||
      service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.categoryLabel.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      filters.category === "all" || service.category === filters.category;

    const matchesPrice =
      service.startingPrice >= filters.priceRange[0] &&
      service.startingPrice <= filters.priceRange[1];

    const matchesDuration =
      filters.duration.length === 0 ||
      filters.duration.some((dur) => {
        const durValue = parseInt(dur.replace(" min", "").replace("+", ""), 10);
        return service.durations.includes(durValue);
      });

    return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
  });
}

export function searchServices(query: string, services: ServiceData[] = servicesData): ServiceData[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return services;

  return services.filter((service) => {
    const searchableText = [
      service.name,
      service.shortDescription,
      service.fullDescription,
      service.categoryLabel,
      service.tagline,
      ...service.benefits,
      ...service.targetAudience,
    ].join(" ").toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function sortServicesByPrice(
  services: ServiceData[],
  order: "asc" | "desc" = "asc"
): ServiceData[] {
  return [...services].sort((a, b) => {
    return order === "asc"
      ? a.startingPrice - b.startingPrice
      : b.startingPrice - a.startingPrice;
  });
}

export function sortServicesByRating(
  services: ServiceData[],
  order: "asc" | "desc" = "desc"
): ServiceData[] {
  return [...services].sort((a, b) => {
    return order === "asc"
      ? a.rating - b.rating
      : b.rating - a.rating;
  });
}

export function getServicesInPriceRange(
  min: number,
  max: number,
  services: ServiceData[] = servicesData
): ServiceData[] {
  return services.filter(
    (service) => service.startingPrice >= min && service.startingPrice <= max
  );
}

export function getServicesByDuration(
  duration: number,
  services: ServiceData[] = servicesData
): ServiceData[] {
  return services.filter((service) => service.durations.includes(duration));
}

export function getUniqueCategories(services: ServiceData[] = servicesData): ServiceCategory[] {
  const categories = new Set<ServiceCategory>();
  services.forEach((service) => categories.add(service.category));
  return Array.from(categories);
}

export function getPriceRange(services: ServiceData[] = servicesData): [number, number] {
  if (services.length === 0) return [0, 500];
  
  const prices = services.map((s) => s.startingPrice);
  return [Math.min(...prices), Math.max(...prices)];
}

export function getDurationOptions(services: ServiceData[] = servicesData): number[] {
  const durations = new Set<number>();
  services.forEach((service) => {
    service.durations.forEach((d) => durations.add(d));
  });
  return Array.from(durations).sort((a, b) => a - b);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    return `${hours} hour${hours > 1 ? "s" : ""} ${mins} min`;
  }
  return `${minutes} min`;
}

export function calculatePackageSavings(
  originalPrice: number,
  discountedPrice: number
): { amount: number; percentage: number } {
  const amount = originalPrice - discountedPrice;
  const percentage = Math.round((amount / originalPrice) * 100);
  return { amount, percentage };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
