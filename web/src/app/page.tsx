import BalanceScreen from "@/components/screens/BalanceScreen";
import TransactionHistory from "@/components/TransactionHistory";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="sticky top-0 bg-background pb-6">
        <BalanceScreen />
      </div>
      <div className="overflow-hidden pb-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Recent transactions</h2>
        <TransactionHistory />
      </div>
    </div>
  );
}
