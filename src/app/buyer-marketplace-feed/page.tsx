import type { Metadata } from 'next';
import MarketplaceFeedInteractive from './components/MarketplaceFeedInteractive';

export const metadata: Metadata = {
  title: 'Marketplace - ZUMA',
  description:
    'Descubre y conecta con productores venezolanos de café, cacao y plátano. Explora ofertas verificadas con precios justos y certificaciones orgánicas.',
};

export default function BuyerMarketplaceFeedPage() {
  return <MarketplaceFeedInteractive />;
}
