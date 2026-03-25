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
        showGeometric ? 'opacity-100' : 'opacity-0'}`
        }>

        <div className="absolute top-0 left-1/4 w-16 h-16 border-2 border-primary/30 rotate-45 animation-pulse-subtle" />
        <div className="absolute bottom-0 right-1/4 w-20 h-20 border-2 border-accent/30 rotate-12 animation-pulse-subtle" />
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-primary/10 rounded-full animation-pulse-subtle" />
      </div>

      {/* Main Logo */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`
        }>

        <div className="flex flex-col items-center">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
            aria-label="ZUMA logo"
          >
            {/* Outer diamond */}
            <polygon
              points="90,10 170,90 90,170 10,90"
              fill="#C8A96E"
              fillOpacity="0.15"
              stroke="#C8A96E"
              strokeWidth="2"
            />
            {/* Inner diamond */}
            <polygon
              points="90,30 150,90 90,150 30,90"
              fill="#C8A96E"
              fillOpacity="0.08"
              stroke="#C8A96E"
              strokeWidth="1.5"
            />
            {/* Crown triangles */}
            <polygon points="90,42 108,72 72,72" fill="#C8A96E" />
            <polygon points="72,72 60,58 72,88" fill="#C8A96E" fillOpacity="0.7" />
            <polygon points="108,72 120,58 108,88" fill="#C8A96E" fillOpacity="0.7" />
            {/* Base bar */}
            <rect x="62" y="88" width="56" height="8" rx="2" fill="#C8A96E" />
            {/* ZUMA text */}
            <text
              x="90"
              y="130"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="22"
              fontWeight="bold"
              letterSpacing="6"
              fill="#C8A96E"
            >
              ZUMA
            </text>
          </svg>

          <div className="mt-6 text-center">
            <h1 className="font-heading text-4xl font-bold text-primary"></h1>
            <p className="caption text-sm text-muted-foreground mt-2">

            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default AnimatedLogo;
