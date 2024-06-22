import AuthGuard from "@/components/AuthGuard";
import BalanceScreen from "@/components/BalanceScreen";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <AuthGuard>
        <div className="container mx-auto">
          <BalanceScreen />
        </div>
      </AuthGuard>
    </main>
  );
}
