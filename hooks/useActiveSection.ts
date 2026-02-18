"use client";

import { useEffect, useState } from "react";

export function useActiveSection(offset = 100) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = document.querySelectorAll(
      "[data-section]"
    ) as NodeListOf<HTMLElement>;
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            window.history.pushState(null, "", `#${entry.target.id}`);
          }
        },
        { rootMargin: `-${offset}px 0px -66% 0px` }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [offset]);

  return active;
}