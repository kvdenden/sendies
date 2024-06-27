"use client";
import { createContext, useEffect, useState } from "react";
import { useEmbeddedSmartAccountConnector } from "@privy-io/wagmi";
import type { EIP1193Provider } from "viem";
import { useAccount } from "wagmi";

import { getSmartAccountProvider } from "@/web3/zerodev";

type SmartWalletContextType = {
  ready: boolean;
  address?: `0x${string}`;
};

const SmartWalletContext = createContext<SmartWalletContextType>({ ready: false });

export function SmartWalletProvider({ children }: { children: React.ReactNode }) {
  useEmbeddedSmartAccountConnector({
    getSmartAccountFromSigner: async ({ signer }: { signer: EIP1193Provider }) => {
      const kernelProvider = await getSmartAccountProvider({ signer });
      return kernelProvider as EIP1193Provider;
    },
  });

  const account = useAccount();
  const ready = account.isConnected && account.connector?.id === "io.privy.smart_wallet";

  const [value, setValue] = useState<SmartWalletContextType>({ ready: false });
  useEffect(() => {
    setValue({ ready, address: account.address });
  }, [ready, account.address]);

  return <SmartWalletContext.Provider value={value}>{children}</SmartWalletContext.Provider>;
}

export default SmartWalletContext;
