import { useCallback } from "react";
import { usdc, ghostVault } from "@/web3/contracts";
import useSmartAccountClient from "./useSmartAccountClient";
import { encodeFunctionData } from "viem";

// deposit USDC in vault
export default function useDeposit() {
  const { data: smartAccountClient } = useSmartAccountClient();

  const deposit = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      if (!smartAccountClient) return null;

      return smartAccountClient.sendTransactions({
        transactions: [
          {
            to: usdc.address,
            value: BigInt(0),
            data: encodeFunctionData({
              abi: usdc.abi,
              functionName: "approve",
              args: [ghostVault.address, amount],
            }),
          },
          {
            to: ghostVault.address,
            value: BigInt(0),
            data: encodeFunctionData({
              abi: ghostVault.abi,
              functionName: "deposit",
              args: [amount, receiver],
            }),
          },
        ],
      });
    },
    [smartAccountClient]
  );

  return deposit;
}
