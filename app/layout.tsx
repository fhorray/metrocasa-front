import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ImoveisProvider } from '@/contexts/imoveis-context';
import Image from 'next/image';
import Link from 'next/link';

import { CSPostHogProvider } from './providers';
import PostHogPageView from './PostHogPageView';
import { Suspense } from 'react';

// React Query
import Providers from '@/utils/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Construtora Metrocasa',
  description: 'Apartamentos em todas as regiões de São Paulo',
  icons: {
    icon: '/metrocasa-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <CSPostHogProvider>
        <body className={inter.className + 'px-[15px]'}>
          <ImoveisProvider>
            <Suspense>
              <div>
                <Providers>{children}</Providers>
              </div>

              {/* Whatsapp Icon */}
              <Link
                href="https://api.whatsapp.com/send?phone=551132142300&text=Ol%C3%A1%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20empreendimentos!"
                className="fixed right-7 bottom-7 z-40 animate-in"
              >
                <Image
                  src={'/icons/whatsapp-color.svg'}
                  alt="WhatsApp Metrocasa"
                  width={60}
                  height={60}
                  className="drop-shadow-2xl drop-shadow-main-red"
                  priority
                />
              </Link>
            </Suspense>
          </ImoveisProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
