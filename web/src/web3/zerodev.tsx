import { ConnectedWallet } from "@privy-io/react-auth";
import { createWalletClient, createPublicClient, http, custom, type EIP1193Provider } from "viem";
import {
  ENTRYPOINT_ADDRESS_V07,
  bundlerActions,
  providerToSmartAccountSigner,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { getKernelAddressFromECDSA, signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createKernelAccount, createKernelAccountClient } from "@zerodev/sdk";
import { KernelEIP1193Provider } from "@zerodev/wallet";
import chain from "@/web3/chain";

const entryPoint = ENTRYPOINT_ADDRESS_V07;
const kernelVersion = "0.3.1";

const publicClient = createPublicClient({
  chain,
  transport: http(process.env.NEXT_PUBLIC_RPC),
});

// const paymasterClient = createPimlicoPaymasterClient({
//   chain,
//   entryPoint,
//   transport: http(process.env.NEXT_PUBLIC_PAYMASTER_RPC),
// });

// const paymasterClient = createZeroDevPaymasterClient({
//   chain,
//   entryPoint,
//   transport: http(process.env.NEXT_PUBLIC_PAYMASTER_RPC),
// });

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
    // middleware: {
    //   sponsorUserOperation: paymasterClient.sponsorUserOperation,
    // },
  }).extend(bundlerActions(entryPoint));
}

export async function getSmartAccountAddress(eoaAddress: `0x${string}`, index: bigint = BigInt(0)) {
  return getKernelAddressFromECDSA({
    entryPointAddress: entryPoint,
    kernelVersion,
    eoaAddress,
    index,
    publicClient,
  });
}

export async function getSmartAccountProvider({ signer }: { signer: EIP1193Provider }) {
  const smartAccountSigner = await providerToSmartAccountSigner(signer);

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: smartAccountSigner,
    entryPoint,
    kernelVersion,
  });

  const smartAccount = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint,
    kernelVersion,
  });

  const kernelClient = createKernelAccountClient({
    account: smartAccount,
    chain,
    entryPoint,
    bundlerTransport: http(process.env.NEXT_PUBLIC_BUNDLER_RPC),
    // middleware: {
    //   // sponsorUserOperation: paymasterClient.sponsorUserOperation,
    // },
  }).extend(bundlerActions(entryPoint));

  return new KernelEIP1193Provider(kernelClient as any);
}
