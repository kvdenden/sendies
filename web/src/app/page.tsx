import BalanceScreen from "@/components/screens/BalanceScreen";
import TransactionHistory from "@/components/TransactionHistory";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="sticky top-0 bg-background pb-6">
        <BalanceScreen />
      </div>
      <div className="overflow-hidden">
        <h2 className="mb-4 text-2xl font-bold">Recent transactions</h2>
        <TransactionHistory />
      </div>
    </div>
  );
}
