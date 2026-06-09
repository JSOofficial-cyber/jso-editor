import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JSO Editor - Premium Image Editing',
  description: 'Professional image editing with AI background removal, magic eraser, and watermarking',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#D4A574" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-secondary text-accent">
        {children}
      </body>
    </html>
  );
}
