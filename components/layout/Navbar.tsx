"use client";

import { m, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import NavbarBackground from "@/components/layout/NavbarBackground";
import NavbarLogo from "@/components/layout/NavbarLogo";
import NavbarDesktopMenu from "@/components/layout/NavbarDesktopMenu";
import NavbarMobileMenu from "@/components/layout/NavbarMobileMenu";
import NavbarSearch from "@/components/layout/NavbarSearch";
import NavbarCTA from "@/components/layout/NavbarCTA";
import NavbarAccessibility from "@/components/layout/NavbarAccessibility";
import { useNavbar } from "@/hooks/useNavbar";
import { useActiveNavItem } from "@/hooks/useActiveNavItem";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { isScrolled, isMobileMenuOpen, setIsMobileMenuOpen } = useNavbar();
  const activeSection = useActiveNavItem();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <NavbarAccessibility />

      <m.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <NavbarBackground isScrolled={isScrolled} />

        <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-3 md:py-4 flex items-center justify-between max-w-7xl mx-auto">
          <NavbarLogo />

          <div className="hidden lg:flex items-center justify-center flex-1">
            <NavbarDesktopMenu activeSection={activeSection} />
          </div>

          <div className="flex items-center gap-3 md:gap-4 ml-auto lg:ml-0">
            <div className="hidden md:block">
              <NavbarSearch />
            </div>

            <div className="hidden sm:block">
              <NavbarCTA />
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-primary hover:bg-bg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <NavbarMobileMenu
              activeSection={activeSection}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </m.nav>

      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}
