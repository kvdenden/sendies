"use client";

import { formatUnits } from "viem";
import { useBalance } from "wagmi";

import { Button } from "@/components/ui/button";

import { ghostVault, usdc } from "@/web3/contracts";
import useSmartAccount from "@/hooks/useSmartAccount";
import useDeposit from "@/hooks/useDeposit";
import { useEffect } from "react";

function formatBalance(balance: { value: bigint; decimals: number }) {
  const number = Number(formatUnits(balance.value, balance.decimals));

  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function BalanceScreen() {
  const { data: smartAccount } = useSmartAccount();
  const { data: balance } = useBalance({ address: smartAccount?.address, token: ghostVault.address });
  const { data: usdcBalance } = useBalance({ address: smartAccount?.address, token: usdc.address });

  const deposit = useDeposit();

  useEffect(() => {
    if (!smartAccount) return;
    if (!usdcBalance) return;
    if (usdcBalance.value > 0) deposit(usdcBalance.value, smartAccount.address);
  }, [deposit, smartAccount, usdcBalance]);

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
