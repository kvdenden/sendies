import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { ghostVault } from "@/web3/contracts";

export default function useSend() {
  const { writeContractAsync } = useWriteContract();

  const send = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      console.log("send", amount, receiver);
      return writeContractAsync({
        ...ghostVault,
        functionName: "transfer",
        args: [receiver, amount],
      });
    },
    [writeContractAsync]
  );

  return send;
}
