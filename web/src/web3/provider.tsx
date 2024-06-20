"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { privyConfig, wagmiConfig, zdConfig } from "./config";
import { ZeroDevProvider } from "@zerodev/waas";

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ZeroDevProvider config={zdConfig}>{children}</ZeroDevProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
