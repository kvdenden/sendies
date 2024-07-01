"use client";

import { formatEther, formatUnits } from "viem";
import { useBalance, useWatchContractEvent } from "wagmi";

import { Skeleton } from "@/components/ui/skeleton";

import { ghostVault } from "@/web3/contracts";
import useSmartWallet from "@/hooks/useSmartWallet";
import SendDrawer from "../SendDrawer";
import useGhostBalance from "@/hooks/useGhostBalance";
import DepositDrawer from "../DepositDrawer";
import WithdrawDrawer from "../WithdrawDrawer";
import { toast } from "sonner";

function formatBalance(balance: { value: bigint; decimals: number }) {
  const number = Number(formatUnits(balance.value, balance.decimals));

  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function BalanceScreen() {
  const { address } = useSmartWallet();

  const { balance, refresh } = useGhostBalance(address);

  useWatchContractEvent({
    ...ghostVault,
    eventName: "Transfer",
    args: {
      to: address,
    },
    onLogs: (logs) => {
      logs.forEach((log) => {
        // console.log("Transfer in logs", log);
        if (log.args.amount > 0) {
          const amount = formatBalance({ value: log.args.amount, decimals: 6 });
          toast.info(`Received ${amount}! 🎉`);
        }
      });
      refresh();
    },
    strict: true,
    enabled: !!address,
    pollingInterval: 10_000,
  });

  useWatchContractEvent({
    ...ghostVault,
    eventName: "Transfer",
    args: {
      from: address,
    },
    onLogs: (logs) => {
      // logs.forEach((log) => {
      //   console.log("Transfer in logs", log);
      //   if (log.args.amount > 0) {
      //     const amount = formatBalance({ value: log.args.amount, decimals: 6 });
      //     toast.info(`Sent ${amount}!`);
      //   }
      // });
      refresh();
    },
    strict: true,
    enabled: !!address,
    pollingInterval: 10_000,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="py-16">
        <h1 className="text-5xl font-bold tracking-tight">
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
