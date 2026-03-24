'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterControlsProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
}

interface FilterState {
  cropType: string[];
  status: string[];
}

type SortOption = 'newest' | 'oldest' | 'views' | 'price';

const FilterControls = ({ onFilterChange, onSortChange }: FilterControlsProps) => {
  const [filters, setFilters] = useState<FilterState>({
    cropType: [],
    status: []
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const cropTypes = [
    { value: 'cacao', label: 'Cacao', icon: 'CubeIcon' },
    { value: 'cafe', label: 'Café', icon: 'BeakerIcon' },
    { value: 'platano', label: 'Plátano', icon: 'SparklesIcon' }
  ];

  const statuses = [
    { value: 'active', label: 'Activas', color: 'text-success' },
    { value: 'sold', label: 'Vendidas', color: 'text-primary' },
    { value: 'expired', label: 'Expiradas', color: 'text-muted-foreground' }
  ];

  const sortOptions = [
    { value: 'newest' as SortOption, label: 'Más recientes', icon: 'ClockIcon' },
    { value: 'oldest' as SortOption, label: 'Más antiguas', icon: 'ClockIcon' },
    { value: 'views' as SortOption, label: 'Más vistas', icon: 'EyeIcon' },
    { value: 'price' as SortOption, label: 'Mayor precio', icon: 'BanknotesIcon' }
  ];

  const handleCropToggle = (value: string) => {
    const newCropTypes = filters.cropType.includes(value)
      ? filters.cropType.filter(t => t !== value)
      : [...filters.cropType, value];
    
    const newFilters = { ...filters, cropType: newCropTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusToggle = (value: string) => {
    const newStatuses = filters.status.includes(value)
      ? filters.status.filter(s => s !== value)
      : [...filters.status, value];
    
    const newFilters = { ...filters, status: newStatuses };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      cropType: [],
      status: []
    };
    setFilters(resetFilters);
    setSortBy('newest');
    onFilterChange(resetFilters);
    onSortChange('newest');
  };

  const activeFilterCount = filters.cropType.length + filters.status.length;

  return (
    <div className="mb-6">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center gap-3 mb-4 lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-all animation-ease-out"
        >
          <Icon name="FunnelIcon" size={20} />
          <span className="text-sm font-medium">Filtros</span>
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

      {/* Desktop Filters - Always Visible */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-4`}>
        {/* Crop Type Filter */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Tipo de Cultivo</h3>
          <div className="flex flex-wrap gap-2">
            {cropTypes.map(crop => (
              <button
                key={crop.value}
                onClick={() => handleCropToggle(crop.value)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                  transition-all animation-ease-out
                  ${filters.cropType.includes(crop.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
              >
                <Icon name={crop.icon as any} size={16} />
                {crop.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Estado</h3>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <button
                key={status.value}
                onClick={() => handleStatusToggle(status.value)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium
                  transition-all animation-ease-out
                  ${filters.status.includes(status.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Ordenar por</h3>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                  transition-all animation-ease-out
                  ${sortBy === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
              >
                <Icon name={option.icon as any} size={16} />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
