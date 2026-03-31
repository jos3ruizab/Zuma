'use client';

import { useEffect, useState } from 'react';

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
}

const AnimatedLogo = ({ onAnimationComplete }: AnimatedLogoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGeometric, setShowGeometric] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setIsVisible(true), 300);
    const geometricTimer = setTimeout(() => setShowGeometric(true), 1000);
    const completeTimer = setTimeout(() => {
      onAnimationComplete?.();
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(geometricTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Geometric Background Elements */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showGeometric ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 left-1/4 w-16 h-16 border-2 border-primary/30 rotate-45 animation-pulse-subtle" />
        <div className="absolute bottom-0 right-1/4 w-20 h-20 border-2 border-accent/30 rotate-12 animation-pulse-subtle" />
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-primary/10 rounded-full animation-pulse-subtle" />
      </div>

      {/* Main Logo */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="flex flex-col items-center">
          <svg
            width="180"
            height="220"
            viewBox="0 0 200 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
            aria-label="ZUMA logo"
          >
            {/* ── Crown: left small triangle ── */}
            <polygon
              points="57,90 73,57 89,90"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
            />
            {/* ── Crown: center tall triangle with dot ── */}
            <polygon
              points="76,90 100,36 124,90"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="66" r="6.5" stroke="#C8A96E" strokeWidth="2.8" fill="none" />
            {/* ── Crown: right small triangle ── */}
            <polygon
              points="111,90 127,57 143,90"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
            />

            {/* ── Crown base horizontal bar ── */}
            <line
              x1="44"
              y1="90"
              x2="156"
              y2="90"
              stroke="#C8A96E"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* ── Face left bracket: outer vertical → step inward ── */}
            <polyline
              points="44,90 44,108 62,108 62,168"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* ── Face right bracket: outer vertical → step inward ── */}
            <polyline
              points="156,90 156,108 138,108 138,168"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* ── Upper face: inverted triangle (crown diamond tip) ── */}
            <polygon
              points="84,90 100,116 116,90"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
            />

            {/* ── Mid-face horizontal bar ── */}
            <line
              x1="62"
              y1="116"
              x2="138"
              y2="116"
              stroke="#C8A96E"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* ── Left eye ── */}
            <circle cx="79" cy="138" r="10" stroke="#C8A96E" strokeWidth="2.8" fill="none" />
            {/* ── Right eye ── */}
            <circle cx="121" cy="138" r="10" stroke="#C8A96E" strokeWidth="2.8" fill="none" />

            {/* ── Nose: rounded arch ── */}
            <path
              d="M91,132 Q100,152 109,132"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
            />

            {/* ── Mouth / bottom face bar ── */}
            <line
              x1="62"
              y1="162"
              x2="138"
              y2="162"
              stroke="#C8A96E"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* ── Chin: downward triangle ── */}
            <polygon
              points="82,168 100,204 118,168"
              stroke="#C8A96E"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
            />

            {/* ── ZUMA wordmark ── */}
            <text
              x="100"
              y="244"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="30"
              fontWeight="400"
              letterSpacing="10"
              fill="#C8A96E"
            >
              ZUMA
            </text>
          </svg>

          <div className="mt-6 text-center">
            <h1 className="font-heading text-4xl font-bold text-primary"></h1>
            <p className="caption text-sm text-muted-foreground mt-2"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
