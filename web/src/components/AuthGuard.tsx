"use client";

import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "./LoginButton";
import CreateWalletButton from "./CreateWalletButton";
import useEmbeddedWallet from "@/hooks/useEmbeddedWallet";
import useSmartWallet from "@/hooks/useSmartWallet";
import { LoadingSpinner } from "./ui/loading-spinner";
import SplashScreen from "./screens/SplashScreen";
import LoadingScreen from "./screens/LoadingScreen";
import { useState } from "react";

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
  const smartWallet = useSmartWallet();

  const { guard, loading } = Guard();

  if (loading) return <LoadingScreen />;
  if (guard) return <SplashScreen>{guard}</SplashScreen>;

  if (!smartWallet.ready) return <LoadingScreen />;

  return <>{children}</>;
}
