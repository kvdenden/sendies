import { PrivyClient, User, WalletWithMetadata } from "@privy-io/server-auth";
import { getSmartAccountAddress } from "@/web3/zerodev";

const privy = new PrivyClient(process.env.NEXT_PUBLIC_PRIVY_APP_ID, process.env.PRIVY_APP_SECRET);

export default privy;

export async function getUserId(authHeader: string) {
  try {
    const token = authHeader.replace("Bearer ", "");
    const verifiedClaims = await privy.verifyAuthToken(token);
    return verifiedClaims.userId;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getSmartWallet(privyUser: User) {
  const email = privyUser.email?.address;

  if (!email) return;

  const embeddedWallet = privyUser.linkedAccounts
    .filter<WalletWithMetadata>((account): account is WalletWithMetadata => account.type === "wallet")
    .find((account) => account.walletClientType === "privy" && account.connectorType === "embedded");

  if (!embeddedWallet) return;

  return getSmartAccountAddress(embeddedWallet.address as `0x${string}`);
}
