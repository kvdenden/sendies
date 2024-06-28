import { ghostVault } from "@/web3/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useBalance } from "wagmi";

type GhostBalanceType = {
  balance?: {
    value: bigint;
    decimals: number;
  };
  refresh: () => Promise<void>;
};

export default function useGhostBalance(address?: `0x${string}`) {
  const queryClient = useQueryClient();
  const { data: balance, queryKey } = useBalance({ address, token: ghostVault.address });

  const refresh = useCallback(() => queryClient.invalidateQueries({ queryKey }), [queryClient, queryKey]);

  const value = useMemo<GhostBalanceType>(() => ({ balance, refresh }), [balance, refresh]);

  return value;
}
