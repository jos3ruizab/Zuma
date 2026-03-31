import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface OfferPreviewCardProps {
  cropType: string;
  quantity: string;
  unit: string;
  priceUSD: string;
  certifications: string[];
  photos: string[];
}

const OfferPreviewCard = ({
  cropType,
  quantity,
  unit,
  priceUSD,
  certifications,
  photos,
}: OfferPreviewCardProps) => {
  const cropNames: Record<string, string> = {
    cacao: 'Cacao',
    cafe: 'Café',
    platano: 'Plátano',
  };

  const certLabels: Record<string, string> = {
    organic: 'Orgánico',
    'fair-trade': 'Comercio Justo',
    'quality-seal': 'Sello de Calidad',
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 bg-muted border-b border-border">
        <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="EyeIcon" size={18} />
          Vista Previa de la Oferta
        </h3>
      </div>

      <div className="p-6">
        {/* Photo Preview */}
        {photos.length > 0 ? (
          <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-muted">
            <AppImage
              src={photos[0]}
              alt={`Vista previa de ${cropNames[cropType] || 'producto'} agrícola venezolano`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="mb-4 aspect-video rounded-lg bg-muted flex items-center justify-center">
            <Icon name="PhotoIcon" size={48} className="text-muted-foreground" />
          </div>
        )}

        {/* Crop Type */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {cropNames[cropType] || 'Selecciona cultivo'}
          </span>
        </div>

        {/* Quantity & Price */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {quantity || '0'} {unit}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">${priceUSD || '0.00'}</p>
            <p className="text-xs text-muted-foreground">por {unit}</p>
          </div>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded"
              >
                <Icon name="CheckBadgeIcon" size={14} variant="solid" />
                {certLabels[cert]}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferPreviewCard;
