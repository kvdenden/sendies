import { useCallback } from "react";
import { usdc, ghostVault } from "@/web3/contracts";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { formatUnits } from "viem";

// deposit USDC in vault
export default function useDeposit() {
  const { writeContracts } = useWriteContracts();

  const deposit = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      console.log("deposit", formatUnits(amount, 6));
      return writeContracts({
        contracts: [
          {
            ...usdc,
            functionName: "approve",
            args: [ghostVault.address, amount],
          },
          {
            ...ghostVault,
            functionName: "deposit",
            args: [amount, receiver],
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

  return deposit;
}
