export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const;

export const container = {
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
} as const;

export const radius = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 84, 97, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 84, 97, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 84, 97, 0.15)',
} as const;

export const glow = {
  soft: '0 0 20px rgba(0, 183, 181, 0.15)',
  medium: '0 0 30px rgba(0, 183, 181, 0.25)',
  strong: '0 0 40px rgba(0, 183, 181, 0.35)',
} as const;

export function getSpacingVar(value: keyof typeof spacing): string {
  return `var(--spacing-${value})`;
}

export function getContainerVar(size: keyof typeof container): string {
  return `var(--container-${size})`;
}

export function getRadiusVar(value: keyof typeof radius): string {
  return `var(--radius-${value})`;
}

export function getShadowVar(value: keyof typeof shadows): string {
  return `var(--shadow-${value})`;
}
