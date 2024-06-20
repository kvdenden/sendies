import { type Chain } from "viem";
import { base, baseSepolia } from "viem/chains";

function getChain(): Chain {
  switch (process.env.NEXT_PUBLIC_CHAIN_ID) {
    case "mainnet":
      return base;
    default:
      return baseSepolia;
  }
}

export default getChain();
