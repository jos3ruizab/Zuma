import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Offer {
  id: string;
  cropType: 'cacao' | 'cafe' | 'platano';
  title: string;
  quantity: number;
  unit: string;
  priceVES: number;
  priceUSD: number;
  quality: string;
  images: Array<{ url: string; alt: string }>;
  status: 'active' | 'sold' | 'expired';
  views: number;
  interested: number;
  createdAt: string;
  expiresAt?: string;
  soldAt?: string;
  buyerContact?: string;
}

interface OfferCardProps {
  offer: Offer;
  onEdit: (offerId: string) => void;
  onShare: (offerId: string) => void;
  onDelete: (offerId: string) => void;
}

const OfferCard = ({ offer, onEdit, onShare, onDelete }: OfferCardProps) => {
  const cropIcons = {
    cacao: 'CubeIcon',
    cafe: 'BeakerIcon',
    platano: 'SparklesIcon'
  };

  const statusConfig = {
    active: {
      label: 'Activa',
      color: 'bg-success text-success-foreground',
      icon: 'CheckCircleIcon'
    },
    sold: {
      label: 'Vendida',
      color: 'bg-primary text-primary-foreground',
      icon: 'CheckBadgeIcon'
    },
    expired: {
      label: 'Expirada',
      color: 'bg-muted text-muted-foreground',
      icon: 'ClockIcon'
    }
  };

  const isExpiringSoon = offer.expiresAt && 
    new Date(offer.expiresAt).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all animation-ease-out">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <AppImage
          src={offer.images[0]?.url || '/assets/images/no_image.png'}
          alt={offer.images[0]?.alt || 'Imagen del producto'}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[offer.status].color} flex items-center gap-1`}>
            <Icon name={statusConfig[offer.status].icon as any} size={14} variant="solid" />
            {statusConfig[offer.status].label}
          </span>
          {isExpiringSoon && offer.status === 'active' && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-warning text-warning-foreground flex items-center gap-1">
              <Icon name="ExclamationTriangleIcon" size={14} variant="solid" />
              Expira pronto
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
          <Icon name={cropIcons[offer.cropType] as any} size={20} className="text-primary" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {offer.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="ScaleIcon" size={16} />
            <span>{offer.quantity} {offer.unit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="StarIcon" size={16} variant="solid" className="text-primary" />
            <span>{offer.quality}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-foreground">
              Bs. {offer.priceVES.toLocaleString('es-VE')}
            </span>
            <span className="text-sm text-muted-foreground">
              / ${offer.priceUSD.toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="EyeIcon" size={16} />
            <span>{offer.views} vistas</span>
          </div>
          {offer.status === 'active' && offer.interested > 0 && (
            <div className="flex items-center gap-1 text-sm text-accent">
              <Icon name="UserGroupIcon" size={16} />
              <span>{offer.interested} interesados</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {offer.status === 'active' && (
            <>
              <button
                onClick={() => onEdit(offer.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all animation-ease-out text-sm font-medium"
              >
                <Icon name="PencilIcon" size={16} />
                <span>Editar</span>
              </button>
              <button
                onClick={() => onShare(offer.id)}
                className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-all animation-ease-out"
                aria-label="Compartir oferta"
              >
                <Icon name="ShareIcon" size={18} />
              </button>
              <button
                onClick={() => onDelete(offer.id)}
                className="px-4 py-2 border border-border rounded-md hover:bg-error/10 hover:border-error transition-all animation-ease-out"
                aria-label="Eliminar oferta"
              >
                <Icon name="TrashIcon" size={18} className="text-error" />
              </button>
            </>
          )}
          {offer.status === 'sold' && offer.buyerContact && (
            <button
              onClick={() => window.open(`https://wa.me/${offer.buyerContact}`, '_blank')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-all animation-ease-out text-sm font-medium"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={16} variant="solid" />
              <span>Contactar Comprador</span>
            </button>
          )}
        </div>

        {/* Date Info */}
        <div className="mt-3 text-xs text-muted-foreground">
          {offer.status === 'sold' && offer.soldAt && (
            <span>Vendida el {new Date(offer.soldAt).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          )}
          {offer.status === 'active' && offer.expiresAt && (
            <span>Expira el {new Date(offer.expiresAt).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          )}
          {offer.status === 'expired' && (
            <span>Creada el {new Date(offer.createdAt).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
