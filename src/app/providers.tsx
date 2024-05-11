'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from '@/app/components/ui/sonner';

import { config } from '@/wagmi';

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      <WagmiProvider config={config}>
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
        </NextUIProvider>
      </WagmiProvider>
      <Toaster />
    </div>
  );
}
