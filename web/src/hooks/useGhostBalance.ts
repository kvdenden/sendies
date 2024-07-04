import { ghostVault } from "@/web3/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { createGlobalState, usePreviousDistinct } from "react-use";
import { useBalance } from "wagmi";

type BalanceType = {
  value: bigint;
  decimals: number;
};

type GhostBalanceType = {
  balance?: BalanceType;
  prevBalance?: BalanceType;
  dirty: boolean;
  update: Function;
  refresh: Function;
};

const useDirty = createGlobalState<boolean>(false);

export default function useGhostBalance(address?: `0x${string}`) {
  const [dirty, setDirty] = useDirty();

  const queryClient = useQueryClient();
  const query = useBalance({
    address,
    token: ghostVault.address,
    query: {
      refetchInterval: 4_000,
      enabled: !dirty,
    },
  });

  const { data: balance, queryKey } = query;
  const prevBalance = usePreviousDistinct(balance);

  const update = useCallback(
    async (delta: bigint, out: boolean = false) => {
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, (old: BalanceType) => ({
        value: out ? old.value - delta : old.value + delta,
        decimals: old.decimals,
      }));
      setDirty(true);
    },
    [queryClient, queryKey]
  );

  const refresh = useCallback(async () => {
    return queryClient.invalidateQueries({ queryKey }).then(() => {
      setDirty(false);
    });
  }, [queryClient, queryKey]);

  const value = useMemo<GhostBalanceType>(
    () => ({ balance, prevBalance, dirty, update, refresh }),
    [balance, prevBalance, dirty, update, refresh]
  );

  return value;
}
