import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { ghostVault } from "@/web3/contracts";

export default function useSend() {
  const { writeContract } = useWriteContract();

  const send = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      console.log("send", amount, receiver);
      return writeContract({
        ...ghostVault,
        functionName: "transfer",
        args: [receiver, amount],
      });
    },
    [writeContract]
  );

  return send;
}
