"use client";

import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "./LoginButton";
import CreateWalletButton from "./CreateWalletButton";
import useEmbeddedWallet from "@/hooks/useEmbeddedWallet";
import useSmartWallet from "@/hooks/useSmartWallet";
import SplashScreen from "./screens/SplashScreen";
import LoadingScreen from "./screens/LoadingScreen";

function Guard() {
  const privy = usePrivy();
  const embeddedWallet = useEmbeddedWallet();

  const loading = !privy.ready || !embeddedWallet.ready;

  let guard;
  if (privy.ready && !privy.authenticated) {
    guard = <LoginButton />;
  } else if (embeddedWallet.ready && !embeddedWallet.wallet) {
    guard = <CreateWalletButton />;
  }

  return { guard, loading };
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { guard, loading } = Guard();
  const smartWallet = useSmartWallet();

  if (loading) return <LoadingScreen />;
  if (guard) return <SplashScreen>{guard}</SplashScreen>;

  if (!smartWallet.ready) return <LoadingScreen />;

  return <>{children}</>;
}
