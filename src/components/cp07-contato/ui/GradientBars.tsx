import React, { useMemo } from 'react';

interface GradientBarsProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  direction?: 'bottom' | 'top';
  className?: string;
  minHeight?: number;
}

export const GradientBars: React.FC<GradientBarsProps> = React.memo(({
  numBars = 15,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  animationDuration = 2,
  direction = 'bottom',
  className = '',
  minHeight = 30,
}) => {
  const isTop = direction === 'top';

  const bars = useMemo(() => {
    const maxHeight = 100;
    const center = 0.5;
    return Array.from({ length: numBars }, (_, index) => {
      const position = index / (numBars - 1 || 1);
      const distanceFromCenter = Math.abs(position - center);
      const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
      const height = minHeight + (maxHeight - minHeight) * heightPercentage;
      return {
        height,
        scale: height / 100,
        delay: `${index * 0.1}s`,
      };
    });
  }, [numBars, minHeight]);

  return (
    <>
      <style>{`
        @keyframes gradient-bars-pulse {
          0% { transform: scaleY(var(--initial-scale)); }
          100% { transform: scaleY(calc(var(--initial-scale) * 0.7)); }
        }
        @media (max-width: 640px) {
          .gradient-bars-pulse-item {
            animation: none !important;
          }
        }
      `}</style>
      
      <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
        <div 
          className="flex h-full w-full"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {bars.map((bar, index) => (
            <div
              key={index}
              className="gradient-bars-pulse-item"
              style={{
                flex: `0 0 calc(100% / ${numBars} + 2px)`,
                width: `calc(100% / ${numBars} + 2px)`,
                maxWidth: `calc(100% / ${numBars} + 2px)`,
                marginRight: '-2px',
                height: '100%',
                background: `linear-gradient(${isTop ? 'to bottom' : 'to top'}, ${gradientFrom}, ${gradientTo})`,
                transform: `scaleY(${bar.scale})`,
                transformOrigin: isTop ? 'top' : 'bottom',
                transition: 'transform 0.5s ease-in-out',
                animation: `gradient-bars-pulse ${animationDuration}s ease-in-out infinite alternate`,
                animationDelay: bar.delay,
                boxSizing: 'border-box',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                '--initial-scale': bar.scale,
              } as React.CSSProperties & { '--initial-scale': number }}
            />
          ))}
        </div>
      </div>
    </>
  );
});

GradientBars.displayName = 'GradientBars';

export default GradientBars;
