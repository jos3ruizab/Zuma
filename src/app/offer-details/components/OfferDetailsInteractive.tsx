'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import AIAssistantToggle from '@/components/common/AIAssistantToggle';
import OfferActionBar from '@/components/common/OfferActionBar';
import ImageGallery from './ImageGallery';
import OfferInformation from './OfferInformation';
import ProducerProfile from './ProducerProfile';
import AIQualityAssessment from './AIQualityAssessment';
import ShippingPaymentInfo from './ShippingPaymentInfo';
import Icon from '@/components/ui/AppIcon';

const CROP_LABELS: Record<string, string> = { CACAO: 'Cacao', CAFE: 'Café', PLATANO: 'Plátano' };
const QUALITY_LABELS: Record<string, string> = { A: 'Premium AAA', B: 'Estándar', C: 'Básico' };
const USD_TO_VES = 36.5;

const FALLBACK_OFFER = {
  id: 'offer-001',
  cropType: 'Cacao',
  quantity: 500,
  unit: 'kg',
  quality: 'Premium AAA',
  harvestDate: '15/11/2025',
  priceVES: 180000,
  priceUSD: 5.0,
  exchangeRate: 36.0,
  certifications: ['Orgánico', 'Comercio Justo'],
  description: 'Cacao premium de primera calidad cultivado en las montañas de Venezuela.',
  images: [{ url: 'https://images.unsplash.com/photo-1578269830911-6159f1aee3b4', alt: 'Cacao' }],
  producer: {
    name: 'Productor ZUMA',
    location: 'Venezuela',
    avatar: '/assets/images/upscalemedia-transformed_1_-1763869666562.png',
    avatarAlt: 'Productor',
    verified: false,
    rating: 0,
    totalSales: 0,
    memberSince: '2024',
    bio: '',
    phone: '',
  },
  aiAssessment: {
    overallScore: 85,
    visualQuality: 88,
    ripeness: 84,
    consistency: 83,
    analysis: 'Análisis de calidad basado en los parámetros del producto.',
    recommendations: ['Almacenar en ambiente seco', 'Mantener temperatura controlada'],
  },
  shipping: {
    methods: [
      {
        name: 'Envío Nacional',
        description: 'Transporte terrestre seguro',
        estimatedDays: '5-7 días hábiles',
      },
      {
        name: 'Retiro en Finca',
        description: 'Retiro directo en la plantación',
        estimatedDays: 'Inmediato',
      },
    ],
    paymentMethods: ['Transferencia Bancaria', 'Zelle', 'Efectivo'],
    terms: ['Pago 50% adelanto, 50% contra entrega', 'Garantía de calidad'],
  },
};

const OfferDetailsInteractive = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const offerId = searchParams.get('id');
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [offerData, setOfferData] = useState(FALLBACK_OFFER);

  useEffect(() => {
    setIsHydrated(true);
    if (!offerId) return;

    fetch(`/api/offers/${offerId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return;
        let photos: string[] = [];
        try {
          photos = JSON.parse(data.photos ?? '[]');
        } catch {
          photos = [];
        }
        let certs: string[] = [];
        try {
          certs = JSON.parse(data.producer?.certifications ?? '[]');
        } catch {
          certs = [];
        }

        setOfferData({
          id: data.id,
          cropType: CROP_LABELS[data.cropType] ?? data.cropType,
          quantity: data.quantity,
          unit: data.unit,
          quality: QUALITY_LABELS[data.quality] ?? data.quality,
          harvestDate: new Date(data.createdAt).toLocaleDateString('es-VE'),
          priceUSD: data.price,
          priceVES: parseFloat((data.price * USD_TO_VES).toFixed(0)),
          exchangeRate: USD_TO_VES,
          certifications: certs,
          description: data.description ?? '',
          images:
            photos.length > 0
              ? photos.map((url: string) => ({
                  url,
                  alt: CROP_LABELS[data.cropType] ?? 'Producto',
                }))
              : FALLBACK_OFFER.images,
          producer: {
            name: data.producer?.businessName ?? 'Productor',
            location: data.producer?.location ?? '',
            avatar: '/assets/images/upscalemedia-transformed_1_-1763869666562.png',
            avatarAlt: 'Perfil del productor',
            verified: data.producer?.verificationStatus === 'VERIFIED',
            rating: data.producer?.trustScore ?? 0,
            totalSales: 0,
            memberSince: data.producer?.user?.createdAt
              ? new Date(data.producer.user.createdAt).getFullYear().toString()
              : '2024',
            bio: data.producer?.bio ?? '',
            phone: data.producer?.user?.phone ?? '',
          },
          aiAssessment: FALLBACK_OFFER.aiAssessment,
          shipping: FALLBACK_OFFER.shipping,
        });
      })
      .catch(() => {});
  }, [offerId]);

  const handleFavoriteToggle = (favorite: boolean) => {
    setIsFavorite(favorite);
  };

  const handleBackToMarketplace = () => {
    router.push('/buyer-marketplace-feed');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="buyer" />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="buyer" />

      <OfferActionBar
        offerId={offerData.id}
        producerPhone={offerData.producer.phone}
        producerName={offerData.producer.name}
        offerTitle={`${offerData.cropType} Premium - ${offerData.quantity}${offerData.unit}`}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackToMarketplace}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <Icon name="ArrowLeftIcon" size={20} />
          <span className="text-sm font-medium">Volver al Mercado</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={offerData.images} />
            <OfferInformation
              cropType={offerData.cropType}
              quantity={offerData.quantity}
              unit={offerData.unit}
              quality={offerData.quality}
              harvestDate={offerData.harvestDate}
              priceVES={offerData.priceVES}
              priceUSD={offerData.priceUSD}
              exchangeRate={offerData.exchangeRate}
              certifications={offerData.certifications}
              description={offerData.description}
            />

            <AIQualityAssessment
              overallScore={offerData.aiAssessment.overallScore}
              visualQuality={offerData.aiAssessment.visualQuality}
              ripeness={offerData.aiAssessment.ripeness}
              consistency={offerData.aiAssessment.consistency}
              analysis={offerData.aiAssessment.analysis}
              recommendations={offerData.aiAssessment.recommendations}
            />
          </div>

          {/* Right Column - Producer & Shipping */}
          <div className="space-y-6">
            <ProducerProfile
              name={offerData.producer.name}
              location={offerData.producer.location}
              avatar={offerData.producer.avatar}
              avatarAlt={offerData.producer.avatarAlt}
              verified={offerData.producer.verified}
              rating={offerData.producer.rating}
              totalSales={offerData.producer.totalSales}
              memberSince={offerData.producer.memberSince}
              bio={offerData.producer.bio}
            />

            <ShippingPaymentInfo
              shippingMethods={offerData.shipping.methods}
              paymentMethods={offerData.shipping.paymentMethods}
              terms={offerData.shipping.terms}
            />
          </div>
        </div>
      </main>

      <AIAssistantToggle />
    </div>
  );
};

export default OfferDetailsInteractive;
