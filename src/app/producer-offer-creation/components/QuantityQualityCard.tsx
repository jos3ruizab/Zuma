'use client';

import Icon from '@/components/ui/AppIcon';

interface QuantityQualityCardProps {
  quantity: string;
  unit: string;
  certifications: string[];
  onQuantityChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onCertificationToggle: (cert: string) => void;
}

const QuantityQualityCard = ({
  quantity,
  unit,
  certifications,
  onQuantityChange,
  onUnitChange,
  onCertificationToggle,
}: QuantityQualityCardProps) => {
  const units = ['kg', 'ton', 'sacos'];
  const availableCertifications = [
    { id: 'organic', label: 'Orgánico', icon: 'CheckBadgeIcon' },
    { id: 'fair-trade', label: 'Comercio Justo', icon: 'HandThumbUpIcon' },
    { id: 'quality-seal', label: 'Sello de Calidad', icon: 'StarIcon' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
        Cantidad y Calidad
      </h2>

      {/* Quantity Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Cantidad Disponible
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="flex-1 px-4 py-3 border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="px-4 py-3 border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Certificaciones</label>
        <div className="space-y-3">
          {availableCertifications.map((cert) => (
            <label key={cert.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={certifications.includes(cert.id)}
                onChange={() => onCertificationToggle(cert.id)}
                className="w-5 h-5 rounded border-input text-primary focus:ring-2 focus:ring-ring"
              />
              <Icon
                name={cert.icon as any}
                size={20}
                className="text-accent group-hover:text-accent/80 transition-colors"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {cert.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuantityQualityCard;
