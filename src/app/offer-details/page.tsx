import type { Metadata } from 'next';
import OfferDetailsInteractive from './components/OfferDetailsInteractive';

export const metadata: Metadata = {
  title: 'Detalles de Oferta - ZUMA Marketplace',
  description: 'Información completa del producto agrícola incluyendo especificaciones, precios, evaluación de calidad IA, y datos del productor para facilitar la compra directa.',
};

export default function OfferDetailsPage() {
  return <OfferDetailsInteractive />;
}
