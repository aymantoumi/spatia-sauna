"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";

export default function NavbarCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-3">
      <m.div
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href="/booking"
          className="px-5 py-2.5 bg-accent text-white font-semibold text-sm rounded-lg hover:bg-secondary transition-colors shadow-sm hover:shadow-md"
        >
          Book Now
        </Link>
      </m.div>
    </div>
  );
}
