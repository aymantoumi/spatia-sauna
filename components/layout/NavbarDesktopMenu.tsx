"use client";

import { m, AnimatePresence } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import NavbarMegaMenu from "@/components/layout/NavbarMegaMenu";
import { navbarData, NavItem } from "@/lib/navbarData";
import { ChevronDown } from "lucide-react";

interface NavbarDesktopMenuProps {
  activeSection: string;
}

export default function NavbarDesktopMenu({ activeSection }: NavbarDesktopMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseEnter = (item: NavItem) => {
    if (item.submenu) {
      setOpenMenu(item.id);
    }
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  const handleClick = (item: NavItem) => {
    if (item.submenu) {
      setOpenMenu(openMenu === item.id ? null : item.id);
    } else {
      setOpenMenu(null);
    }
  };

  const isActive = (item: NavItem) => {
    if (item.id === "home" && activeSection === "home") return true;
    if (item.id === "services" && activeSection === "services") return true;
    if (item.id === "story" && activeSection === "story") return true;
    if (item.id === "contact" && activeSection === "contact") return true;
    return false;
  };

  return (
    <div className="flex items-center gap-8">
      {navbarData.primary.map((item) => {
        const hasSubmenu = !!item.submenu;
        const isOpen = openMenu === item.id;
        const active = isActive(item);

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            {hasSubmenu ? (
              <m.button
                onClick={() => handleClick(item)}
                className={`relative py-2 px-1 font-[var(--font-body)] font-medium text-sm transition-colors ${
                  active ? "text-primary" : "text-text-secondary hover:text-primary"
                }`}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-1">
                  {item.label}
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </m.span>
                </span>

                {active && (
                  <m.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="active-nav-indicator"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </m.button>
            ) : (
              <Link
                href={item.href}
                className={`relative py-2 px-1 font-[var(--font-body)] font-medium text-sm transition-colors ${
                  active ? "text-primary" : "text-text-secondary hover:text-primary"
                }`}
              >
                {item.label}
                {active && (
                  <m.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="active-nav-indicator"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            )}

            <AnimatePresence>
              {hasSubmenu && isOpen && item.submenu && (
                <NavbarMegaMenu items={item.submenu} />
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {navbarData.secondary.length > 0 && (
        <div className="flex items-center gap-6 ml-4 border-l border-border pl-6">
          {navbarData.secondary.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="font-[var(--font-body)] text-sm text-text-light hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
