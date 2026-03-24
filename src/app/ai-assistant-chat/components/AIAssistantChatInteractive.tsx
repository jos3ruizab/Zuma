'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
  imageAlt?: string;
}

interface QuickAction {
  id: string;
  label: string;
  query: string;
  icon: string;
}

export default function AIAssistantChatInteractive() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userRole, setUserRole] = useState<'producer' | 'buyer' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHydrated(true);

    // Simulate role detection from localStorage
    const role = 'producer' as 'producer' | 'buyer';
    setUserRole(role);

    // Initial greeting message
    const greeting: Message = {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente IA de ZUMA Marketplace. Puedo ayudarte con:\n\n• Análisis de precios de mercado\n• Evaluación de calidad de cultivos\n• Estrategias de venta\n• Navegación de la plataforma\n\n¿En qué puedo asistirte hoy?',
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string, imageUrl?: string, imageAlt?: string) => {
    if (!content.trim() && !imageUrl) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
      imageUrl,
      imageAlt
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content, imageUrl, userRole);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleClose = () => {
    router.back();
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando asistente...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header userRole={userRole} />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ChatHeader onClose={handleClose} />

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <MessageList messages={messages} isTyping={isTyping} />
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <QuickActions onActionClick={handleQuickAction} userRole={userRole} />
        )}

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

function generateAIResponse(query: string, hasImage: boolean | undefined, role: 'producer' | 'buyer' | null): string {
  const lowerQuery = query.toLowerCase();

  if (hasImage) {
    return 'He analizado tu imagen. Basándome en la calidad visual:\n\n• **Calidad:** Premium/Alta\n• **Estado:** Óptimo para comercialización\n• **Recomendación de precio:** $45-55 USD/kg\n• **Certificación sugerida:** Orgánico\n\nLa coloración y textura indican excelente maduración. Te recomiendo destacar estas características en tu oferta.';
  }

  if (lowerQuery.includes('precio') || lowerQuery.includes('mercado')) {
    return 'Según el análisis de mercado actual (Noviembre 2025):\n\n**Cacao Premium:**\n• Precio internacional: $48-52 USD/kg\n• Demanda: Alta (↑15% vs mes anterior)\n• Tendencia: Alcista\n\n**Café Especial:**\n• Precio internacional: $38-42 USD/kg\n• Demanda: Muy Alta\n• Tendencia: Estable\n\n**Plátano Orgánico:**\n• Precio internacional: $12-15 USD/kg\n• Demanda: Moderada\n• Tendencia: Estable\n\n¿Necesitas análisis específico para algún cultivo?';
  }

  if (lowerQuery.includes('calidad') || lowerQuery.includes('cultivo')) {
    return 'Para evaluar la calidad de tu cultivo, considera:\n\n**Factores Clave:**\n• Coloración uniforme y brillante\n• Ausencia de defectos o manchas\n• Tamaño consistente\n• Aroma característico\n• Humedad adecuada (10-12%)\n\n**Certificaciones Recomendadas:**\n• Orgánico (+25% precio)\n• Comercio Justo (+15% precio)\n• Denominación de Origen\n\n¿Quieres que analice fotos de tu cultivo?';
  }

  if (lowerQuery.includes('vender') || lowerQuery.includes('oferta')) {
    return 'Consejos para crear una oferta exitosa:\n\n**1. Fotografías de Calidad**\n• Usa luz natural\n• Muestra diferentes ángulos\n• Incluye close-ups de textura\n\n**2. Descripción Detallada**\n• Especifica origen y variedad\n• Menciona certificaciones\n• Destaca características únicas\n\n**3. Precio Competitivo**\n• Usa "Precio Justo IA" para referencia\n• Considera costos de envío\n• Ofrece descuentos por volumen\n\n¿Necesitas ayuda con algún aspecto específico?';
  }

  if (role === 'buyer' && (lowerQuery.includes('comprar') || lowerQuery.includes('productor'))) {
    return 'Para conectar con productores:\n\n**1. Explora el Marketplace**\n• Filtra por tipo de cultivo\n• Revisa certificaciones\n• Compara precios\n\n**2. Contacto Directo**\n• Usa WhatsApp integrado\n• Pregunta sobre disponibilidad\n• Solicita muestras si es necesario\n\n**3. Verificación**\n• Revisa perfil del productor\n• Lee reseñas de otros compradores\n• Confirma términos de envío\n\n¿Buscas algún cultivo específico?';
  }

  return 'Entiendo tu consulta. Como asistente especializado en agricultura venezolana, puedo ayudarte con:\n\n• **Análisis de precios** en tiempo real\n• **Evaluación de calidad** mediante fotos\n• **Estrategias de venta** personalizadas\n• **Conexión con compradores** internacionales\n• **Certificaciones** y mejores prácticas\n\n¿Podrías darme más detalles sobre lo que necesitas?';
}
