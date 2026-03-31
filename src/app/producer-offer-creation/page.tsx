import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AIAssistantToggle from '@/components/common/AIAssistantToggle';
import ProducerOfferCreationInteractive from './components/ProducerOfferCreationInteractive';

export const metadata: Metadata = {
  title: 'Crear Oferta - ZUMA Marketplace',
  description:
    'Publica tus productos agrícolas venezolanos con precios justos recomendados por IA. Conecta directamente con compradores globales.',
};

export default function ProducerOfferCreationPage() {
  return (
    <>
      <Header userRole="producer" />
      <ProducerOfferCreationInteractive />
      <AIAssistantToggle />
    </>
  );
}
