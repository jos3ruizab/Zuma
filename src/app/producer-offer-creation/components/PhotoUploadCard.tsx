'use client';

import { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface PhotoUploadCardProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

const PhotoUploadCard = ({ photos, onPhotosChange }: PhotoUploadCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newPhotos = files.slice(0, 4 - photos.length).map((file) => URL.createObjectURL(file));
    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">Fotos del Producto</h2>
        <span className="text-sm text-muted-foreground">{photos.length}/4 fotos</span>
      </div>

      {/* Upload Area */}
      {photos.length < 4 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 mb-4 cursor-pointer
            transition-all animation-ease-out
            ${
              isDragging
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary hover:bg-muted'
            }
          `}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-4 bg-muted rounded-full">
              <Icon name="PhotoIcon" size={32} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">
                Arrastra fotos aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-muted-foreground">Máximo 4 imágenes (JPG, PNG)</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group aspect-square">
              <AppImage
                src={photo}
                alt={`Foto del producto ${index + 1} mostrando cultivo agrícola venezolano`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1.5 bg-error text-error-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Icon name="XMarkIcon" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploadCard;
