'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import DashboardMetrics from './DashboardMetrics';
import OfferCard from './OfferCard';
import FilterControls from './FilterControls';
import EmptyState from './EmptyState';

const CROP_LABELS: Record<string, string> = { CACAO: 'cacao', CAFE: 'cafe', PLATANO: 'platano' };
const QUALITY_LABELS: Record<string, string> = { A: 'Premium', B: 'Estándar', C: 'Básico' };
const USD_TO_VES = 36.5;

interface Offer {
  id: string;
  cropType: 'cacao' | 'cafe' | 'platano';
  title: string;
  quantity: number;
  unit: string;
  priceVES: number;
  priceUSD: number;
  quality: string;
  images: Array<{ url: string; alt: string }>;
  status: 'active' | 'sold' | 'expired';
  views: number;
  interested: number;
  createdAt: string;
  expiresAt?: string;
  soldAt?: string;
  buyerContact?: string;
}

interface ApiOffer {
  id: string;
  cropType: string;
  quantity: number;
  unit: string;
  price: number;
  quality: string;
  photos: string;
  status: string;
  viewCount: number;
  createdAt: string;
}

function mapApiOffer(o: ApiOffer): Offer {
  let photos: string[] = [];
  try {
    photos = JSON.parse(o.photos);
  } catch {
    photos = [];
  }
  const cropKey = (CROP_LABELS[o.cropType] ?? 'cacao') as 'cacao' | 'cafe' | 'platano';
  const qualityLabel = QUALITY_LABELS[o.quality] ?? o.quality;
  const statusMap: Record<string, 'active' | 'sold' | 'expired'> = {
    ACTIVE: 'active',
    SOLD: 'sold',
    CANCELLED: 'expired',
  };
  return {
    id: o.id,
    cropType: cropKey,
    title: `${o.cropType.charAt(0) + o.cropType.slice(1).toLowerCase()} ${qualityLabel} — ${o.quantity} ${o.unit}`,
    quantity: o.quantity,
    unit: o.unit,
    priceUSD: o.price,
    priceVES: parseFloat((o.price * USD_TO_VES).toFixed(0)),
    quality: qualityLabel,
    images:
      photos.length > 0
        ? photos.map((url) => ({ url, alt: cropKey }))
        : [{ url: 'https://images.unsplash.com/photo-1502535780602-aedae01fa80a', alt: cropKey }],
    status: statusMap[o.status] ?? 'active',
    views: o.viewCount,
    interested: 0,
    createdAt: o.createdAt,
  };
}

interface FilterState {
  cropType: string[];
  status: string[];
}

type SortOption = 'newest' | 'oldest' | 'views' | 'price';

const ProducerDashboardInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    cropType: [],
    status: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [apiOffers, setApiOffers] = useState<Offer[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    fetch('/api/offers')
      .then((r) => r.json())
      .then((data) => {
        const mapped = (data.offers ?? []).map(mapApiOffer);
        setApiOffers(mapped);
      })
      .catch(() => {});
  }, []);

  const mockOffers: Offer[] =
    apiOffers.length > 0
      ? apiOffers
      : [
          {
            id: '1',
            cropType: 'cacao',
            title: 'Cacao Criollo Premium - Cosecha 2025',
            quantity: 500,
            unit: 'kg',
            priceVES: 2500000,
            priceUSD: 68.5,
            quality: 'Premium',
            images: [
              {
                url: 'https://images.unsplash.com/photo-1502535780602-aedae01fa80a',
                alt: 'Granos de cacao criollo venezolano secándose al sol sobre superficie de madera',
              },
            ],

            status: 'active',
            views: 234,
            interested: 8,
            createdAt: '2025-01-15T10:00:00Z',
            expiresAt: '2025-02-15T10:00:00Z',
          },
          {
            id: '2',
            cropType: 'cafe',
            title: 'Café Arábica Altura - Región Andina',
            quantity: 300,
            unit: 'kg',
            priceVES: 1800000,
            priceUSD: 49.3,
            quality: 'Especial',
            images: [
              {
                url: 'https://images.unsplash.com/photo-1730253206822-f0fef02d35df',
                alt: 'Granos de café arábica verde recién cosechados en canasta de mimbre',
              },
            ],

            status: 'active',
            views: 189,
            interested: 5,
            createdAt: '2025-01-18T14:30:00Z',
            expiresAt: '2025-02-18T14:30:00Z',
          },
          {
            id: '3',
            cropType: 'platano',
            title: 'Plátano Hartón - Calidad Exportación',
            quantity: 1000,
            unit: 'kg',
            priceVES: 800000,
            priceUSD: 21.9,
            quality: 'Primera',
            images: [
              {
                url: 'https://images.unsplash.com/photo-1631194079401-a7390b5eafba',
                alt: 'Racimo de plátanos hartón verdes colgando en plantación tropical',
              },
            ],

            status: 'active',
            views: 156,
            interested: 12,
            createdAt: '2025-01-20T09:15:00Z',
            expiresAt: '2025-01-28T09:15:00Z',
          },
          {
            id: '4',
            cropType: 'cacao',
            title: 'Cacao Trinitario Orgánico Certificado',
            quantity: 250,
            unit: 'kg',
            priceVES: 1500000,
            priceUSD: 41.1,
            quality: 'Orgánico',
            images: [
              {
                url: 'https://images.unsplash.com/photo-1720123040169-b5315cd59adb',
                alt: 'Mazorca de cacao abierta mostrando granos frescos color púrpura en mano de agricultor',
              },
            ],

            status: 'sold',
            views: 312,
            interested: 0,
            createdAt: '2024-12-10T11:00:00Z',
            soldAt: '2025-01-05T16:45:00Z',
            buyerContact: '584121234567',
          },
          {
            id: '5',
            cropType: 'cafe',
            title: 'Café Robusta - Producción Sostenible',
            quantity: 400,
            unit: 'kg',
            priceVES: 1200000,
            priceUSD: 32.9,
            quality: 'Estándar',
            images: [
              {
                url: 'https://images.unsplash.com/photo-1690983325192-a4c13c2e331d',
                alt: 'Granos de café robusta tostados en saco de yute con cuchara de madera',
              },
            ],

            status: 'sold',
            views: 267,
            interested: 0,
            createdAt: '2024-12-20T08:30:00Z',
            soldAt: '2025-01-10T12:20:00Z',
            buyerContact: '584149876543',
          },
        ];

  const metrics = {
    activeOffers: mockOffers.filter((o) => o.status === 'active').length,
    totalViews: mockOffers.reduce((sum, o) => sum + o.views, 0),
    earningsVES: mockOffers
      .filter((o) => o.status === 'sold')
      .reduce((sum, o) => sum + o.priceVES, 0),
    earningsUSD: mockOffers
      .filter((o) => o.status === 'sold')
      .reduce((sum, o) => sum + o.priceUSD, 0),
  };

  const filterOffers = (offers: Offer[]) => {
    let filtered = offers;

    if (filters.cropType.length > 0) {
      filtered = filtered.filter((o) => filters.cropType.includes(o.cropType));
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter((o) => filters.status.includes(o.status));
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'price':
        filtered.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
    }

    return filtered;
  };

  const activeOffers = filterOffers(mockOffers.filter((o) => o.status === 'active'));
  const soldOffers = filterOffers(mockOffers.filter((o) => o.status === 'sold'));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/offers');
      const data = await res.json();
      setApiOffers((data.offers ?? []).map(mapApiOffer));
    } catch {
      /* keep existing */
    }
    setIsRefreshing(false);
  };

  const handleEdit = (offerId: string) => {
    router.push(`/producer-offer-creation?edit=${offerId}`);
  };

  const handleShare = (offerId: string) => {
    const offer = mockOffers.find((o) => o.id === offerId);
    if (!offer) return;

    const shareText = `¡Mira mi oferta en ZUMA Marketplace!\n\n${offer.title}\n${offer.quantity} ${offer.unit} - $${offer.priceUSD} USD\n\n`;
    const shareUrl = `${window.location.origin}/offer-details?id=${offerId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleDelete = (offerId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      fetch(`/api/offers/${offerId}`, { method: 'DELETE' })
        .then((r) => {
          if (r.ok) setApiOffers((prev) => prev.filter((o) => o.id !== offerId));
        })
        .catch(() => {});
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Panel de Productor
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus ofertas y monitorea tu desempeño en el marketplace
            </p>
          </div>
          <button
            onClick={() => router.push('/producer-offer-creation')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all animation-ease-out font-medium shadow-sm hover:shadow-md"
          >
            <Icon name="PlusCircleIcon" size={20} variant="solid" />
            <span>Crear Nueva Oferta</span>
          </button>
        </div>

        {/* Metrics */}
        <DashboardMetrics metrics={metrics} />

        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center gap-2 mb-4 text-primary">
            <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
            <span className="text-sm font-medium">Actualizando ofertas...</span>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`
                flex items-center gap-2 px-6 py-3 font-medium transition-all animation-ease-out
                ${activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <Icon name="DocumentTextIcon" size={20} />
              <span>Ofertas Activas</span>
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {activeOffers.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`
                flex items-center gap-2 px-6 py-3 font-medium transition-all animation-ease-out
                ${activeTab === 'sold' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <Icon name="CheckBadgeIcon" size={20} />
              <span>Vendidas</span>
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                {soldOffers.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <FilterControls onFilterChange={setFilters} onSortChange={setSortBy} />

        {/* Offers Grid */}
        {activeTab === 'active' && (
          <>
            {activeOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeOffers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onEdit={handleEdit}
                    onShare={handleShare}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                type={
                  filters.cropType.length > 0 || filters.status.length > 0 ? 'filtered' : 'active'
                }
              />
            )}
          </>
        )}

        {activeTab === 'sold' && (
          <>
            {soldOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldOffers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onEdit={handleEdit}
                    onShare={handleShare}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="sold" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProducerDashboardInteractive;
