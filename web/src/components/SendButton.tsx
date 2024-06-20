"use client";

import useSmartAccount from "@/hooks/useSmartAccount";
import useSmartAccountClient from "@/hooks/useSmartAccountClient";
import { usdc } from "@/web3/contracts";
import { useCallback, useMemo } from "react";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { useBalance } from "wagmi";

export default function SendButton() {
  const { data: smartAccount } = useSmartAccount();
  const { data: smartAccountClient } = useSmartAccountClient();

  const ethBalance = useBalance({ address: smartAccount?.address });
  const usdcBalance = useBalance({ address: smartAccount?.address, token: usdc.address });

  console.log("eth balance", ethBalance);
  console.log("usdc balance", usdcBalance);

  const send = useCallback(async () => {
    if (!smartAccountClient) return;

    const txHash = await smartAccountClient.sendTransaction({
      to: "0xC1cE5E3929A2764fc7aEfD1a2A993d4269eCf58d",
      value: parseEther("0.01"),
    });

    console.log("txHash", txHash);
  }, [smartAccountClient]);

  const sendUSDC = useCallback(async () => {
    if (!smartAccountClient) return;

    const txHash = await smartAccountClient.writeContract({
      ...usdc,
      functionName: "transfer",
      args: ["0xC1cE5E3929A2764fc7aEfD1a2A993d4269eCf58d", parseUnits("1", 6)],
    });

    console.log("txHash", txHash);
  }, [smartAccountClient]);

  return (
    <>
      <p>ETH balance: {ethBalance.data && formatUnits(ethBalance.data.value, ethBalance.data.decimals)}</p>
      <p>USDC balance: {usdcBalance.data && formatUnits(usdcBalance.data.value, usdcBalance.data.decimals)}</p>
      <button onClick={() => sendUSDC()}>Send</button>
    </>
  );
}
