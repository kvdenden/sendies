"use client";

import { formatUnits } from "viem";
import { useWatchContractEvent } from "wagmi";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";

import { ghostVault } from "@/web3/contracts";
import useSmartWallet from "@/hooks/useSmartWallet";
import useGhostBalance from "@/hooks/useGhostBalance";
import SendDrawer from "../SendDrawer";
import DepositDrawer from "../DepositDrawer";
import WithdrawDrawer from "../WithdrawDrawer";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "../ui/loading-spinner";

function formatBalance(balance: { value: bigint; decimals: number }) {
  const number = Number(formatUnits(balance.value, balance.decimals));

  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function BalanceScreen() {
  const { address } = useSmartWallet();

  const { balance, prevBalance, dirty } = useGhostBalance(address);

  useEffect(() => {
    if (!balance || !prevBalance) return;
    if (balance.value > prevBalance.value) {
      const amount = formatBalance({ value: balance.value - prevBalance.value, decimals: balance.decimals });
      toast.info(`Received ${amount}! 🎉`);
    }
  }, [balance, prevBalance]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="py-16">
        <h1 className={cn("text-5xl font-bold tracking-tight", dirty && "text-gray-600")}>
          {balance ? formatBalance(balance) : <Skeleton className="w-36 h-12" />}
        </h1>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-[300px] ">
        <DepositDrawer />
        <WithdrawDrawer />
        <div className="col-span-2">
          <SendDrawer />
        </div>
      </div>
    </div>
  );
}
