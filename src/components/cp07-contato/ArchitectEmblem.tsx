import React from 'react';

interface ArchitectEmblemProps {
  className?: string;
  fill?: string;
}

/**
 * Recreates the exact 4-petal architectural crest emblem from the reference image.
 * Uses 4-fold rotational symmetry around the center (250, 250).
 */
export const ArchitectEmblem: React.FC<ArchitectEmblemProps> = ({
  className = "w-full h-full text-white",
  fill = "currentColor",
}) => {
  // Master petal path (Top-Left quadrant petal)
  // Top tip at (246, 24), Left tip at (72, 246), Center notch at (236, 236)
  const masterPetalPath = "M 246 24 C 150 24 72 105 72 246 C 110 246 185 244 236 236 C 244 185 246 110 246 24 Z";

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill={fill}>
        {/* Top-Left Petal */}
        <path d={masterPetalPath} />
        
        {/* Top-Right Petal (Rotated 90deg) */}
        <path d={masterPetalPath} transform="rotate(90 250 250)" />

        {/* Bottom-Right Petal (Rotated 180deg) */}
        <path d={masterPetalPath} transform="rotate(180 250 250)" />

        {/* Bottom-Left Petal (Rotated 270deg) */}
        <path d={masterPetalPath} transform="rotate(270 250 250)" />
      </g>
    </svg>
  );
};

