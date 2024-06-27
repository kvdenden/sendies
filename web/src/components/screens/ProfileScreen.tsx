"use client";

import useSmartWallet from "@/hooks/useSmartWallet";
import LogoutButton from "../LogoutButton";

export default function ProfileScreen() {
  const { address } = useSmartWallet();
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="text-xs font-mono">{address}</div>
      <div className="text-center">
        <LogoutButton />
      </div>
    </div>
  );
}
