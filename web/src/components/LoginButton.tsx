"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();

  const enabled = ready && !authenticated;
  return (
    <button disabled={!enabled} onClick={login}>
      Log in
    </button>
  );
}
