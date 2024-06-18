import AccountInfo from "@/components/AccountInfo";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world</h1>
      <LoginButton />
      <AccountInfo />
    </main>
  );
}
