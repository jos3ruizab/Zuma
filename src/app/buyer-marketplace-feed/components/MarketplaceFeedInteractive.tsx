'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import AIAssistantToggle from '@/components/common/AIAssistantToggle';
import FilterPanel from '@/components/common/FilterPanel';
import RecommendationsBanner from './RecommendationsBanner';
import SortControls from './SortControls';
import OfferCard from './OfferCard';
import Icon from '@/components/ui/AppIcon';

interface Offer {
  id: string;
  cropType: string;
  title: string;
  quantity: number;
  unit: string;
  priceUSD: number;
  priceVES: number;
  location: string;
  producer: {
    name: string;
    verified: boolean;
    rating: number;
  };
  images: Array<{url: string;alt: string;}>;
  certifications: string[];
  quality: string;
  postedDate: string;
}

const MarketplaceFeedInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [currentSort, setCurrentSort] = useState('newest');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockOffers: Offer[] = [
  {
    id: '1',
    cropType: 'Café',
    title: 'Café Arábica Premium de Altura',
    quantity: 500,
    unit: 'kg',
    priceUSD: 8.50,
    priceVES: 310.50,
    location: 'Mérida, Venezuela',
    producer: {
      name: 'Carlos Rodríguez',
      verified: true,
      rating: 4.8
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1729627271706-4d07829ec6ca",
      alt: 'Granos de café arábica tostados de color marrón oscuro en saco de yute'
    }],

    certifications: ['Orgánico', 'Comercio Justo'],
    quality: 'Premium',
    postedDate: '2025-11-20'
  },
  {
    id: '2',
    cropType: 'Cacao',
    title: 'Cacao Criollo Venezolano Certificado',
    quantity: 300,
    unit: 'kg',
    priceUSD: 12.00,
    priceVES: 438.00,
    location: 'Táchira, Venezuela',
    producer: {
      name: 'María González',
      verified: true,
      rating: 4.9
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1623944178786-05ec1e44d38f",
      alt: 'Mazorcas de cacao criollo maduras de color amarillo dorado en árbol'
    }],

    certifications: ['Orgánico'],
    quality: 'Premium',
    postedDate: '2025-11-21'
  },
  {
    id: '3',
    cropType: 'Plátano',
    title: 'Plátano Hartón Fresco para Exportación',
    quantity: 1000,
    unit: 'kg',
    priceUSD: 2.50,
    priceVES: 91.25,
    location: 'Zulia, Venezuela',
    producer: {
      name: 'José Martínez',
      verified: false,
      rating: 4.5
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1653671413140-a872808a3869",
      alt: 'Racimo de plátanos hartón verdes recién cosechados en campo'
    }],

    certifications: [],
    quality: 'Estándar',
    postedDate: '2025-11-22'
  },
  {
    id: '4',
    cropType: 'Café',
    title: 'Café Robusta de Montaña',
    quantity: 750,
    unit: 'kg',
    priceUSD: 6.75,
    priceVES: 246.38,
    location: 'Lara, Venezuela',
    producer: {
      name: 'Ana Pérez',
      verified: true,
      rating: 4.7
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1654815439629-5e93cb7f74a1",
      alt: 'Cerezas de café robusta rojas maduras en rama de cafeto'
    }],

    certifications: ['Comercio Justo'],
    quality: 'Premium',
    postedDate: '2025-11-19'
  },
  {
    id: '5',
    cropType: 'Cacao',
    title: 'Cacao Trinitario Seleccionado',
    quantity: 400,
    unit: 'kg',
    priceUSD: 10.50,
    priceVES: 383.25,
    location: 'Mérida, Venezuela',
    producer: {
      name: 'Luis Hernández',
      verified: true,
      rating: 4.6
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1708851157246-62932072a3c8",
      alt: 'Granos de cacao trinitario fermentados de color marrón rojizo secándose al sol'
    }],

    certifications: ['Orgánico', 'Comercio Justo'],
    quality: 'Premium',
    postedDate: '2025-11-23'
  },
  {
    id: '6',
    cropType: 'Plátano',
    title: 'Plátano Topocho Orgánico',
    quantity: 600,
    unit: 'kg',
    priceUSD: 3.00,
    priceVES: 109.50,
    location: 'Táchira, Venezuela',
    producer: {
      name: 'Pedro Ramírez',
      verified: false,
      rating: 4.4
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1655865853880-10741b7fe0ca",
      alt: 'Plátanos topocho maduros de color amarillo brillante en canasta de mimbre'
    }],

    certifications: ['Orgánico'],
    quality: 'Premium',
    postedDate: '2025-11-18'
  }];


  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

  const handleSortChange = (sortBy: string) => {
    setCurrentSort(sortBy);
    console.log('Sort changed:', sortBy);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="buyer" />
        <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-24 bg-muted rounded-lg" />
            <div className="h-12 bg-muted rounded-lg w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) =>
              <div key={i} className="h-96 bg-muted rounded-lg" />
              )}
            </div>
          </div>
        </main>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="buyer" />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Pull to Refresh Indicator */}
        {isRefreshing &&
        <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span className="text-sm font-medium">Actualizando ofertas...</span>
            </div>
          </div>
        }

        {/* Recommendations Banner */}
        {showRecommendations &&
        <RecommendationsBanner onDismiss={() => setShowRecommendations(false)} />
        }

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="lg:w-64 flex-shrink-0">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1">
            {/* Sort & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Ofertas Disponibles
                </h2>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {mockOffers.length}
                </span>
              </div>
              <SortControls onSortChange={handleSortChange} />
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockOffers.map((offer) =>
              <OfferCard key={offer.id} offer={offer} />
              )}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-card border border-border rounded-md hover:bg-muted transition-all animation-ease-out font-medium text-foreground">
                Cargar Más Ofertas
              </button>
            </div>
          </div>
        </div>
      </main>

      <AIAssistantToggle />
    </div>);

};

export default MarketplaceFeedInteractive;
