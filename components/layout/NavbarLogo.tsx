"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";

export default function NavbarLogo() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link href="/" className="relative z-10">
      <m.div
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-lg shadow-sm">
          S
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-[var(--font-display)] font-bold text-lg text-primary tracking-wide">
            SPATIA
          </span>
          <span className="font-[var(--font-body)] text-xs text-text-light uppercase tracking-widest">
            Sauna
          </span>
        </div>
      </m.div>
    </Link>
  );
}
