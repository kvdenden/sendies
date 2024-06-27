import { useCallback } from "react";
import { useWriteContracts } from "wagmi/experimental";
import { ghostVault } from "@/web3/contracts";

export default function useSend() {
  const { writeContracts } = useWriteContracts();

  const send = useCallback(
    async (amount: bigint, receiver: `0x${string}`) => {
      console.log("send", amount, receiver);
      return writeContracts({
        contracts: [
          {
            ...ghostVault,
            functionName: "transfer",
            args: [receiver, amount],
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

  return send;
}
