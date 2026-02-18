"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { preventBodyScroll } from "@/lib/navbarUtils";

export function useNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { scrollY: motionScrollY } = useScroll();

  useMotionValueEvent(motionScrollY, "change", (latest) => {
    setScrollY(latest);
    setIsScrolled(latest > 80);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    preventBodyScroll(isMobileMenuOpen);
    return () => preventBodyScroll(false);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return {
    scrollY,
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  };
}
