import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Masca Playground',
  description: 'Play with core Masca functionalities',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-12 h-full min-h-screen w-screen dark text-foreground bg-background">
          <Providers>{props.children}</Providers>
        </main>
      </body>
    </html>
  );
}
