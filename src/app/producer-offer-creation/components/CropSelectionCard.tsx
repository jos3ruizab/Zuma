'use client';


import Icon from '@/components/ui/AppIcon';

interface CropOption {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CropSelectionCardProps {
  selectedCrop: string;
  onCropSelect: (cropId: string) => void;
}

const CropSelectionCard = ({ selectedCrop, onCropSelect }: CropSelectionCardProps) => {
  const cropOptions: CropOption[] = [
    { id: 'cacao', name: 'Cacao', icon: 'CubeIcon', color: 'bg-[#8B5A2B]' },
    { id: 'cafe', name: 'Café', icon: 'BeakerIcon', color: 'bg-[#3A5F3A]' },
    { id: 'platano', name: 'Plátano', icon: 'SparklesIcon', color: 'bg-primary' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
        Tipo de Cultivo
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cropOptions.map((crop) => (
          <button
            key={crop.id}
            onClick={() => onCropSelect(crop.id)}
            className={`
              relative p-6 rounded-lg border-2 transition-all animation-ease-out
              ${selectedCrop === crop.id
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-muted'
              }
            `}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`${crop.color} p-4 rounded-full text-white`}>
                <Icon name={crop.icon as any} size={32} variant="solid" />
              </div>
              <span className="font-medium text-foreground">{crop.name}</span>
            </div>
            {selectedCrop === crop.id && (
              <div className="absolute top-2 right-2">
                <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-primary" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CropSelectionCard;
