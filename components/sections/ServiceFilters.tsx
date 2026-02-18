"use client";

import { cn } from "@/lib/utils";
import { FilterState, getDurationOptions } from "@/lib/serviceUtils";
import { categories } from "@/lib/servicesData";
import { useState, useEffect } from "react";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";

interface ServiceFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resultCount: number;
  totalCount: number;
}

export default function ServiceFilters({
  filters,
  setFilters,
  resultCount,
  totalCount,
}: ServiceFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);

  const durationOptions = getDurationOptions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: localSearch }));
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setFilters]);

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    setCategoryOpen(false);
  };

  const handleDurationToggle = (duration: string) => {
    setFilters((prev) => ({
      ...prev,
      duration: prev.duration.includes(duration)
        ? prev.duration.filter((d) => d !== duration)
        : [...prev.duration, duration],
    }));
  };

  const handlePriceChange = (value: number, index: 0 | 1) => {
    setFilters((prev) => {
      const newRange: [number, number] = [...prev.priceRange];
      newRange[index] = value;
      return { ...prev, priceRange: newRange };
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      priceRange: [0, 500],
      duration: [],
    });
    setLocalSearch("");
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500 ||
    filters.duration.length > 0;

  const currentCategory = categories.find((c) => c.value === filters.category);

  return (
    <div className="sticky top-20 z-30 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
            <input
              type="text"
              placeholder="Search services..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-full border border-border bg-bg text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
            {localSearch && (
              <button
                onClick={() => {
                  setLocalSearch("");
                  setFilters((prev) => ({ ...prev, search: "" }));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all",
                  filters.category !== "all"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-white text-text-primary hover:border-accent/50"
                )}
              >
                <span className="text-sm font-medium">
                  {currentCategory?.label || "Category"}
                </span>
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform", categoryOpen && "rotate-180")}
                />
              </button>

              {categoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-border shadow-lg overflow-hidden z-10">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-sm hover:bg-bg transition-colors flex items-center gap-2",
                        filters.category === category.value && "bg-accent/10 text-accent"
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {durationOptions.slice(0, 4).map((dur) => {
                const durStr = `${dur}`;
                const isActive = filters.duration.includes(durStr);
                return (
                  <button
                    key={dur}
                    onClick={() => handleDurationToggle(durStr)}
                    className={cn(
                      "px-3 py-2 rounded-full text-sm font-medium transition-all",
                      isActive
                        ? "bg-accent text-white"
                        : "border border-border bg-white text-text-secondary hover:border-accent/50"
                    )}
                  >
                    {dur} min
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-text-secondary">
              Showing{" "}
              <span className="font-semibold text-text-primary">{resultCount}</span>
              {""} of {""}
              <span className="font-semibold text-text-primary">{totalCount}</span> services
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-accent hover:text-secondary transition-colors font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-white hover:border-accent/50 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-primary">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-full hover:bg-bg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-3">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryChange(category.value)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all",
                          filters.category === category.value
                            ? "bg-accent text-white"
                            : "border border-border bg-white text-text-secondary"
                        )}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-3">Duration</h4>
                  <div className="flex flex-wrap gap-2">
                    {durationOptions.map((dur) => {
                      const durStr = `${dur}`;
                      const isActive = filters.duration.includes(durStr);
                      return (
                        <button
                          key={dur}
                          onClick={() => handleDurationToggle(durStr)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all",
                            isActive
                              ? "bg-accent text-white"
                              : "border border-border bg-white text-text-secondary"
                          )}
                        >
                          {dur} min
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-3">
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min={0}
                      max={500}
                      step={25}
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(parseInt(e.target.value), 0)}
                      className="w-full accent-accent"
                    />
                    <input
                      type="range"
                      min={0}
                      max={500}
                      step={25}
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(parseInt(e.target.value), 1)}
                      className="w-full accent-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-full border border-border text-text-primary font-medium hover:bg-bg transition-colors"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 rounded-full bg-accent text-white font-medium hover:bg-secondary transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
