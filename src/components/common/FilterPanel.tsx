'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  cropType: string[];
  priceRange: { min: number; max: number };
  location: string[];
  certification: string[];
}

const FilterPanel = ({ onFilterChange, className = '' }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    cropType: [],
    priceRange: { min: 0, max: 10000 },
    location: [],
    certification: [],
  });

  const cropTypes: FilterOption[] = [
    { id: 'coffee', label: 'Café', value: 'coffee' },
    { id: 'cacao', label: 'Cacao', value: 'cacao' },
    { id: 'corn', label: 'Maíz', value: 'corn' },
    { id: 'beans', label: 'Frijoles', value: 'beans' },
  ];

  const locations: FilterOption[] = [
    { id: 'merida', label: 'Mérida', value: 'merida' },
    { id: 'tachira', label: 'Táchira', value: 'tachira' },
    { id: 'zulia', label: 'Zulia', value: 'zulia' },
    { id: 'lara', label: 'Lara', value: 'lara' },
  ];

  const certifications: FilterOption[] = [
    { id: 'organic', label: 'Orgánico', value: 'organic' },
    { id: 'fair-trade', label: 'Comercio Justo', value: 'fair-trade' },
    { id: 'quality-seal', label: 'Sello de Calidad', value: 'quality-seal' },
  ];

  const handleCropTypeToggle = (value: string) => {
    const newCropTypes = filters.cropType.includes(value)
      ? filters.cropType.filter((t) => t !== value)
      : [...filters.cropType, value];

    const newFilters = { ...filters, cropType: newCropTypes };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleLocationToggle = (value: string) => {
    const newLocations = filters.location.includes(value)
      ? filters.location.filter((l) => l !== value)
      : [...filters.location, value];

    const newFilters = { ...filters, location: newLocations };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCertificationToggle = (value: string) => {
    const newCertifications = filters.certification.includes(value)
      ? filters.certification.filter((c) => c !== value)
      : [...filters.certification, value];

    const newFilters = { ...filters, certification: newCertifications };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newFilters = {
      ...filters,
      priceRange: { ...filters.priceRange, [type]: value },
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      cropType: [],
      priceRange: { min: 0, max: 10000 },
      location: [],
      certification: [],
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const activeFilterCount =
    filters.cropType.length +
    filters.location.length +
    filters.certification.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 10000 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Crop Type */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Tipo de Cultivo</h3>
        <div className="flex flex-wrap gap-2">
          {cropTypes.map((crop) => (
            <button
              key={crop.id}
              onClick={() => handleCropTypeToggle(crop.value)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium
                transition-all animation-ease-out
                ${
                  filters.cropType.includes(crop.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {crop.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground mb-3">
          Rango de Precio (USD)
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={filters.priceRange.min}
            onChange={(e) => handlePriceChange('min', Number(e.target.value))}
            placeholder="Mín"
            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceChange('max', Number(e.target.value))}
            placeholder="Máx"
            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Ubicación</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.location.includes(location.value)}
                onChange={() => handleLocationToggle(location.value)}
                className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {location.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Certification */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Certificaciones</h3>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <label key={cert.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.certification.includes(cert.value)}
                onChange={() => handleCertificationToggle(cert.value)}
                className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
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

  return (
    <>
      {/* Desktop Filter Panel */}
      <div
        className={`hidden md:block bg-card border border-border rounded-md shadow-sm ${className}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Icon name="FunnelIcon" size={20} />
              <span className="font-heading font-semibold">Filtros</span>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={handleReset}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>

          {isExpanded && <FilterContent />}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-20 right-6 z-[300] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
      >
        <Icon name="FunnelIcon" size={24} />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile Filter Modal */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-[300] bg-background">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Icon name="FunnelIcon" size={24} />
                <h2 className="font-heading text-lg font-semibold">Filtros</h2>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <FilterContent />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors"
              >
                Limpiar
              </button>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
