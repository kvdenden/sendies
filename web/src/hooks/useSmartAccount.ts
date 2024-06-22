import { useQuery } from "@tanstack/react-query";
import { createSmartAccount } from "@/web3/zerodev";
import useEmbeddedWallet from "./useEmbeddedWallet";

export default function useSmartAccount() {
  const { ready, wallet } = useEmbeddedWallet();

  return useQuery({
    queryKey: ["smartAccount", wallet?.address],
    queryFn: async () => {
      if (!wallet) return null;
      return createSmartAccount(wallet);
    },
    enabled: !!ready,
  });
}
