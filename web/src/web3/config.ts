import type { PrivyClientConfig } from "@privy-io/react-auth";
import { createConfig } from "@privy-io/wagmi";
import { http } from "viem";
import chain from "./chain";
import { injected } from "wagmi/connectors";
import { wrapSmartWallet } from "@zerodev/wallet";

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "all-users",
    // createOnLogin: "off",
  },
};

export const wagmiConfig = createConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(process.env.NEXT_PUBLIC_RPC),
  },
  // connectors: [wrapSmartWallet(injected(), process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID, "v3")],
  batch: { multicall: true },
  ssr: true,
  pollingInterval: 2_000,
});
