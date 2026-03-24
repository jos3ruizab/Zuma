'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface RecommendationsBannerProps {
  onDismiss?: () => void;
}

const RecommendationsBanner = ({ onDismiss }: RecommendationsBannerProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isHydrated || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
          <Icon name="SparklesIcon" size={20} variant="solid" className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-base font-semibold text-foreground mb-1">
            Recomendaciones Inteligentes
          </h3>
          <p className="text-sm text-muted-foreground">
            Basado en tus preferencias, te sugerimos explorar ofertas de café orgánico de Mérida y cacao premium de Táchira.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-muted rounded-md transition-colors"
          aria-label="Cerrar recomendaciones"
        >
          <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default RecommendationsBanner;
