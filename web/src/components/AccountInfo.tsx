"use client";

import { usePrivy, useToken } from "@privy-io/react-auth";
import useSmartAccount from "@/hooks/useSmartAccount";

export default function AccountInfo() {
  const { ready, user } = usePrivy();
  const { getAccessToken } = useToken();
  const { data: smartAccount } = useSmartAccount();

  getAccessToken().then((token) => console.log(token));

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
