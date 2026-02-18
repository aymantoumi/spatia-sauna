"use client";

import { m } from "motion/react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ProgressBarProps {
  className?: string;
  height?: number;
  color?: string;
}

export default function ProgressBar({
  className = "",
  height = 3,
  color = "bg-accent",
}: ProgressBarProps) {
  const progress = useScrollProgress();

  return (
    <m.div
      className={`fixed top-16 left-0 right-0 z-40 ${color} ${className}`}
      style={{
        height: `${height}px`,
        scaleX: progress,
        transformOrigin: "left",
      }}
    />
  );
}
