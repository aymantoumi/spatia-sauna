"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

export function useActiveNavItem() {
  const pathname = usePathname();

  const initialSection = useMemo(() => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/services")) return "services";
    if (pathname.startsWith("/story")) return "story";
    return "";
  }, [pathname]);

  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    if (pathname === "/") {
      const sections = document.querySelectorAll("[data-section]") as NodeListOf<HTMLElement>;
      const observers: IntersectionObserver[] = [];

      sections.forEach((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          },
          { rootMargin: "-50% 0px -50% 0px" }
        );
        observer.observe(section);
        observers.push(observer);
      });

      return () => observers.forEach((o) => o.disconnect());
    }
  }, [pathname]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveSection(initialSection);
    }, 0);
    return () => clearTimeout(timeout);
  }, [initialSection]);

  return activeSection;
}
