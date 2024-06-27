import { useEffect } from "react";
import { useBalance, useWatchContractEvent } from "wagmi";
import { usdc } from "@/web3/contracts";
import useDeposit from "./useDeposit";

export default function useAutoDeposit(address?: `0x${string}`) {
  const { data: balance, refetch } = useBalance({ address, token: usdc.address });

  useWatchContractEvent({
    ...usdc,
    eventName: "Transfer",
    args: {
      to: address,
    },
    onLogs: (logs) => {
      console.log("USDC transfer logs:", logs);
      refetch();
    },
    enabled: !!address,
  });

  const deposit = useDeposit();

  useEffect(() => {
    if (!address) return;
    if (!balance) return;

    if (balance.value > 0) deposit(balance.value, address);
  }, [deposit, balance, address]);
}
