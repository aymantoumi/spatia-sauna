"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "motion/react";

interface UseParallaxOptions {
  strength?: number;
  direction?: "up" | "down";
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { strength = 0.5, direction = "up" } = options;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const onScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      const distance = viewportCenter - elementCenter;
      const parallaxValue = distance * strength * (direction === "up" ? -1 : 1);

      ref.current.style.transform = `translateY(${parallaxValue}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength, direction]);

  return ref;
}

export function useParallaxMotion(strength = 0.5) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (latest) => latest * strength);
  return y;
}
