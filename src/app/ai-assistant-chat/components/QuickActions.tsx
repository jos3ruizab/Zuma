'use client';

import Icon from '@/components/ui/AppIcon';

interface QuickAction {
  id: string;
  label: string;
  query: string;
  icon: string;
}

interface QuickActionsProps {
  onActionClick: (query: string) => void;
  userRole: 'producer' | 'buyer' | null;
}

export default function QuickActions({ onActionClick, userRole }: QuickActionsProps) {
  const producerActions: QuickAction[] = [
    {
      id: '1',
      label: 'Precio de Mercado',
      query: '¿Cuál es el precio actual del cacao en el mercado internacional?',
      icon: 'CurrencyDollarIcon'
    },
    {
      id: '2',
      label: 'Calidad de Cultivo',
      query: '¿Cómo puedo evaluar la calidad de mi cultivo de café?',
      icon: 'BeakerIcon'
    },
    {
      id: '3',
      label: 'Crear Oferta',
      query: '¿Qué debo incluir en mi oferta para atraer compradores?',
      icon: 'PlusCircleIcon'
    },
    {
      id: '4',
      label: 'Certificaciones',
      query: '¿Qué certificaciones aumentan el valor de mi producto?',
      icon: 'ShieldCheckIcon'
    }
  ];

  const buyerActions: QuickAction[] = [
    {
      id: '1',
      label: 'Mejores Ofertas',
      query: '¿Cuáles son las mejores ofertas de cacao disponibles ahora?',
      icon: 'StarIcon'
    },
    {
      id: '2',
      label: 'Verificar Calidad',
      query: '¿Cómo verifico la calidad de un producto antes de comprar?',
      icon: 'MagnifyingGlassIcon'
    },
    {
      id: '3',
      label: 'Contactar Productor',
      query: '¿Cómo me comunico con un productor?',
      icon: 'ChatBubbleLeftRightIcon'
    },
    {
      id: '4',
      label: 'Precios Justos',
      query: '¿Cómo sé si un precio es justo para el mercado actual?',
      icon: 'ScaleIcon'
    }
  ];

  const actions = userRole === 'producer' ? producerActions : buyerActions;

  return (
    <div className="px-4 pb-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Acciones rápidas:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionClick(action.query)}
              className="
                flex items-center gap-3 p-3
                bg-card border border-border rounded-lg
                hover:bg-muted hover:border-primary
                transition-all animation-ease-out
                text-left
              "
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={action.icon as any} size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
