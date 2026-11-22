import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'KREASIHUB — Sistem Sayembara & Inovasi Agensi',
  description:
    'Platform Sayembara & Inovasi Internal Perusahaan untuk agensi kreatif & digital. Publikasikan tantangan operasional, kumpulkan inovasi tim, dan bangun perpustakaan aset terstandar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#03060F] text-white antialiased font-sans selection:bg-[#0057FF] selection:text-white relative">
        {/* Animated Background Canvas */}
        <AnimatedBackground />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <AppProvider>
            <Suspense fallback={<div className="h-16 bg-[#0057FF]" />}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<div className="flex-1 p-8 text-center text-[#8B95A5] text-xs font-bold uppercase">Memuat sistem...</div>}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
