"use client";

import useSmartWallet from "@/hooks/useSmartWallet";
import useTransactionHistory, { type Transaction } from "@/hooks/useTransactionHistory";
import { formatUnits, getAddress } from "viem";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import useSearchUser from "@/hooks/useSearchUser";
import { useEffect, useMemo } from "react";
import { ArrowBigDownDash, ArrowBigLeftDash, ArrowBigRightDash, ArrowBigUpDash } from "lucide-react";
import { shortAddress } from "@/web3/utils";

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

  const otherAddress = useMemo(() => {
    if (tx.type !== "transfer") return;

    return getAddress(tx.from) === address ? getAddress(tx.to) : getAddress(tx.from);
  }, [tx]);

  const isOutgoing = tx.type === "withdraw" || (tx.type === "transfer" && getAddress(tx.from) === address);
  return (
    <Card>
      <CardContent className="py-4">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="flex gap-2">
            <TransactionIcon tx={tx} out={isOutgoing} />

            <div>
              <p className="text-sm font-medium">{transactionLabel(tx, isOutgoing)}</p>
              <p className="text-xs text-muted-foreground">{otherAddress && shortAddress(otherAddress)}</p>
            </div>
          </div>
          <div className="text-right">
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

export default function TransactionHistory() {
  const { address } = useSmartWallet();
  const { data: history } = useTransactionHistory(address);

  if (!history) return null;

  return (
    <div className="flex flex-col gap-2">
      {history.map((tx) => (
        <TransactionCard key={tx.hash} tx={tx} />
      ))}
    </div>
  );
}
