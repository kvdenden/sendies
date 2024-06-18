"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function AccountInfo() {
  const { ready, user } = usePrivy();

  if (!ready) return null;

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
