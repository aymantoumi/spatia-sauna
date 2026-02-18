"use client";

import { m, AnimatePresence } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { navbarData } from "@/lib/navbarData";
import { ChevronDown } from "lucide-react";

interface NavbarMobileMenuProps {
  activeSection: string;
  onClose: () => void;
}

export default function NavbarMobileMenu({
  activeSection,
  onClose,
}: NavbarMobileMenuProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isActive = (itemId: string) => {
    return activeSection === itemId;
  };

  return (
    <m.div
      className="fixed inset-0 top-16 bg-surface/98 backdrop-blur-md lg:hidden overflow-y-auto z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
    >
      <div className="px-6 py-6 space-y-1">
        {navbarData.primary.map((item, index) => {
          const isExpanded = expandedMenu === item.id;
          const hasSubmenu = !!item.submenu;
          const active = isActive(item.id);

          return (
            <m.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : index * 0.05,
                duration: shouldReduceMotion ? 0 : 0.2,
              }}
            >
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => setExpandedMenu(isExpanded ? null : item.id)}
                    className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl font-medium transition-colors ${
                      active
                        ? "bg-accent/10 text-primary"
                        : "text-text-primary hover:bg-bg"
                    }`}
                  >
                    <span>{item.label}</span>
                    <m.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-text-light" />
                    </m.span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && item.submenu && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 pl-4 border-l-2 border-accent/20 space-y-1 mt-2">
                          {item.submenu.map((section) => (
                            <div key={section.id} className="py-2">
                              <p className="text-xs uppercase tracking-wider text-text-light font-semibold mb-2">
                                {section.title}
                              </p>
                              {section.links.map((link) => (
                                <Link
                                  key={link.id}
                                  href={link.href}
                                  onClick={onClose}
                                  className="block py-2 text-text-secondary hover:text-primary transition-colors"
                                >
                                  {link.label}
                                </Link>
                              ))}
                              {section.featured && (
                                <Link
                                  href={section.featured.href}
                                  onClick={onClose}
                                  className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-accent"
                                >
                                  {section.featured.label}
                                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block py-3.5 px-4 rounded-xl font-medium transition-colors ${
                    active
                      ? "bg-accent/10 text-primary"
                      : "text-text-primary hover:bg-bg"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </m.div>
          );
        })}

        <div className="my-4 h-px bg-border" />

        {navbarData.secondary.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={onClose}
            className="block py-3 px-4 text-text-secondary hover:text-primary transition-colors rounded-xl hover:bg-bg"
          >
            {item.label}
          </Link>
        ))}

        <div className="pt-6 mt-4 border-t border-border">
          <Link
            href="/booking"
            onClick={onClose}
            className="block w-full py-3.5 px-4 bg-accent text-white text-center font-semibold rounded-xl hover:bg-secondary transition-colors"
          >
            Book Your Session
          </Link>
        </div>
      </div>
    </m.div>
  );
}
