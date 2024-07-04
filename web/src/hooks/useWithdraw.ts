import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { ghostVault } from "@/web3/contracts";
import useSmartWallet from "./useSmartWallet";
import useGhostBalance from "./useGhostBalance";

// withdraw USDC from vault
export default function useWithdraw() {
  const { address } = useSmartWallet();
  const balance = useGhostBalance(address);

  const { writeContractAsync } = useWriteContract();

  const withdraw = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      if (!address) return;

      console.log("withdraw", amount, receiver);
      balance.update(amount, true);

      return writeContractAsync({
        ...ghostVault,
        functionName: "withdraw",
        args: [amount, receiver, address],
      }).then(() => balance.refresh());
    },
    [address, writeContractAsync]
  );

  return withdraw;
}
