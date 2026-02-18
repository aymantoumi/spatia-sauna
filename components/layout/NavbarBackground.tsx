"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";

interface NavbarBackgroundProps {
  isScrolled: boolean;
}

export default function NavbarBackground({ isScrolled }: NavbarBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <m.div
        className="absolute inset-0"
        initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <m.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ backgroundColor: "rgba(224, 224, 224, 0)" }}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(224, 224, 224, 1)"
            : "rgba(224, 224, 224, 0)",
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
      />

      <m.div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.03), transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      />
    </>
  );
}
