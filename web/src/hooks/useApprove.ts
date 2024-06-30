import { useCallback } from "react";
import { maxUint256 } from "viem";
import { useWriteContract } from "wagmi";
import { usdc } from "@/web3/contracts";

// set unlimited USDC approval
export default function useApprove() {
  const { writeContractAsync } = useWriteContract();

  const approve = useCallback(
    async (spender: `0x${string}`) => {
      console.log("approve", spender);

      return writeContractAsync({
        ...usdc,
        functionName: "approve",
        args: [spender, maxUint256],
      });
    },
    [writeContractAsync]
  );

  return approve;
}
