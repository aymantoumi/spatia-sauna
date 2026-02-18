"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewportOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewportOptions = {}
): [React.RefObject<T | null>, boolean] {
  const {
    threshold = 0.2,
    rootMargin = "0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasTriggered(true);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  const shouldAnimate = triggerOnce ? hasTriggered : isInView;

  return [ref, shouldAnimate];
}
