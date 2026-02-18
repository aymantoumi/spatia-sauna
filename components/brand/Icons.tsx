import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Icons = {
  spa: ({ size = 24, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 2v20M2 12h20" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 8l8 8M16 8l-8 8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  zen: ({ size = 24, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M8 14c0-2.21 1.79-4 4-4s4 1.79 4 4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  leaf: ({ size = 24, ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} {...props}>
      <path d="M12 2c-1 0-2 .5-2.5 1.5C8 5 8 8 12 14c4-6 4-9 2.5-10.5C14 2.5 13 2 12 2" />
    </svg>
  ),

  water: ({ size = 24, ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} {...props}>
      <path d="M12 2c0 0 0 2 0 4c0 2-1 4-2 6c-1 2-2 2-2 4c0 2 1 4 2 4c1 0 2-2 2-4c0 2 1 2 2 4c1 0 2-2 2-4c-1-2-2-4-2-6c0-2 0-4 0-4" />
    </svg>
  ),

  lotus: ({ size = 24, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <path
        d="M12 22c0 0-6-4-6-10c0-4 6-8 6-8c0 0 6 4 6 8c0 6-6 10-6 10z"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 4v18" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  flame: ({ size = 24, ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} {...props}>
      <path d="M12 2c-2 2-4 4-4 8c0 4 2 6 4 8c2-2 4-4 4-8c0-4-2-6-4-8z" />
    </svg>
  ),

  sauna: ({ size = 24, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <rect x="3" y="8" width="18" height="14" rx="2" strokeWidth="2" />
      <path d="M7 4l5 4 5-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14h.01M12 14h.01M16 14h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  stone: ({ size = 24, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <ellipse cx="12" cy="16" rx="8" ry="4" strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="6" ry="3" strokeWidth="2" />
      <ellipse cx="12" cy="9" rx="4" ry="2" strokeWidth="2" />
    </svg>
  ),

  candle: ({ size = 24, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <rect x="9" y="10" width="6" height="12" rx="1" strokeWidth="2" />
      <path d="M12 6c0-1 1-2 1-3c0 1 1 2 1 3c0 1-1 2-1 2c0 0-1-1-1-2z" fill="currentColor" />
    </svg>
  ),

  mandala: ({ size = 24, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" strokeWidth="1" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export type IconType = keyof typeof Icons;

interface WellnessIconProps extends SVGProps<SVGSVGElement> {
  type: IconType;
  size?: number;
}

export function WellnessIcon({ type, size = 24, ...props }: WellnessIconProps) {
  const IconComponent = Icons[type];
  return IconComponent ? <IconComponent size={size} {...props} /> : null;
}

export default Icons;