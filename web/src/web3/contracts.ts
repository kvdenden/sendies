import { erc20Abi } from "viem";
import { ghostVaultAbi } from "./abi";

export const ghostVault = {
  abi: ghostVaultAbi,
  address: process.env.NEXT_PUBLIC_GHOSTVAULT_ADDRESS,
};

export const usdc = {
  abi: erc20Abi,
  address: process.env.NEXT_PUBLIC_USDC_ADDRESS,
};
