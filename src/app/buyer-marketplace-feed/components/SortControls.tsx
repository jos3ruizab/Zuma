'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SortControlsProps {
  onSortChange?: (sortBy: string) => void;
  className?: string;
}

const SortControls = ({ onSortChange, className = '' }: SortControlsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const sortOptions = [
    { id: 'newest', label: 'Más Recientes', icon: 'ClockIcon' },
    { id: 'price-low', label: 'Precio: Menor a Mayor', icon: 'ArrowUpIcon' },
    { id: 'price-high', label: 'Precio: Mayor a Menor', icon: 'ArrowDownIcon' },
    { id: 'rating', label: 'Mejor Calificados', icon: 'StarIcon' }
  ];

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId);
    setIsDropdownOpen(false);
    onSortChange?.(sortId);
  };

  const selectedOption = sortOptions.find(opt => opt.id === selectedSort);

  if (!isHydrated) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-muted-foreground">Ordenar por:</span>
        <div className="h-10 w-40 bg-muted rounded-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">Ordenar por:</span>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md hover:bg-muted transition-all animation-ease-out"
        >
          <Icon name={selectedOption?.icon as any} size={18} />
          <span className="text-sm font-medium text-foreground">{selectedOption?.label}</span>
          <Icon 
            name="ChevronDownIcon" 
            size={16} 
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-[100]"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-[101]">
            {sortOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left
                  hover:bg-muted transition-all animation-ease-out
                  ${selectedSort === option.id ? 'bg-muted' : ''}
                `}
              >
                <Icon name={option.icon as any} size={18} />
                <span className="text-sm font-medium text-foreground">{option.label}</span>
                {selectedSort === option.id && (
                  <Icon name="CheckIcon" size={16} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortControls;
