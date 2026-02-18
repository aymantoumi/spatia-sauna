"use client";

import { m } from "motion/react";
import { useCounter } from "@/hooks/useCounter";

interface AnimatedCounterProps {
  end: number;
  start?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  end,
  start = 0,
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [ref, count] = useCounter({ start, end, duration, decimals });

  return (
    <m.div ref={ref} className={className}>
      <m.span>
        {prefix}
        {count}
        {suffix}
      </m.span>
    </m.div>
  );
}
