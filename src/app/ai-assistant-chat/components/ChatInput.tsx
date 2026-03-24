'use client';

import { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ChatInputProps {
  onSendMessage: (content: string, imageUrl?: string, imageAlt?: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedImage) {
      onSendMessage(message, selectedImage?.url, selectedImage?.alt);
      setMessage('');
      setSelectedImage(null);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock image URL - in production, this would upload to storage
      const mockImageUrl = 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=800';
      const mockImageAlt = 'Granos de cacao venezolano de alta calidad con coloración marrón oscuro uniforme';
      setSelectedImage({ url: mockImageUrl, alt: mockImageAlt });
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="sticky bottom-0 bg-background border-t border-border p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-primary">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center shadow-md hover:bg-error/90 transition-colors"
            >
              <Icon name="XMarkIcon" size={16} />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 p-3 rounded-full hover:bg-muted transition-all animation-ease-out"
            aria-label="Adjuntar imagen"
          >
            <Icon name="PhotoIcon" size={24} className="text-muted-foreground" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu pregunta..."
              rows={1}
              className="
                w-full px-4 py-3 pr-12
                border border-input rounded-lg
                bg-background text-foreground
                placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-ring
                resize-none
                max-h-32
              "
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() && !selectedImage}
            className="
              flex-shrink-0 p-3 rounded-full
              bg-primary text-primary-foreground
              hover:bg-primary/90
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all animation-ease-out
              shadow-md hover:shadow-lg
            "
            aria-label="Enviar mensaje"
          >
            <Icon name="PaperAirplaneIcon" size={24} variant="solid" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          Presiona Enter para enviar, Shift+Enter para nueva línea
        </p>
      </form>
    </div>
  );
}
