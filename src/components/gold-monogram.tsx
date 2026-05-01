"use client";

export default function GoldMonogram({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300 hover:drop-shadow-[0_0_14px_rgba(74,144,217,0.5)]"
    >
      <defs>
        {/* Single blue gradient — reads as ONE color */}
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#4A90D9" />
        </linearGradient>

        {/* Subtle glow */}
        <filter id="lg" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow C */}
      <path
        d="M 136 48 A 64 64 0 1 0 136 152"
        stroke="#1E3A5F"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
        transform="translate(1.5, 1.5)"
      />

      {/* Main C — perfect circular arc */}
      <path
        d="M 136 48 A 64 64 0 1 0 136 152"
        stroke="url(#logo-grad)"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
        filter="url(#lg)"
      />

      {/* Growth line — ZIGZAG ending at arrowhead base */}
      {/* Line goes: bottom-left → up → slight dip → sharp rise to arrow tip area */}
      <path
        d="M 42 158 L 78 118 L 114 136 L 144 68"
        stroke="url(#logo-grad)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#lg)"
      />

      {/* Arrowhead — classic filled triangle pointing UP-RIGHT, aligned with last line segment */}
      {/* Last segment direction: from (114,136) to (144,68) → going up-right at ~65° angle */}
      {/* Arrow tip at (162, 42), with two base points perpendicular to the line direction */}
      {/* Direction vector: (30, -68), normalized ≈ (0.4, -0.92) */}
      {/* Perpendicular: (0.92, 0.4) — used to offset the base points */}
      {/* Base center: (148, 66) — slightly before tip */}
      <polygon
        points="162,42 136,58 148,80"
        fill="url(#logo-grad)"
        filter="url(#lg)"
      />

      {/* Data point 1 */}
      <circle cx="42" cy="158" r="5" fill="#4A90D9" />
      <circle cx="42" cy="158" r="2" fill="#7DD3FC" opacity="0.5" />

      {/* Data point 2 */}
      <circle cx="78" cy="118" r="5" fill="#4A90D9" />
      <circle cx="78" cy="118" r="2" fill="#7DD3FC" opacity="0.5" />

      {/* Data point 3 */}
      <circle cx="114" cy="136" r="5" fill="#4A90D9" />
      <circle cx="114" cy="136" r="2" fill="#7DD3FC" opacity="0.5" />
    </svg>
  );
}
