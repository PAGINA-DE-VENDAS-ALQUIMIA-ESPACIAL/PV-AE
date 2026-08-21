import React from 'react';

interface GridBackgroundProps {
  isDark?: boolean;
  opacity?: number;
  gridSize?: number;
  className?: string;
}

export function GridBackground({
  isDark = false,
  opacity = 0.25,
  gridSize = 40,
  className = '',
}: GridBackgroundProps) {
  const patternId = React.useId().replace(/:/g, '') || 'orthogonal-grid';

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
      } ${className}`}
    >
      <div className="absolute inset-0" style={{ opacity }}>
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern
              id={patternId}
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke={isDark ? '#ffffff' : '#000000'}
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>
    </div>
  );
}

export default GridBackground;
