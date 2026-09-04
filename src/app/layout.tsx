import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ui/toast';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'NewVisa — Immigration & Travel Booking Platform',
    template: '%s | NewVisa',
  },
  description: 'Your journey abroad starts here. Immigration, visa assistance, and travel booking — all in one intelligent platform.',
  keywords: ['visa', 'immigration', 'travel', 'flight booking', 'hotel booking', 'study abroad', 'work abroad', 'permanent residency'],
  authors: [{ name: 'NewVisa' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://newvisa.com',
    siteName: 'NewVisa',
    title: 'NewVisa — Immigration & Travel Booking Platform',
    description: 'Your journey abroad starts here. Immigration, visa assistance, and travel booking — all in one intelligent platform.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
