"use client";

import { useQuery } from "@tanstack/react-query";
import { createSmartAccount } from "@/web3/zerodev";
import useEmbeddedWallet from "./useEmbeddedWallet";

export default function useSmartAccount() {
  const embeddedWallet = useEmbeddedWallet();

  return useQuery({
    queryKey: ["smartAccount", embeddedWallet?.address],
    queryFn: async () => {
      if (!embeddedWallet) return null;
      return createSmartAccount(embeddedWallet);
    },
    enabled: !!embeddedWallet,
  });
}
