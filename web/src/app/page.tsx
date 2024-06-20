import AccountInfo from "@/components/AccountInfo";
import AuthGuard from "@/components/AuthGuard";
import SendButton from "@/components/SendButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world</h1>
      <AuthGuard>
        <SendButton />
        <AccountInfo />
      </AuthGuard>
    </main>
  );
}
