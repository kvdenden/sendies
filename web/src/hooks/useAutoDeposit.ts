import { useEffect, useState } from "react";
import { zeroAddress, formatUnits, maxUint256 } from "viem";
import { useBalance, useReadContract, useWatchContractEvent } from "wagmi";
import { ghostVault, usdc } from "@/web3/contracts";
import useDeposit from "./useDeposit";
import useApprove from "./useApprove";
import { toast } from "sonner";
import useGhostBalance from "./useGhostBalance";
import { waitForTransactionReceipt } from "wagmi/actions";
import { wagmiConfig } from "@/web3/config";

export default function useAutoDeposit(address?: `0x${string}`) {
  const { data: balance, refetch: refetchBalance } = useBalance({ address, token: usdc.address });
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    ...usdc,
    functionName: "allowance",
    args: [address ?? zeroAddress, ghostVault.address],
  });

  const [ready, setReady] = useState(false);

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
    async function tryApprove() {
      if (!address) return;
      if (!balance) return;
      if (!allowance) return;

      try {
        if (allowance < maxUint256) {
          setReady(false);
          await approve(ghostVault.address);
          await refetchAllowance();
          setReady(true);
        } else {
          setReady(false);
        }
      } catch (error) {
        console.error("Approval failed", error);
      }
    }
    tryApprove();
  }, [approve, allowance, address]);

  useEffect(() => {
    async function tryDeposit() {
      if (!ready) return;
      if (!address) return;
      if (!balance) return;

      try {
        if (balance.value > 0) {
          await deposit(balance.value, address);
          await refetchBalance();
        }
      } catch (error) {
        console.error("Auto deposit failed", error);
      }
    }

    tryDeposit();
  }, [ready, deposit, balance, address]);
}
