import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { ghostVault } from "@/web3/contracts";

// withdraw USDC from vault
export default function useWithdraw() {
  const { writeContract } = useWriteContract();

  const withdraw = useCallback(
    async (amount: bigint, receiver: `0x${string}`, owner: `0x${string}`) => {
      return writeContract({
        ...ghostVault,
        functionName: "withdraw",
        args: [amount, receiver, owner],
      });
    },
    [writeContract]
  );

  return withdraw;
}
