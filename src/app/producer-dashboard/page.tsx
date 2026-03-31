import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AIAssistantToggle from '@/components/common/AIAssistantToggle';
import ProducerDashboardInteractive from './components/ProducerDashboardInteractive';

export const metadata: Metadata = {
  title: 'Panel de Productor - ZUMA Marketplace',
  description:
    'Gestiona tus ofertas activas, monitorea ventas y visualiza el desempeño de tus productos en el marketplace agrícola ZUMA.',
};

export default function ProducerDashboardPage() {
  return (
    <>
      <Header userRole="producer" />
      <ProducerDashboardInteractive />
      <AIAssistantToggle />
    </>
  );
}
