import React from 'react';
import '../styles/index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'ZUMA - Marketplace Agrícola',
  description: 'Plataforma de marketplace agrícola venezolano conectando productores y compradores',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      {
        url: '/assets/images/upscalemedia-transformed_1_-1763869666562.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/assets/images/upscalemedia-transformed_1_-1763869666562.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
