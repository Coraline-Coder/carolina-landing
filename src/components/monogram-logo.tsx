"use client";

export default function MonogramLogo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(0,242,255,0.5)]"
    >
      <defs>
        {/* Satin metallic gradient */}
        <linearGradient id="satinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.9" />
          <stop offset="25%" stopColor="#00c8cc" stopOpacity="1" />
          <stop offset="50%" stopColor="#00f2ff" stopOpacity="1" />
          <stop offset="75%" stopColor="#0088aa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00f2ff" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="arrowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00f2ff" stopOpacity="1" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke="url(#satinGradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />

      {/* Letter C - elegant serif style */}
      <path
        d="M 78 35 C 72 28, 60 24, 50 28 C 38 33, 30 45, 30 60 C 30 75, 38 87, 50 92 C 60 96, 72 92, 78 85"
        stroke="url(#satinGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />

      {/* Serif endpoints on C */}
      <line x1="75" y1="33" x2="82" y2="36" stroke="url(#satinGradient)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
      <line x1="75" y1="87" x2="82" y2="84" stroke="url(#satinGradient)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />

      {/* Trend arrow cutting through C - upward diagonal */}
      <path
        d="M 38 82 L 82 38"
        stroke="url(#arrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      {/* Arrow head */}
      <path
        d="M 82 38 L 70 38 M 82 38 L 82 50"
        stroke="url(#arrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {/* Small accent dots at data points */}
      <circle cx="50" cy="70" r="2.5" fill="#00f2ff" opacity="0.6" filter="url(#glow)" />
      <circle cx="60" cy="58" r="2.5" fill="#00f2ff" opacity="0.7" filter="url(#glow)" />
      <circle cx="70" cy="48" r="2.5" fill="#00f2ff" opacity="0.8" filter="url(#glow)" />
    </svg>
  );
}
