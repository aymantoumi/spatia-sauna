"use client";

import { m } from "motion/react";

interface SkeletonProps {
  width?: string;
  height?: string;
  count?: number;
  className?: string;
}

export default function Skeleton({
  width = "w-full",
  height = "h-6",
  count = 1,
  className = "",
}: SkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <m.div
          key={i}
          className={`${width} ${height} bg-gradient-to-r from-surface via-bg to-surface rounded-lg`}
          animate={{
            backgroundPosition: ["-1000px 0", "1000px 0"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "1000px 100%",
          }}
        />
      ))}
    </div>
  );
}
