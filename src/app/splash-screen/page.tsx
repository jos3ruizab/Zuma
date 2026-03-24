import type { Metadata } from 'next';
import SplashScreenInteractive from './components/SplashScreenInteractive';

export const metadata: Metadata = {
  title: 'Bienvenido - ZUMA Marketplace',
  description: 'Plataforma de marketplace agrícola impulsada por IA que conecta productores venezolanos con compradores globales para cacao, café y plátano.',
};

export default function SplashScreenPage() {
  return <SplashScreenInteractive />;
}
