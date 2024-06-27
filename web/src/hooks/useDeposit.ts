import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { ghostVault } from "@/web3/contracts";

// deposit USDC in vault
export default function useDeposit() {
  const { writeContract } = useWriteContract();

  const deposit = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      console.log("deposit", amount, receiver);

      return writeContract({
        ...ghostVault,
        functionName: "deposit",
        args: [amount, receiver],
      });
    },
    [writeContract]
  );

  return deposit;
}
