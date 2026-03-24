'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import AIAssistantToggle from '@/components/common/AIAssistantToggle';
import OfferActionBar from '@/components/common/OfferActionBar';
import ImageGallery from './ImageGallery';
import OfferInformation from './OfferInformation';
import ProducerProfile from './ProducerProfile';
import AIQualityAssessment from './AIQualityAssessment';
import ShippingPaymentInfo from './ShippingPaymentInfo';
import Icon from '@/components/ui/AppIcon';

interface OfferData {
  id: string;
  cropType: string;
  quantity: number;
  unit: string;
  quality: string;
  harvestDate: string;
  priceVES: number;
  priceUSD: number;
  exchangeRate: number;
  certifications: string[];
  description: string;
  images: Array<{url: string;alt: string;}>;
  producer: {
    name: string;
    location: string;
    avatar: string;
    avatarAlt: string;
    verified: boolean;
    rating: number;
    totalSales: number;
    memberSince: string;
    bio: string;
    phone: string;
  };
  aiAssessment: {
    overallScore: number;
    visualQuality: number;
    ripeness: number;
    consistency: number;
    analysis: string;
    recommendations: string[];
  };
  shipping: {
    methods: Array<{
      name: string;
      description: string;
      estimatedDays: string;
    }>;
    paymentMethods: string[];
    terms: string[];
  };
}

const OfferDetailsInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockOfferData: OfferData = {
    id: 'offer-001',
    cropType: 'Cacao',
    quantity: 500,
    unit: 'kg',
    quality: 'Premium AAA',
    harvestDate: '15/11/2025',
    priceVES: 180000,
    priceUSD: 5.0,
    exchangeRate: 36.0,
    certifications: ['Orgánico', 'Comercio Justo', 'Sello de Calidad'],
    description: `Cacao premium de primera calidad cultivado en las montañas de Mérida, Venezuela. Nuestro cacao es cosechado a mano y procesado con técnicas tradicionales que preservan su sabor único y aromático.\n\nCaracterísticas destacadas:\n• Fermentación controlada de 6 días\n• Secado natural al sol\n• Contenido de grasa superior al 50%\n• Perfil de sabor: notas frutales y florales\n• Sin pesticidas ni químicos\n\nIdeal para chocolatería artesanal y producción de chocolate fino.`,
    images: [
    {
      url: "https://images.unsplash.com/photo-1578269830911-6159f1aee3b4",
      alt: 'Close-up of premium Venezuelan cacao pods hanging on tree with rich brown color and natural texture'
    },
    {
      url: "https://images.unsplash.com/photo-1512427631246-d0c374837803",
      alt: 'Freshly harvested cacao beans spread on drying rack showing deep brown color and uniform size'
    },
    {
      url: "https://images.unsplash.com/photo-1621555798820-2a090fe89b7f",
      alt: 'Fermented cacao beans in wooden box displaying rich chocolate brown color and quality texture'
    },
    {
      url: "https://images.unsplash.com/photo-1446435383876-ff7172903e86",
      alt: 'Cacao plantation in Venezuelan mountains with lush green trees and ripe brown pods'
    }],

    producer: {
      name: 'Carlos Rodríguez',
      location: 'Mérida, Venezuela',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_114713e0c-1763295039795.png",
      avatarAlt: 'Professional headshot of Hispanic man with short dark hair and friendly smile wearing blue shirt',
      verified: true,
      rating: 4.8,
      totalSales: 127,
      memberSince: 'Enero 2023',
      bio: 'Agricultor de tercera generación especializado en cacao fino de aroma. Mi familia ha cultivado cacao en las montañas de Mérida durante más de 50 años, manteniendo prácticas sostenibles y de comercio justo.',
      phone: '584121234567'
    },
    aiAssessment: {
      overallScore: 92,
      visualQuality: 95,
      ripeness: 90,
      consistency: 91,
      analysis: 'El análisis visual mediante IA indica que este lote de cacao presenta características excepcionales. Los granos muestran una fermentación uniforme con coloración marrón chocolate consistente. La textura superficial sugiere un proceso de secado óptimo. No se detectan signos de moho, plagas o defectos significativos. El tamaño de los granos es uniforme, indicando una selección cuidadosa.',
      recommendations: [
      'Almacenar en ambiente seco con humedad relativa inferior al 7%',
      'Mantener temperatura entre 18-20°C para preservar calidad',
      'Procesar dentro de 6 meses para sabor óptimo',
      'Ideal para chocolate de origen único premium']

    },
    shipping: {
      methods: [
      {
        name: 'Envío Nacional Estándar',
        description: 'Transporte terrestre seguro a cualquier ciudad de Venezuela',
        estimatedDays: '5-7 días hábiles'
      },
      {
        name: 'Envío Internacional',
        description: 'Exportación con documentación completa y certificados',
        estimatedDays: '15-20 días hábiles'
      },
      {
        name: 'Retiro en Finca',
        description: 'Coordinar visita y retiro directo en la plantación',
        estimatedDays: 'Inmediato'
      }],

      paymentMethods: ['Transferencia Bancaria', 'PayPal', 'Zelle', 'Criptomonedas', 'Efectivo (retiro en finca)'],
      terms: [
      'Pago 50% adelanto, 50% contra entrega',
      'Garantía de calidad: devolución si no cumple especificaciones',
      'Muestras disponibles previo a compra mayor (costo de envío a cargo del comprador)',
      'Certificados de origen y calidad incluidos',
      'Factura fiscal disponible',
      'Descuentos por volumen: 5% en pedidos > 1000kg, 10% en pedidos > 2000kg']

    }
  };

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
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="buyer" />
      
      <OfferActionBar
        offerId={mockOfferData.id}
        producerPhone={mockOfferData.producer.phone}
        producerName={mockOfferData.producer.name}
        offerTitle={`${mockOfferData.cropType} Premium - ${mockOfferData.quantity}${mockOfferData.unit}`}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle} />


      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackToMarketplace}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">

          <Icon name="ArrowLeftIcon" size={20} />
          <span className="text-sm font-medium">Volver al Mercado</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={mockOfferData.images} />
            <OfferInformation
              cropType={mockOfferData.cropType}
              quantity={mockOfferData.quantity}
              unit={mockOfferData.unit}
              quality={mockOfferData.quality}
              harvestDate={mockOfferData.harvestDate}
              priceVES={mockOfferData.priceVES}
              priceUSD={mockOfferData.priceUSD}
              exchangeRate={mockOfferData.exchangeRate}
              certifications={mockOfferData.certifications}
              description={mockOfferData.description} />

            <AIQualityAssessment
              overallScore={mockOfferData.aiAssessment.overallScore}
              visualQuality={mockOfferData.aiAssessment.visualQuality}
              ripeness={mockOfferData.aiAssessment.ripeness}
              consistency={mockOfferData.aiAssessment.consistency}
              analysis={mockOfferData.aiAssessment.analysis}
              recommendations={mockOfferData.aiAssessment.recommendations} />

          </div>

          {/* Right Column - Producer & Shipping */}
          <div className="space-y-6">
            <ProducerProfile
              name={mockOfferData.producer.name}
              location={mockOfferData.producer.location}
              avatar={mockOfferData.producer.avatar}
              avatarAlt={mockOfferData.producer.avatarAlt}
              verified={mockOfferData.producer.verified}
              rating={mockOfferData.producer.rating}
              totalSales={mockOfferData.producer.totalSales}
              memberSince={mockOfferData.producer.memberSince}
              bio={mockOfferData.producer.bio} />

            <ShippingPaymentInfo
              shippingMethods={mockOfferData.shipping.methods}
              paymentMethods={mockOfferData.shipping.paymentMethods}
              terms={mockOfferData.shipping.terms} />

          </div>
        </div>
      </main>

      <AIAssistantToggle />
    </div>);

};

export default OfferDetailsInteractive;
