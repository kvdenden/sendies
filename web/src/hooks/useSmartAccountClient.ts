import { useQuery } from "@tanstack/react-query";
import { createSmartAccountClient } from "@/web3/zerodev";
import useEmbeddedWallet from "./useEmbeddedWallet";

export default function useSmartAccountClient() {
  const { ready, wallet } = useEmbeddedWallet();

  return useQuery({
    queryKey: ["smartAccountClient", wallet?.address],
    queryFn: async () => {
      if (!wallet) return null;
      return createSmartAccountClient(wallet);
    },
    enabled: !!ready,
  });
}
