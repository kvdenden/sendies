"use client";

import { formatEther, formatUnits } from "viem";
import { useBalance, useWatchContractEvent } from "wagmi";

import { Button } from "@/components/ui/button";

import { ghostVault } from "@/web3/contracts";
import useSmartWallet from "@/hooks/useSmartWallet";

function formatBalance(balance: { value: bigint; decimals: number }) {
  const number = Number(formatUnits(balance.value, balance.decimals));

  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function BalanceScreen() {
  const { address } = useSmartWallet();
  const { data: balance, refetch } = useBalance({ address, token: ghostVault.address });
  const { data: ethBalance } = useBalance({ address });

  console.log("eth balance", ethBalance && formatEther(ethBalance.value));

  useWatchContractEvent({
    ...ghostVault,
    eventName: "Transfer",
    args: {
      to: address,
    },
    onLogs: () => refetch(),
    enabled: !!address,
  });

  useWatchContractEvent({
    ...ghostVault,
    eventName: "Transfer",
    args: {
      from: address,
    },
    onLogs: () => refetch(),
    enabled: !!address,
  });

  if (!balance) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="py-32">
        <h1 className="text-5xl font-bold tracking-tight">{formatBalance(balance)}</h1>
      </div>
      <Button className="w-full">Send money</Button>
    </div>
  );
}
