import { useEffect, useMemo, useState } from "react";
import { type ConnectedWallet, getEmbeddedConnectedWallet, useWallets } from "@privy-io/react-auth";

type EmbeddedWalletType = {
  ready: boolean;
  wallet?: ConnectedWallet;
};

export default function useEmbeddedWallet() {
  const { ready, wallets } = useWallets();
  const wallet = useMemo(() => (ready ? getEmbeddedConnectedWallet(wallets) : null), [ready, wallets]);

  const [value, setValue] = useState<EmbeddedWalletType>({ ready: false });
  useEffect(() => {
    if (ready && wallet) {
      setValue({ ready, wallet });
    } else {
      setValue({ ready });
    }
  }, [ready, wallet]);

  return value;
}
