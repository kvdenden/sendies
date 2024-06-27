import { useCallback } from "react";
import { maxUint256 } from "viem";
import { useWriteContract } from "wagmi";
import { usdc } from "@/web3/contracts";

// set unlimited USDC approval
export default function useApprove() {
  const { writeContract } = useWriteContract();

  const approve = useCallback(
    async (spender: `0x${string}`) => {
      console.log("approve", spender);

      return writeContract({
        ...usdc,
        functionName: "approve",
        args: [spender, maxUint256],
      });
    },
    [writeContract]
  );

  return approve;
}
