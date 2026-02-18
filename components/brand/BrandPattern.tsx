export function PatternDots({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#dots)" />
    </svg>
  );
}

export function PatternGrid({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  );
}

export function PatternWaves({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
        fill="currentColor"
        opacity="0.1"
      />
    </svg>
  );
}

export function PatternDiagonal({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="diagonal"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#diagonal)" />
    </svg>
  );
}

export function PatternCircles({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="circles"
          x="0"
          y="0"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="15" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#circles)" />
    </svg>
  );
}

interface BrandPatternProps {
  type: 'dots' | 'grid' | 'waves' | 'diagonal' | 'circles';
  className?: string;
}

export default function BrandPattern({ type, className = '' }: BrandPatternProps) {
  const patterns = {
    dots: <PatternDots className={className} />,
    grid: <PatternGrid className={className} />,
    waves: <PatternWaves className={className} />,
    diagonal: <PatternDiagonal className={className} />,
    circles: <PatternCircles className={className} />,
  };

  return patterns[type];
}