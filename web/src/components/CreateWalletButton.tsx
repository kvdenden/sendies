"use client";

import { useCreateWallet, usePrivy } from "@privy-io/react-auth";
import useEmbeddedWallet from "@/hooks/useEmbeddedWallet";

export default function CreateWalletButton() {
  const { ready, authenticated } = usePrivy();
  const { createWallet } = useCreateWallet();
  const embeddedWallet = useEmbeddedWallet();

  const enabled = ready && authenticated && !embeddedWallet;
  return (
    <button disabled={!enabled} onClick={createWallet}>
      Create wallet
    </button>
  );
}
