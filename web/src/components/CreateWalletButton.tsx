"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useCreateWallet, usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import useEmbeddedWallet from "@/hooks/useEmbeddedWallet";

export default function CreateWalletButton() {
  const { ready, authenticated } = usePrivy();
  const { createWallet } = useCreateWallet({
    onError: () => setLoading(false),
  });
  const embeddedWallet = useEmbeddedWallet();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (embeddedWallet.wallet) setLoading(false);
  }, [embeddedWallet.wallet]);

  const handleCreateWallet = useCallback(() => {
    setLoading(true);
    createWallet();
  }, [createWallet]);

  const enabled = ready && authenticated && embeddedWallet.ready && !embeddedWallet.wallet && !loading;
  return (
    <Button className="w-full" disabled={!enabled} onClick={handleCreateWallet}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create wallet"}
    </Button>
  );
}
