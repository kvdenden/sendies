import type { PrivyClientConfig } from "@privy-io/react-auth";
import { createConfig } from "@privy-io/wagmi";
import { createConfig as createZdConfig } from "@zerodev/waas";
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

export const zdConfig = createZdConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(),
  },
  projectIds: {
    [chain.id]: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
  },
});
