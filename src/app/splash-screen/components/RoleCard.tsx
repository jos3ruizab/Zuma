'use client';

import Icon from '@/components/ui/AppIcon';

interface RoleCardProps {
  role: 'producer' | 'buyer';
  title: string;
  description: string;
  iconName: 'UserGroupIcon' | 'ShoppingBagIcon';
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard = ({ role, title, description, iconName, isSelected, onClick }: RoleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-lg border-2 transition-all animation-ease-out
        ${
          isSelected
            ? 'border-primary bg-primary/10 shadow-md scale-105'
            : 'border-border bg-card hover:border-primary/50 hover:shadow-sm hover:scale-102'
        }
      `}
      aria-label={`Seleccionar rol de ${title}`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`
          w-16 h-16 rounded-full flex items-center justify-center
          ${isSelected ? 'bg-primary' : 'bg-muted'}
          transition-colors animation-ease-out
        `}
        >
          <Icon
            name={iconName}
            size={32}
            variant="solid"
            className={isSelected ? 'text-primary-foreground' : 'text-foreground'}
          />
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default RoleCard;
