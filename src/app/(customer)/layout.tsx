'use client';

import { Navbar } from '@/components/customer/navbar';
import { Footer } from '@/components/customer/footer';
import { Chatbot } from '@/components/customer/chatbot';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
