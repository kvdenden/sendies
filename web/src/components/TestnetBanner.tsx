import chain from "@/web3/chain";

export default function TestnetBanner() {
  if (!chain.testnet) return null;

  return (
    <div className="bg-foreground text-background text-sm text-center p-2">
      Testnet version. This is not real money.
    </div>
  );
}
