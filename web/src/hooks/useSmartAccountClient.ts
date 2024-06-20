import { useQuery } from "@tanstack/react-query";
import { createSmartAccountClient } from "@/web3/zerodev";
import useEmbeddedWallet from "./useEmbeddedWallet";

export default function useSmartAccountClient() {
  const embeddedWallet = useEmbeddedWallet();

  return useQuery({
    queryKey: ["smartAccountClient", embeddedWallet?.address],
    queryFn: async () => {
      if (!embeddedWallet) return null;
      return createSmartAccountClient(embeddedWallet);
    },
    enabled: !!embeddedWallet,
  });
}
