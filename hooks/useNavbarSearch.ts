"use client";

import { useState, useMemo, useCallback } from "react";
import { searchSuggestions } from "@/lib/navbarData";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  href: string;
}

export function useNavbarSearch(initialQuery: string = "") {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    return searchSuggestions.filter(
      (item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery)
    ) as SearchResult[];
  }, [query]);

  const clearQuery = useCallback(() => {
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    results,
    clearQuery,
  };
}
