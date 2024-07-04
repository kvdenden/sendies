import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { ghostVault } from "@/web3/contracts";
import useSmartWallet from "./useSmartWallet";
import useGhostBalance from "./useGhostBalance";

// deposit USDC in vault
export default function useDeposit() {
  const { address } = useSmartWallet();
  const balance = useGhostBalance(address);
  const { writeContractAsync } = useWriteContract();

  const deposit = useCallback(
    async (amount: bigint) => {
      if (!address) return;

      console.log("deposit", amount);
      // balance.update(amount, false);

      return writeContractAsync({
        ...ghostVault,
        functionName: "deposit",
        args: [amount, address],
      }).then(() => balance.refresh());
    },
    [address, writeContractAsync]
  );

  return deposit;
}
