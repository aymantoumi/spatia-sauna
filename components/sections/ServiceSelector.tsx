"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Search, X, Check, Clock, Star, ArrowRight, ChevronDown, ChevronUp, Heart, Zap, Sparkles, Flame, Droplets, HeartHandshake } from "lucide-react";
import { spaContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  HeartHandshake,
};

const categoryColors: Record<string, { bg: string; accent: string; border: string }> = {
  Massage: { bg: "from-primary/10 to-primary/5", accent: "text-primary", border: "border-primary/20" },
  Facials: { bg: "from-accent-warm/10 to-accent-warm/5", accent: "text-accent-warm", border: "border-accent-warm/20" },
  Wellness: { bg: "from-accent/10 to-accent/5", accent: "text-accent", border: "border-accent/20" },
  Packages: { bg: "from-gold/10 to-gold/5", accent: "text-gold", border: "border-gold/20" },
};

const categories = spaContent.categories;

interface ServiceSelectorProps {
  selectedServiceId: string | null;
  selectedDuration: number | null;
  onSelectService: (service: (typeof spaContent.services)[0], duration: number) => void;
}

function BookingServiceRow({
  service,
  isSelected,
  selectedDuration,
  onSelect,
  index,
}: {
  service: (typeof spaContent.services)[0];
  isSelected: boolean;
  selectedDuration?: number;
  onSelect: (service: (typeof spaContent.services)[0], duration: number) => void;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localDuration, setLocalDuration] = useState<number>(
    selectedDuration || service.duration[0]
  );
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = iconMap[service.icon] || Heart;
  const colors = categoryColors[service.category] || categoryColors.Massage;

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
      viewport={{ once: true, amount: 0.1 }}
      variants={shouldReduceMotion ? {} : fadeUp}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <m.div
        animate={shouldReduceMotion ? {} : {
          scale: isSelected ? 1.01 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative rounded-3xl overflow-hidden",
          "bg-gradient-to-br backdrop-blur-sm",
          colors.bg,
          "border-2",
          isSelected ? "border-accent shadow-2xl" : "border-white/50 hover:border-accent/30 shadow-lg hover:shadow-xl",
          "transition-all duration-500"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />

        {isSelected && (
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg"
          >
            <Check className="w-5 h-5" />
          </m.div>
        )}

        <div className="relative flex flex-col lg:flex-row">
          <div className="relative lg:w-64 xl:w-72 flex-shrink-0">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[180px] overflow-hidden bg-gradient-to-br from-white/50 to-white/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10 z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <m.div
                  animate={shouldReduceMotion ? {} : {
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <IconComponent className={cn("w-10 h-10", colors.accent)} />
                </m.div>
              </div>

              <div className="absolute top-4 left-4 z-20">
                <span className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold",
                  "bg-white/80 backdrop-blur-sm shadow-sm",
                  colors.accent
                )}>
                  {service.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 lg:hidden">
                <h3 className="font-[var(--font-display)] text-lg font-bold text-primary">
                  {service.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 lg:p-8">
            <div className="flex flex-col h-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="hidden lg:block font-[var(--font-display)] text-2xl font-bold text-primary mb-1">
                    {service.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed lg:max-w-xl">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:text-right">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-medium text-text-primary">4.9</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-text-light">From</span>
                    <p className="text-2xl font-bold text-primary">${service.startingPrice}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration:</span>
                </div>
                {service.durationLabels.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1 rounded-full bg-white/60 text-text-secondary text-xs font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.benefits.slice(0, 3).map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/60 text-text-secondary text-xs"
                  >
                    <Check className="w-3 h-3 text-success" />
                    {benefit}
                  </span>
                ))}
                {service.benefits.length > 3 && (
                  <span className="px-3 py-1 rounded-full bg-white/40 text-text-light text-xs">
                    +{service.benefits.length - 3} more
                  </span>
                )}
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/50 mb-4">
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {service.fullDesc}
                      </p>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-primary mb-3">Select Duration</p>
                        <div className="flex flex-wrap gap-2">
                          {service.duration.map((d) => (
                            <button
                              key={d}
                              onClick={() => setLocalDuration(d)}
                              className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                localDuration === d
                                  ? "bg-accent text-white shadow-md"
                                  : "bg-white/60 text-text-secondary hover:bg-white hover:shadow"
                              )}
                            >
                              {d} min - ${(service.pricing as unknown as Record<string, number>)[d.toString()]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/50">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex gap-3 sm:ml-auto items-center">
                  {isSelected && (
                    <div className="hidden sm:block">
                      <span className="text-sm text-text-light">{localDuration} min</span>
                      <p className="text-xl font-bold text-primary">${price}</p>
                    </div>
                  )}
                  <m.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    onClick={handleSelect}
                    className={cn(
                      "flex-1 sm:flex-initial py-2.5 px-6 rounded-full font-medium shadow-lg flex items-center justify-center gap-2 transition-all",
                      isSelected
                        ? "bg-success text-white"
                        : "bg-accent text-white shadow-accent/25"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-5 h-5" />
                        Selected
                      </>
                    ) : (
                      <>
                        Select Service
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </m.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent-warm origin-left"
        />
      </m.div>
    </m.div>
  );
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
    <section id="select-service" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-bg to-white/50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <m.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            Choose Your Experience
          </m.span>
          
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Select Your Service
          </h2>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Browse our curated wellness experiences and choose the treatment that suits your needs.
          </p>

          <m.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-accent via-primary to-accent-warm mx-auto mt-6 rounded-full"
          />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent shadow-lg text-text-primary placeholder:text-text-light"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category, index) => (
              <m.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-5 py-3 rounded-full text-sm font-medium transition-all shadow-sm",
                  selectedCategory === category
                    ? "bg-accent text-white shadow-lg shadow-accent/25"
                    : "bg-white/60 backdrop-blur-sm border border-white/50 text-text-secondary hover:bg-white hover:shadow"
                )}
              >
                {category}
              </m.button>
            ))}
          </div>
        </m.div>

        {filteredServices.length === 0 ? (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-accent" />
            </div>
            <p className="text-xl font-semibold text-primary mb-2">No services found</p>
            <p className="text-text-secondary mb-4">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-accent font-medium hover:text-primary transition-colors"
            >
              Clear all filters
            </button>
          </m.div>
        ) : (
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={shouldReduceMotion ? {} : staggerContainer}
            className="flex flex-col gap-6"
          >
            {filteredServices.map((service, index) => (
              <BookingServiceRow
                key={service.id}
                service={service}
                isSelected={selectedServiceId === service.id}
                selectedDuration={selectedDuration || undefined}
                onSelect={onSelectService}
                index={index}
              />
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
}