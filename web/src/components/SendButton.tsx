"use client";

import { useCallback } from "react";
import { formatUnits, parseEther, parseUnits } from "viem";
import { useBalance } from "wagmi";

import { Button } from "@/components/ui/button";

import useSmartAccountClient from "@/hooks/useSmartAccountClient";
import { usdc } from "@/web3/contracts";

export default function SendButton() {
  const { data: smartAccountClient } = useSmartAccountClient();

  const ethBalance = useBalance({ address: smartAccountClient?.account.address });
  const usdcBalance = useBalance({ address: smartAccountClient?.account.address, token: usdc.address });

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
      <Button onClick={() => sendUSDC()}>Send</Button>
    </>
  );
}
