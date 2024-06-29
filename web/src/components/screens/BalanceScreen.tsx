"use client";

import { formatEther, formatUnits } from "viem";
import { useBalance, useWatchContractEvent } from "wagmi";

import { Button } from "@/components/ui/button";

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
  // const { data: balance, refetch } = useBalance({ address, token: ghostVault.address });
  // const { data: ethBalance } = useBalance({ address });
  // console.log("eth balance", ethBalance && formatEther(ethBalance.value));

  useWatchContractEvent({
    ...ghostVault,
    eventName: "Transfer",
    args: {
      to: address,
    },
    onLogs: () => {
      toast.success("You received some monies! 🎉");
      refresh();
    },
    enabled: !!address,
    pollingInterval: 10_000,
  });

  useWatchContractEvent({
    ...ghostVault,
    eventName: "Transfer",
    args: {
      from: address,
    },
    onLogs: () => refresh(),
    enabled: !!address,
    pollingInterval: 10_000,
  });

  if (!balance) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="py-16">
        <h1 className="text-5xl font-bold tracking-tight">{formatBalance(balance)}</h1>
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
