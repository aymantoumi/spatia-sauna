'use client';

import { m } from 'motion/react';

export function LogoType() {
  return (
    <m.div whileHover={{ scale: 1.02 }}>
      <span className="font-[var(--font-display)] text-2xl font-bold text-primary tracking-wide">
        SPATIA SAUNA
      </span>
    </m.div>
  );
}

export function LogoMark() {
  return (
    <m.div
      whileHover={{ scale: 1.05 }}
      className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-md"
    >
      <span className="font-[var(--font-display)] font-bold text-white text-lg">S</span>
    </m.div>
  );
}

export function LogoHorizontal() {
  return (
    <div className="flex items-center gap-3">
      <LogoMark />
      <div>
        <div className="font-[var(--font-display)] font-bold text-primary text-lg">SPATIA</div>
        <div className="font-[var(--font-body)] text-xs text-text-light uppercase tracking-wider">
          Sauna
        </div>
      </div>
    </div>
  );
}

export function LogoVertical() {
  return (
    <div className="flex flex-col items-center gap-2">
      <LogoMark />
      <div className="text-center">
        <div className="font-[var(--font-display)] font-bold text-primary">SPATIA</div>
        <div className="font-[var(--font-body)] text-xs text-text-light uppercase">Sauna</div>
      </div>
    </div>
  );
}

interface LogoProps {
  variant?: 'type' | 'mark' | 'horizontal' | 'vertical';
  className?: string;
}

export default function Logo({ variant = 'horizontal', className = '' }: LogoProps) {
  const variants = {
    type: <LogoType />,
    mark: <LogoMark />,
    horizontal: <LogoHorizontal />,
    vertical: <LogoVertical />,
  };

  return <div className={className}>{variants[variant]}</div>;
}