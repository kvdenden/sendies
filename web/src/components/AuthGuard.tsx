"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useCreateKernelClientEOA } from "@zerodev/waas";
import LoginButton from "./LoginButton";
import CreateWalletButton from "./CreateWalletButton";
import useEmbeddedWallet from "@/hooks/useEmbeddedWallet";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, authenticated } = usePrivy();
  const embeddedWallet = useEmbeddedWallet();

  if (!ready) return null;
  if (!authenticated) return <LoginButton />;
  if (!embeddedWallet) return <CreateWalletButton />;

  return <>{children}</>;
}
