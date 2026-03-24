'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
  imageAlt?: string;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const formatTime = (date: Date) => {
    if (!isHydrated) return '';
    return date.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`
              max-w-[85%] md:max-w-[70%] rounded-lg px-4 py-3
              ${message.role === 'user' ?'bg-primary text-primary-foreground' :'bg-card border border-border text-foreground'
              }
            `}
          >
            {message.imageUrl && (
              <div className="mb-3 rounded-md overflow-hidden">
                <AppImage
                  src={message.imageUrl}
                  alt={message.imageAlt || 'Imagen enviada por el usuario'}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            
            <p className="text-sm whitespace-pre-line leading-relaxed">
              {message.content}
            </p>
            
            <div className={`flex items-center gap-1 mt-2 text-xs ${
              message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}>
              <span>{formatTime(message.timestamp)}</span>
              {message.role === 'user' && (
                <Icon name="CheckIcon" size={14} className="ml-1" />
              )}
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-card border border-border rounded-lg px-4 py-3 max-w-[85%] md:max-w-[70%]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-muted-foreground">Escribiendo...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
