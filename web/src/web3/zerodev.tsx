import { ConnectedWallet } from "@privy-io/react-auth";
import { createWalletClient, createPublicClient, http, custom, createClient } from "viem";
import {
  ENTRYPOINT_ADDRESS_V07,
  bundlerActions,
  createBundlerClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  zerodevPaymasterActions,
} from "@zerodev/sdk";
import chain from "@/web3/chain";
import { paymasterActionsEip7677 } from "permissionless/experimental";

const entryPoint = ENTRYPOINT_ADDRESS_V07;
const kernelVersion = "0.3.1";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const zdPaymasterClient = createZeroDevPaymasterClient({
  chain,
  entryPoint,
  transport: http(process.env.NEXT_PUBLIC_PAYMASTER_RPC),
});

const paymasterClient = createClient({
  chain,
  transport: http(process.env.NEXT_PUBLIC_PAYMASTER_RPC),
}).extend(zerodevPaymasterActions(entryPoint));

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
    // TODO: add middleware
  }).extend(bundlerActions(entryPoint));
}
