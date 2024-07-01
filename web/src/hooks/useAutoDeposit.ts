import { useEffect } from "react";
import { zeroAddress, maxUint256 } from "viem";
import { useBalance, useReadContract, useWatchContractEvent } from "wagmi";
import { ghostVault, usdc } from "@/web3/contracts";
import useDeposit from "./useDeposit";
import useApprove from "./useApprove";

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
    onLogs: () => {
      refetchBalance();
    },
    enabled: !!address,
    pollingInterval: 10_000,
  });

  const approve = useApprove();
  const deposit = useDeposit();

  useEffect(() => {
    async function tryDeposit() {
      if (!address) return;

      if (allowance === undefined) return;
      if (balance === undefined) return;

      try {
        if (allowance < maxUint256) {
          await approve(ghostVault.address);
          await refetchAllowance();
        } else if (balance.value > 0) {
          await deposit(balance.value, address);
          await refetchBalance();
          await refetchAllowance();
        }
      } catch (error) {
        console.error("Auto deposit failed", error);
      }
    }

    tryDeposit();
  }, [deposit, approve, refetchAllowance, refetchBalance, allowance, balance, address]);
}
