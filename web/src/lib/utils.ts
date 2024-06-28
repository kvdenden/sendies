import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: `0x${string}` | undefined): string | undefined {
  if (!address) return address;
  return `${address.slice(0, 5)}...${address.slice(-2)}`;
}
