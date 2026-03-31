import type { Metadata } from 'next';
import AIAssistantChatInteractive from './components/AIAssistantChatInteractive';

export const metadata: Metadata = {
  title: 'Asistente IA - ZUMA Marketplace',
  description:
    'Obtén ayuda inteligente sobre precios de mercado, calidad de cultivos y estrategias de venta con nuestro asistente IA powered by Google Gemini.',
};

export default function AIAssistantChatPage() {
  return <AIAssistantChatInteractive />;
}
