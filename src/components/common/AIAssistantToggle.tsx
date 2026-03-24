'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface AIAssistantToggleProps {
  className?: string;
}

const AIAssistantToggle = ({ className = '' }: AIAssistantToggleProps) => {
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(false);

  const handleToggle = () => {
    router.push('/ai-assistant-chat');
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        fixed bottom-6 right-6 z-[400]
        w-14 h-14 rounded-full
        bg-primary text-primary-foreground
        shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all animation-ease-out
        hover:scale-110
        animation-pulse-subtle
        ${className}
      `}
      aria-label="Asistente AI"
      title="Asistente AI - Ayuda con precios y consultas"
    >
      <Icon name="SparklesIcon" size={28} variant="solid" />
      {hasUnread && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-background" />
      )}
    </button>
  );
};

export default AIAssistantToggle;
