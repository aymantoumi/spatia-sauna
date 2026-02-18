'use client';

import { m } from 'motion/react';
import { useReducedMotion } from 'motion/react';

export function WaterRipple() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
      {[0, 1, 2, 3].map((i) => (
        <m.circle
          key={i}
          cx="100"
          cy="100"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary opacity-30"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  r: [20, 80],
                  opacity: [0.8, 0],
                }
          }
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}
    </m.svg>
  );
}

export function BotanicalLeaf() {
  return (
    <m.svg
      width="150"
      height="200"
      viewBox="0 0 150 200"
      className="mx-auto text-primary opacity-20"
    >
      <path
        d="M 75 20 Q 60 50 65 100 Q 70 140 75 180 Q 80 140 85 100 Q 90 50 75 20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="75"
        y1="20"
        x2="75"
        y2="180"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M 65 50 Q 70 60 75 70"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 85 50 Q 80 60 75 70"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </m.svg>
  );
}

export function GeometricAccent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      className="text-accent"
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="40"
        cy="40"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle
        cx="40"
        cy="40"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="40" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    </m.svg>
  );
}

export function DecorativeOrb({ size = 96, color = 'primary' }: { size?: number; color?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const colorMap: Record<string, string> = {
    primary: 'radial-gradient(circle, #1E93AB 0%, transparent 70%)',
    accent: 'radial-gradient(circle, #E62727 0%, transparent 70%)',
    bg: 'radial-gradient(circle, #F3F2EC 0%, transparent 70%)',
  };

  return (
    <m.div
      className={`rounded-full opacity-20`}
      style={{
        width: size,
        height: size,
        background: colorMap[color] || colorMap.primary,
      }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }
      }
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function WaveDivider() {
  return (
    <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
        fill="currentColor"
        opacity="0.1"
      />
    </svg>
  );
}

export function ZenCircle({ size = 120 }: { size?: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className="text-primary"
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="60"
        cy="60"
        r="55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="345"
        strokeDashoffset="85"
        opacity="0.3"
      />
    </m.svg>
  );
}

export function AccentLine() {
  return (
    <m.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-px w-24 bg-accent origin-left"
    />
  );
}

export function GlowEffect({ variant = 'primary' }: { variant?: 'primary' | 'accent' }) {
  const colors = {
    primary: 'rgba(30, 147, 171, 0.15)',
    accent: 'rgba(230, 39, 39, 0.15)',
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(circle at center, ${colors[variant]} 0%, transparent 70%)`,
      }}
    />
  );
}