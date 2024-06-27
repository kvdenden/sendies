import { useEffect } from "react";
import { zeroAddress, formatUnits, maxUint256 } from "viem";
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
    onLogs: (logs) => {
      console.log("USDC transfer logs:", logs);
      refetchBalance();
    },
    enabled: !!address,
  });

  const approve = useApprove();
  const deposit = useDeposit();

  useEffect(() => {
    if (!address) return;
    if (allowance === undefined) return;

    if (allowance !== maxUint256) approve(ghostVault.address).then(() => refetchAllowance());
  }, [approve, allowance, address]);

  useEffect(() => {
    if (!address) return;
    if (!balance) return;
    if (!allowance) return;

    if (balance.value > 0 && allowance >= balance.value) deposit(balance.value, address).then(() => refetchBalance());
  }, [deposit, allowance, balance, address]);
}
