"use client";

import { useEffect, useState, useRef } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  triggerOnce?: boolean;
}

export function useCounter(options: UseCounterOptions) {
  const {
    start = 0,
    end,
    duration = 2000,
    decimals = 0,
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          setHasAnimated(true);
          
          let animationFrameId: number;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentCount = start + (end - start) * progress;
            setCount(parseFloat(currentCount.toFixed(decimals)));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [start, end, duration, decimals, triggerOnce, hasAnimated]);

  return [ref, count] as const;
}
