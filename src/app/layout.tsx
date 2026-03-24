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
      { url: '/assets/images/upscalemedia-transformed_1_-1763869666562.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/assets/images/upscalemedia-transformed_1_-1763869666562.png', sizes: '180x180', type: 'image/png' }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fzumamarke4103back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}
