"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginButton() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    onError: () => setLoading(false),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authenticated) setLoading(false);
  }, [authenticated]);

  const handleLogin = useCallback(() => {
    setLoading(true);
    login();
  }, [login]);

  const enabled = ready && !authenticated && !loading;
  return (
    <Button className="w-full" disabled={!enabled} onClick={handleLogin}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}
    </Button>
  );
}
