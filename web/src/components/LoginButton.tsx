"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { ready, authenticated, login } = usePrivy();

  return (
    <button disabled={!ready || (ready && authenticated)} onClick={login}>
      Log in
    </button>
  );
}
