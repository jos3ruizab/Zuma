'use client';

import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="sticky top-16 z-40 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/images/upscalemedia-transformed_1_-1763869666562.png"
              alt="ZUMA logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-heading text-lg font-semibold text-foreground">
              Asistente IA ZUMA
            </h1>
            <p className="text-xs text-muted-foreground">Powered by Google Gemini</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-md transition-all animation-ease-out"
          aria-label="Cerrar chat"
        >
          <Icon name="XMarkIcon" size={24} />
        </button>
      </div>
    </div>
  );
}
