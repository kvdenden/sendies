"use client";

import { usePrivy } from "@privy-io/react-auth";
import useSmartAccount from "@/hooks/useSmartAccount";

export default function AccountInfo() {
  const { ready, user } = usePrivy();
  const { data: smartAccount } = useSmartAccount();

  if (!ready) return null;

  return (
    <>
      <h1>User</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <h2>Smart account</h2>
      <pre>{smartAccount?.address ?? "Not connected"}</pre>
    </>
  );
}
