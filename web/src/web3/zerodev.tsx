import { ConnectedWallet } from "@privy-io/react-auth";
import { createWalletClient, createPublicClient, http, custom, createClient } from "viem";
import { ENTRYPOINT_ADDRESS_V07, bundlerActions, walletClientToSmartAccountSigner } from "permissionless";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import chain from "@/web3/chain";

const entryPoint = ENTRYPOINT_ADDRESS_V07;
const kernelVersion = "0.3.1";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const paymasterClient = createZeroDevPaymasterClient({
  chain,
  entryPoint,
  transport: http(process.env.NEXT_PUBLIC_PAYMASTER_RPC),
});

export async function createSmartAccount(embeddedWallet: ConnectedWallet) {
  const signer = await embeddedWallet.getEthereumProvider();

  const walletClient = createWalletClient({
    account: embeddedWallet.address as `0x${string}`,
    transport: custom(signer),
  });

  const smartAccountSigner = walletClientToSmartAccountSigner(walletClient);
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: smartAccountSigner,
    entryPoint,
    kernelVersion,
  });

  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint,
    kernelVersion,
  });

  return account;
}

export async function createSmartAccountClient(embeddedWallet: ConnectedWallet) {
  const smartAccount = await createSmartAccount(embeddedWallet);

  return createKernelAccountClient({
    account: smartAccount,
    chain,
    entryPoint,
    bundlerTransport: http(process.env.NEXT_PUBLIC_BUNDLER_RPC),
    middleware: {
      sponsorUserOperation: paymasterClient.sponsorUserOperation,
    },
  }).extend(bundlerActions(entryPoint));
}
