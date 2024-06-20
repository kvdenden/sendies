import type { PrivyClientConfig } from "@privy-io/react-auth";
import { createConfig } from "@privy-io/wagmi";
import { http } from "viem";
import chain from "./chain";

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "all-users",
  },
};

export const wagmiConfig = createConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(),
  },
  batch: { multicall: true },
  ssr: true,
});
