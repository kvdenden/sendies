"use client";

import { useLogout, usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { ready, authenticated } = usePrivy();
  const { logout } = useLogout();
  // const [loading, setLoading] = useState(false)

  const enabled = ready && authenticated;
  return (
    <Button variant="secondary" disabled={!enabled} onClick={logout}>
      Log out
    </Button>
  );
}
