"use client";

import { useLogout, usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { ready, authenticated } = usePrivy();
  const { logout } = useLogout();
  // const [loading, setLoading] = useState(false)

  const enabled = ready && authenticated;
  return (
    <Button disabled={!enabled} variant="outline" className="border-primary text-primary w-full" onClick={logout}>
      Log out
    </Button>
  );
}
