"use client";

import { m, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useNavbarSearch } from "@/hooks/useNavbarSearch";
import { Search, X } from "lucide-react";
import { useReducedMotion } from "motion/react";

export default function NavbarSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, results, clearQuery } = useNavbarSearch();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    clearQuery();
  };

  return (
    <div className="relative">
      <m.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors"
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        title="Search (Cmd+K)"
      >
        <Search className="w-4 h-4 text-text-light" />
        <span className="hidden sm:inline text-text-light text-sm">Search</span>
        <kbd className="hidden md:inline text-xs text-text-light/60 bg-bg px-1.5 py-0.5 rounded">
          ⌘K
        </kbd>
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <m.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
              onClick={handleClose}
            />

            <m.div
              className="fixed top-[20%] left-1/2 z-50 w-full max-w-xl -translate-x-1/2 rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-text-light flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search services, pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-text-primary placeholder-text-light outline-none text-base"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={clearQuery}
                    className="p-1 hover:bg-bg rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-text-light" />
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={result.href}
                        onClick={handleClose}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-bg transition-colors"
                      >
                        <div>
                          <p className="font-medium text-text-primary">{result.title}</p>
                          <p className="text-sm text-text-light">{result.category}</p>
                        </div>
                        <Search className="w-4 h-4 text-text-light/40" />
                      </Link>
                    ))}
                  </div>
                ) : query ? (
                  <div className="text-center py-8 text-text-light">No results found</div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-light text-sm">Start typing to search...</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-2 bg-bg/50 border-t border-border text-xs text-text-light">
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px]">↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px]">Esc</kbd>
                  <span>Close</span>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
