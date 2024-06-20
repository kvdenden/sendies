namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CHAIN_ID?: "mainnet" | "testnet";
    NEXT_PUBLIC_PRIVY_APP_ID: string;
    NEXT_PUBLIC_ZERODEV_PROJECT_ID: string;

    NEXT_PUBLIC_BUNDLER_RPC: string;
    NEXT_PUBLIC_PAYMASTER_RPC: string;

    NEXT_PUBLIC_USDC_ADDRESS: `0x${string}`;
    NEXT_PUBLIC_GHOSTVAULT_ADDRESS: `0x${string}`;
  }
}
