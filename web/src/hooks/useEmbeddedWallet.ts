"use client";

import { useMemo } from "react";
import { getEmbeddedConnectedWallet, useWallets } from "@privy-io/react-auth";

export default function useEmbeddedWallet() {
  const { ready, wallets } = useWallets();
  const embeddedWallet = useMemo(() => (ready ? getEmbeddedConnectedWallet(wallets) : null), [ready, wallets]);

  return embeddedWallet;
}
