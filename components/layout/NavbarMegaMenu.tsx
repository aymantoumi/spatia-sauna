"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { NavSubmenuSection } from "@/lib/navbarData";
import { ChevronRight } from "lucide-react";

interface NavbarMegaMenuProps {
  items: NavSubmenuSection[];
}

export default function NavbarMegaMenu({ items }: NavbarMegaMenuProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden min-w-[600px]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
    >
      <div className="grid grid-cols-3 gap-6 p-6">
        {items.map((section) => (
          <div key={section.id}>
            <h3 className="font-[var(--font-display)] text-base font-semibold text-primary mb-3">
              {section.title}
            </h3>

            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group block py-1.5 text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                    {link.description && (
                      <p className="text-xs text-text-light mt-0.5">{link.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {section.featured && (
              <m.div
                className="mt-3 pt-3 border-t border-border"
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
              >
                <Link
                  href={section.featured.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-secondary transition-colors"
                >
                  {section.featured.label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </m.div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 border-t border-border">
        <Link
          href="/services"
          className="flex items-center justify-between group"
        >
          <div>
            <span className="text-xs uppercase tracking-wider text-accent font-semibold">
              Explore All
            </span>
            <p className="text-sm text-text-secondary mt-0.5">
              View our complete wellness menu
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </m.div>
  );
}
