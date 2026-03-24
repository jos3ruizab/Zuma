'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
          <Image
            src="/assets/images/upscalemedia-transformed_1_-1763869666562.png"
            alt="ZUMA Venezuelan indigenous-inspired geometric logo with triangular crown motif and Venezuelan Gold design"
            width={180}
            height={180}
            className="drop-shadow-lg"
            priority />

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
