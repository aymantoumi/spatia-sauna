"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return progress;
}

export function useElementScrollProgress(elementId: string) {
  const [progress, setProgress] = useState(0);

  if (typeof window === "undefined") return progress;

  const handleScroll = () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight;
    const progressValue = 1 - elementBottom / (viewportHeight + rect.height);
    setProgress(Math.max(0, Math.min(1, progressValue)));
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  return progress;
}
