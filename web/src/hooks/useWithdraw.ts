import { useCallback } from "react";
import { useWriteContracts } from "wagmi/experimental";
import { ghostVault } from "@/web3/contracts";

// withdraw USDC from vault
export default function useWithdraw() {
  const { writeContracts } = useWriteContracts();

  const withdraw = useCallback(
    async (amount: bigint, receiver: `0x${string}`, owner: `0x${string}`) => {
      return writeContracts({
        contracts: [
          {
            ...ghostVault,
            functionName: "withdraw",
            args: [amount, receiver, owner],
          },
        ],
        capabilities: {
          paymasterService: {
            url: process.env.NEXT_PUBLIC_PAYMASTER_RPC,
          },
        },
      });
    },
    [writeContracts]
  );

  return withdraw;
}
