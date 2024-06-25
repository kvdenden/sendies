"use client";

import { useLogout, usePrivy } from "@privy-io/react-auth";

export default function LogoutButton() {
  const { ready, authenticated } = usePrivy();
  const { logout } = useLogout();
  // const [loading, setLoading] = useState(false)

  const enabled = ready && authenticated;
  return (
    <button disabled={!enabled} onClick={logout}>
      Log out
    </button>
  );
}
