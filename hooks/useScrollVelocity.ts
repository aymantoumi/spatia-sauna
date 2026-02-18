"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();

      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTimestamp - lastTimestamp.current;

      if (deltaTime > 0) {
        const currentVelocity = deltaY / deltaTime;
        setVelocity(currentVelocity);
      }

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTimestamp;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return velocity;
}

export function useIsScrolling(threshold = 0.5) {
  const velocity = useScrollVelocity();
  return Math.abs(velocity) > threshold;
}
