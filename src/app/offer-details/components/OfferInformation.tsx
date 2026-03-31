import Icon from '@/components/ui/AppIcon';

interface OfferInformationProps {
  cropType: string;
  quantity: number;
  unit: string;
  quality: string;
  harvestDate: string;
  priceVES: number;
  priceUSD: number;
  exchangeRate: number;
  certifications: string[];
  description: string;
}

const OfferInformation = ({
  cropType,
  quantity,
  unit,
  quality,
  harvestDate,
  priceVES,
  priceUSD,
  exchangeRate,
  certifications,
  description,
}: OfferInformationProps) => {
  const cropIcons: Record<string, string> = {
    Cacao: 'CubeIcon',
    Café: 'BeakerIcon',
    Plátano: 'SparklesIcon',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon
            name={(cropIcons[cropType] as any) || 'CubeIcon'}
            size={24}
            className="text-primary"
          />
        </div>
        <div className="flex-1">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            {cropType} Premium
          </h1>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Precio</h2>
        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              ${priceUSD.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-sm text-muted-foreground">USD / {unit}</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-semibold text-foreground">
              Bs. {priceVES.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-sm text-muted-foreground">VES / {unit}</span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Tasa de cambio: 1 USD = Bs. {exchangeRate.toLocaleString('es-VE')}
            </p>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
          Especificaciones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Icon name="ScaleIcon" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Cantidad Disponible</p>
              <p className="text-base font-semibold text-foreground">
                {quantity.toLocaleString('es-VE')} {unit}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="StarIcon" size={20} className="text-primary mt-0.5" variant="solid" />
            <div>
              <p className="text-sm font-medium text-foreground">Calidad</p>
              <p className="text-base font-semibold text-foreground">{quality}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CalendarIcon" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Fecha de Cosecha</p>
              <p className="text-base font-semibold text-foreground">{harvestDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="TruckIcon" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Disponibilidad</p>
              <p className="text-base font-semibold text-accent">Inmediata</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Descripción</h2>
        <p className="text-foreground leading-relaxed whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default OfferInformation;
