"use client";

import useSmartWallet from "@/hooks/useSmartWallet";
import useTransactionHistory, { type Transaction } from "@/hooks/useTransactionHistory";
import { formatUnits, getAddress } from "viem";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { ArrowBigDownDash, ArrowBigLeftDash, ArrowBigRightDash, ArrowBigUpDash } from "lucide-react";
import { useBlock, useWatchContractEvent } from "wagmi";
import { Skeleton } from "./ui/skeleton";
import useSearchUser from "@/hooks/useSearchUser";
import useGhostBalance from "@/hooks/useGhostBalance";

function formatAmount(amount: bigint, decimals: number = 6) {
  const number = Number(formatUnits(amount, decimals));

  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function transactionLabel(tx: Transaction, out: boolean) {
  switch (tx.type) {
    case "deposit":
      return "Deposit";
    case "withdraw":
      return "Withdraw";
    case "transfer":
      return out ? "Send" : "Receive";
  }
}

function TransactionIcon({ tx }: { tx: Transaction; out: boolean }) {
  switch (tx.type) {
    case "deposit":
      return <ArrowBigDownDash />;
    case "withdraw":
      return <ArrowBigUpDash />;
    case "transfer":
      return <ArrowBigRightDash />;
  }
}

function TransactionCard({ tx }: { tx: Transaction }) {
  const { address } = useSmartWallet();
  const { data: block } = useBlock({ blockNumber: BigInt(tx.blockNumber), query: { staleTime: Infinity } });

  const transactionDate = useMemo(() => block && new Date(Number(block.timestamp) * 1000), [block]);

  const otherAddress = useMemo(() => {
    if (tx.type !== "transfer") return;

    return getAddress(tx.from) === address ? getAddress(tx.to) : getAddress(tx.from);
  }, [tx]);

  const { data: otherUser } = useSearchUser(otherAddress);

  const isOutgoing = tx.type === "withdraw" || (tx.type === "transfer" && getAddress(tx.from) === address);
  return (
    <Card>
      <CardContent className="py-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <TransactionIcon tx={tx} out={isOutgoing} />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{otherUser?.email ?? transactionLabel(tx, isOutgoing)} </p>
            <p className="text-xs text-muted-foreground">
              {transactionDate?.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
          <div className="text-right ml-auto">
            <p className={cn("text-lg font-bold", isOutgoing ? "text-red-500" : "text-green-500")}>
              {isOutgoing ? "-" : "+"}
              {formatAmount(tx.amount)}
            </p>
            <p className="text-xs text-muted-foreground">{transactionLabel(tx, isOutgoing)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionCardSkeleton() {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="grid grid-cols-[1fr_auto] items-start gap-4">
          <Skeleton className="w-40 h-6" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16 h-6" />
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TransactionHistory() {
  const { address } = useSmartWallet();

  const { balance, dirty } = useGhostBalance(address);
  const { data: history, refetch } = useTransactionHistory(address);

  useEffect(() => {
    if (balance && !dirty) refetch();
  }, [balance, dirty]);

  if (!history) {
    return (
      <div className="flex flex-col gap-2">
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <Card>
          <CardContent className="py-4">
            <p className="text-semibold text-muted-foreground">No transactions yet</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {history.map((tx) => (
        <TransactionCard key={tx.hash} tx={tx} />
      ))}
    </div>
  );
}
