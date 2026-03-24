'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface OfferCardProps {
  offer: {
    id: string;
    cropType: string;
    title: string;
    quantity: number;
    unit: string;
    priceUSD: number;
    priceVES: number;
    location: string;
    producer: {
      name: string;
      verified: boolean;
      rating: number;
    };
    images: Array<{ url: string; alt: string }>;
    certifications: string[];
    quality: string;
    postedDate: string;
  };
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleWhatsAppContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(`Hola, estoy interesado en tu oferta: ${offer.title}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const getCropIcon = (cropType: string) => {
    const icons: Record<string, string> = {
      'Café': 'coffee',
      'Cacao': 'cacao',
      'Plátano': 'plantain'
    };
    return icons[cropType] || 'leaf';
  };

  const getCropColor = (cropType: string) => {
    const colors: Record<string, string> = {
      'Café': 'bg-secondary/10 text-secondary',
      'Cacao': 'bg-primary/10 text-primary',
      'Plátano': 'bg-accent/10 text-accent'
    };
    return colors[cropType] || 'bg-muted text-muted-foreground';
  };

  return (
    <Link href={`/offer-details?id=${offer.id}`}>
      <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all animation-ease-out cursor-pointer">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <AppImage
            src={offer.images[0].url}
            alt={offer.images[0].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Crop Type Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getCropColor(offer.cropType)}`}>
            {offer.cropType}
          </div>

          {/* Favorite Button */}
          {isHydrated && (
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-3 right-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Icon
                name="HeartIcon"
                size={18}
                variant={isFavorite ? 'solid' : 'outline'}
                className={isFavorite ? 'text-error' : 'text-foreground'}
              />
            </button>
          )}

          {/* Certifications */}
          {offer.certifications.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {offer.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="px-2 py-1 bg-success/90 backdrop-blur-sm text-success-foreground text-xs font-medium rounded"
                  title={cert}
                >
                  {cert === 'Orgánico' ? '🌿' : cert === 'Comercio Justo' ? '🤝' : '✓'}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title & Producer */}
          <div className="mb-3">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1 line-clamp-1">
              {offer.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{offer.producer.name}</span>
              {offer.producer.verified && (
                <Icon name="CheckBadgeIcon" size={16} variant="solid" className="text-primary" />
              )}
            </div>
          </div>

          {/* Quantity & Quality */}
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Icon name="ScaleIcon" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">
                {offer.quantity} {offer.unit}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="StarIcon" size={16} variant="solid" className="text-primary" />
              <span className="text-foreground font-medium">{offer.quality}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
            <Icon name="MapPinIcon" size={16} />
            <span>{offer.location}</span>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              <div className="text-lg font-bold text-foreground">
                ${offer.priceUSD.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-muted-foreground">
                Bs. {offer.priceVES.toLocaleString('es-VE')}
              </div>
            </div>

            {isHydrated && (
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={16} variant="solid" />
                <span className="hidden sm:inline">Contactar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
