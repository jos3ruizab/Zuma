'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OfferActionBarProps {
  offerId: string;
  producerPhone?: string;
  producerName?: string;
  offerTitle?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (isFavorite: boolean) => void;
  className?: string;
}

const OfferActionBar = ({
  offerId,
  producerPhone = '',
  producerName = '',
  offerTitle = '',
  isFavorite = false,
  onFavoriteToggle,
  className = '',
}: OfferActionBarProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hola ${producerName}, estoy interesado en tu oferta: ${offerTitle}`
    );
    const whatsappUrl = `https://wa.me/${producerPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFavoriteToggle = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    onFavoriteToggle?.(newFavoriteState);
  };

  const handleShare = async () => {
    const shareData = {
      title: offerTitle,
      text: `Mira esta oferta en ZUMA Marketplace: ${offerTitle}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
  };

  return (
    <div
      className={`sticky top-16 z-50 bg-background border-b border-border shadow-sm ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Primary Action - WhatsApp */}
          <button
            onClick={handleWhatsAppContact}
            disabled={!producerPhone}
            className="
              flex-1 md:flex-none
              flex items-center justify-center gap-2
              px-6 py-3 rounded-md
              bg-accent text-accent-foreground
              hover:bg-accent/90
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all animation-ease-out
              shadow-sm hover:shadow-md
              font-medium
            "
          >
            <Icon name="ChatBubbleLeftRightIcon" size={20} variant="solid" />
            <span className="hidden sm:inline">Contactar Productor</span>
            <span className="sm:hidden">Contactar</span>
          </button>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            {/* Favorite */}
            <button
              onClick={handleFavoriteToggle}
              className="
                p-3 rounded-md
                border border-border
                hover:bg-muted
                transition-all animation-ease-out
              "
              aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Icon
                name="HeartIcon"
                size={20}
                variant={favorite ? 'solid' : 'outline'}
                className={favorite ? 'text-error' : 'text-foreground'}
              />
            </button>

            {/* Share */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="
                  p-3 rounded-md
                  border border-border
                  hover:bg-muted
                  transition-all animation-ease-out
                "
                aria-label="Compartir oferta"
              >
                <Icon name="ShareIcon" size={20} />
              </button>

              {/* Share Menu (fallback for browsers without native share) */}
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-[200]">
                  <button
                    onClick={copyLink}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-all animation-ease-out text-left"
                  >
                    <Icon name="LinkIcon" size={18} />
                    <span className="text-sm">Copiar enlace</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close share menu */}
      {showShareMenu && (
        <div className="fixed inset-0 z-[199]" onClick={() => setShowShareMenu(false)} />
      )}
    </div>
  );
};

export default OfferActionBar;
