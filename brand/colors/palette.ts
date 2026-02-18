export const colors = {
  primary: {
    50: '#E8F4F7',
    100: '#C9E6EF',
    200: '#A3D4E3',
    300: '#7DC2D7',
    400: '#57B0CB',
    500: '#1E93AB',
    600: '#188399',
    700: '#127387',
    800: '#0C6375',
    900: '#084A56',
  },
  accent: {
    50: '#FDE8E8',
    100: '#FBC7C7',
    200: '#F8A4A4',
    300: '#F58181',
    400: '#F25E5E',
    500: '#E62727',
    600: '#D41F1F',
    700: '#C21717',
    800: '#B00F0F',
    900: '#8B0B0B',
  },
  bg: {
    50: '#FEFDFB',
    100: '#FBF9F4',
    200: '#F9F7F2',
    300: '#F7F5F0',
    400: '#F5F3EE',
    500: '#F3F2EC',
    600: '#F1F0EA',
    700: '#EFEFEA',
    800: '#EDEDE8',
    900: '#E3E2DB',
  },
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#DCDCDC',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    tertiary: '#757575',
    light: '#999999',
    white: '#FFFFFF',
  },
  extended: {
    forestDark: '#2C5F47',
    forestLight: '#6BA87C',
    sand: '#D4C4B0',
    water: '#4A9FB5',
    stone: '#8A8A8A',
    copper: '#B85C38',
    sage: '#A8B5A4',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

export type ColorShade = keyof typeof colors.primary;
export type ColorFamily = keyof typeof colors;

export function getColorVar(family: ColorFamily, shade?: number): string {
  if (shade === undefined) {
    return `var(--color-${family})`;
  }
  return `var(--${family}-${shade})`;
}

export function getCssVar(name: string): string {
  return `var(--${name})`;
}

export const gradients = {
  primary: 'linear-gradient(135deg, #1E93AB 0%, #188399 100%)',
  accent: 'linear-gradient(135deg, #E62727 0%, #D41F1F 100%)',
  hero: 'linear-gradient(180deg, #E8F4F7 0%, #F3F2EC 100%)',
  glow: 'radial-gradient(circle, #1E93AB 0%, transparent 70%)',
  accentGlow: 'radial-gradient(circle, #E62727 0%, transparent 70%)',
} as const;
