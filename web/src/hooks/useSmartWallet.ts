import { useContext } from "react";
import SmartWalletContext from "@/context/SmartWalletContext";

export default function useSmartWallet() {
  return useContext(SmartWalletContext);
}
