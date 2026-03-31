import type { Metadata } from 'next';
import { Suspense } from 'react';
import OfferDetailsInteractive from './components/OfferDetailsInteractive';

export const metadata: Metadata = {
  title: 'Detalles de Oferta - ZUMA Marketplace',
  description:
    'Información completa del producto agrícola incluyendo especificaciones, precios, evaluación de calidad IA, y datos del productor para facilitar la compra directa.',
};

export default function OfferDetailsPage() {
  return (
    <Suspense>
      <OfferDetailsInteractive />
    </Suspense>
  );
}
