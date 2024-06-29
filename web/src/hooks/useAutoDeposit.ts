import { useEffect } from "react";
import { zeroAddress, formatUnits, maxUint256 } from "viem";
import { useBalance, useReadContract, useWatchContractEvent } from "wagmi";
import { ghostVault, usdc } from "@/web3/contracts";
import useDeposit from "./useDeposit";
import useApprove from "./useApprove";
import { toast } from "sonner";
import useGhostBalance from "./useGhostBalance";

export default function useAutoDeposit(address?: `0x${string}`) {
  const { data: balance, refetch: refetchBalance } = useBalance({ address, token: usdc.address });
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    ...usdc,
    functionName: "allowance",
    args: [address ?? zeroAddress, ghostVault.address],
  });

  useWatchContractEvent({
    ...usdc,
    eventName: "Transfer",
    args: {
      to: address,
    },
    onLogs: (logs) => {
      console.log("USDC transfer logs:", logs);
      refetchBalance();
    },
    enabled: !!address,
    pollingInterval: 10_000,
  });

  const approve = useApprove();
  const deposit = useDeposit();

  useEffect(() => {
    if (!address) return;
    if (allowance === undefined) return;
  }, [approve, allowance, address]);

  useEffect(() => {
    async function approveAndDeposit() {
      if (!address) return;
      if (!balance) return;
      if (!allowance) return;

      try {
        if (allowance !== maxUint256) {
          await approve(ghostVault.address);
          refetchAllowance();
        }
        if (balance.value > 0) {
          await deposit(balance.value, address);
          refetchBalance();
        }
      } catch (error) {
        console.error("Auto deposit failed", error);
      }
    }

    approveAndDeposit();
  }, [deposit, allowance, balance, address]);
}
