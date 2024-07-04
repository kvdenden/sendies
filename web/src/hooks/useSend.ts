import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { ghostVault } from "@/web3/contracts";
import useSmartWallet from "./useSmartWallet";
import useGhostBalance from "./useGhostBalance";

export default function useSend() {
  const { address } = useSmartWallet();
  const balance = useGhostBalance(address);

  const { writeContractAsync } = useWriteContract();

  const send = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      if (!address) return;

      console.log("send", amount, receiver);
      balance.update(amount, true);

      return writeContractAsync({
        ...ghostVault,
        functionName: "transfer",
        args: [receiver, amount],
      }).then(() => balance.refresh());
    },
    [address, writeContractAsync]
  );

  return send;
}
