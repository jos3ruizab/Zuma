import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface EmptyStateProps {
  type: 'active' | 'sold' | 'filtered';
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const content = {
    active: {
      icon: 'DocumentPlusIcon',
      title: 'No tienes ofertas activas',
      description: 'Comienza a vender tus productos creando tu primera oferta en el marketplace.',
      actionLabel: 'Crear Primera Oferta',
      actionLink: '/producer-offer-creation'
    },
    sold: {
      icon: 'CheckBadgeIcon',
      title: 'Aún no has vendido ningún producto',
      description: 'Tus ofertas vendidas aparecerán aquí. Sigue promocionando tus productos para conseguir compradores.',
      actionLabel: 'Ver Ofertas Activas',
      actionLink: '#active'
    },
    filtered: {
      icon: 'FunnelIcon',
      title: 'No se encontraron ofertas',
      description: 'No hay ofertas que coincidan con los filtros seleccionados. Intenta ajustar tus criterios de búsqueda.',
      actionLabel: 'Limpiar Filtros',
      actionLink: '#'
    }
  };

  const config = content[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon name={config.icon as any} size={40} className="text-muted-foreground" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground mb-2 text-center">
        {config.title}
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {config.description}
      </p>
      {type === 'active' ? (
        <Link
          href={config.actionLink}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all animation-ease-out font-medium"
        >
          <Icon name="PlusCircleIcon" size={20} variant="solid" />
          {config.actionLabel}
        </Link>
      ) : (
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-muted transition-all animation-ease-out font-medium"
        >
          {config.actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
