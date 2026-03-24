'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import CropSelectionCard from './CropSelectionCard';
import QuantityQualityCard from './QuantityQualityCard';
import PhotoUploadCard from './PhotoUploadCard';
import PricingCard from './PricingCard';
import OfferPreviewCard from './OfferPreviewCard';

interface FormData {
  cropType: string;
  quantity: string;
  unit: string;
  certifications: string[];
  photos: string[];
  priceVES: string;
  priceUSD: string;
}

interface FormErrors {
  cropType?: string;
  quantity?: string;
  photos?: string;
  priceUSD?: string;
}

const ProducerOfferCreationInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cropType: '',
    quantity: '',
    unit: 'kg',
    certifications: [],
    photos: [],
    priceVES: '',
    priceUSD: ''
  });
  const [aiSuggestion, setAiSuggestion] = useState({ ves: '', usd: '' });
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGetAIPricing = () => {
    if (!formData.cropType || !formData.quantity) {
      setErrors({
        ...errors,
        cropType: !formData.cropType ? 'Selecciona un tipo de cultivo' : undefined,
        quantity: !formData.quantity ? 'Ingresa la cantidad disponible' : undefined
      });
      return;
    }

    setIsLoadingAI(true);
    
    // Simulate AI pricing analysis
    setTimeout(() => {
      const basePrice = formData.cropType === 'cacao' ? 8.5 : formData.cropType === 'cafe' ? 6.2 : 3.8;
      const quantity = parseFloat(formData.quantity) || 1;
      const pricePerUnit = basePrice + (Math.random() * 2 - 1);
      const totalUSD = (pricePerUnit * quantity).toFixed(2);
      const totalVES = (parseFloat(totalUSD) * 36.5).toFixed(2);

      setAiSuggestion({
        usd: `$${totalUSD}`,
        ves: `Bs. ${totalVES}`
      });
      setFormData({
        ...formData,
        priceUSD: totalUSD,
        priceVES: totalVES
      });
      setIsLoadingAI(false);
    }, 2000);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.cropType) {
      newErrors.cropType = 'Selecciona un tipo de cultivo';
    }
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Ingresa una cantidad válida';
    }
    if (formData.photos.length === 0) {
      newErrors.photos = 'Agrega al menos una foto del producto';
    }
    if (!formData.priceUSD || parseFloat(formData.priceUSD) <= 0) {
      newErrors.priceUSD = 'Ingresa un precio válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate offer creation
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        router.push('/producer-dashboard');
      }, 2000);
    }, 1500);
  };

  const handleCertificationToggle = (cert: string) => {
    const newCerts = formData.certifications.includes(cert)
      ? formData.certifications.filter(c => c !== cert)
      : [...formData.certifications, cert];
    setFormData({ ...formData, certifications: newCerts });
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/producer-dashboard')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <Icon name="ArrowLeftIcon" size={20} />
            <span className="text-sm">Volver al Panel</span>
          </button>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Crear Nueva Oferta
          </h1>
          <p className="text-muted-foreground">
            Completa los detalles de tu producto para publicarlo en el mercado
          </p>
        </div>

        {/* Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crop Selection */}
            <CropSelectionCard
              selectedCrop={formData.cropType}
              onCropSelect={(crop) => {
                setFormData({ ...formData, cropType: crop });
                setErrors({ ...errors, cropType: undefined });
              }}
            />
            {errors.cropType && (
              <p className="text-sm text-error -mt-4 ml-2">{errors.cropType}</p>
            )}

            {/* Quantity & Quality */}
            <QuantityQualityCard
              quantity={formData.quantity}
              unit={formData.unit}
              certifications={formData.certifications}
              onQuantityChange={(value) => {
                setFormData({ ...formData, quantity: value });
                setErrors({ ...errors, quantity: undefined });
              }}
              onUnitChange={(value) => setFormData({ ...formData, unit: value })}
              onCertificationToggle={handleCertificationToggle}
            />
            {errors.quantity && (
              <p className="text-sm text-error -mt-4 ml-2">{errors.quantity}</p>
            )}

            {/* Photo Upload */}
            <PhotoUploadCard
              photos={formData.photos}
              onPhotosChange={(photos) => {
                setFormData({ ...formData, photos });
                setErrors({ ...errors, photos: undefined });
              }}
            />
            {errors.photos && (
              <p className="text-sm text-error -mt-4 ml-2">{errors.photos}</p>
            )}

            {/* Pricing */}
            <PricingCard
              priceVES={formData.priceVES}
              priceUSD={formData.priceUSD}
              aiSuggestionVES={aiSuggestion.ves}
              aiSuggestionUSD={aiSuggestion.usd}
              isLoadingAI={isLoadingAI}
              onPriceVESChange={(value) => setFormData({ ...formData, priceVES: value })}
              onPriceUSDChange={(value) => {
                setFormData({ ...formData, priceUSD: value });
                setErrors({ ...errors, priceUSD: undefined });
              }}
              onGetAIPricing={handleGetAIPricing}
            />
            {errors.priceUSD && (
              <p className="text-sm text-error -mt-4 ml-2">{errors.priceUSD}</p>
            )}

            {/* Submit Button - Mobile */}
            <div className="lg:hidden">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all animation-ease-out disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isSubmitting ? 'Publicando Oferta...' : 'Publicar Oferta'}
              </button>
            </div>
          </div>

          {/* Preview & Actions - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <OfferPreviewCard
                cropType={formData.cropType}
                quantity={formData.quantity}
                unit={formData.unit}
                priceUSD={formData.priceUSD}
                certifications={formData.certifications}
                photos={formData.photos}
              />

              {/* Submit Button - Desktop */}
              <div className="hidden lg:block">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all animation-ease-out disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? 'Publicando Oferta...' : 'Publicar Oferta'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[500] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full shadow-xl animation-spring">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-success" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                ¡Oferta Publicada!
              </h3>
              <p className="text-muted-foreground mb-4">
                Tu oferta está ahora visible para compradores en todo el mundo
              </p>
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animation-pulse-subtle" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProducerOfferCreationInteractive;
