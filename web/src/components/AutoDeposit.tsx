"use client";

import useSmartWallet from "@/hooks/useSmartWallet";
import useAutoDeposit from "@/hooks/useAutoDeposit";

export default function AutoDeposit() {
  const { address } = useSmartWallet();
  useAutoDeposit(address);

  return null;
}
