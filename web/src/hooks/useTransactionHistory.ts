export type Transaction = (
  | { type: "deposit" }
  | { type: "withdraw" }
  | { type: "transfer"; from: `0x${string}`; to: `0x${string}` }
) & {
  amount: bigint;
  blockNumber: number;
  hash: `0x${string}`;
};

import orderBy from "lodash/orderBy";
import { AssetTransfersCategory, AssetTransfersResult, SortingOrder } from "alchemy-sdk";

import alchemy from "@/web3/alchemy";
import { ghostVault } from "@/web3/contracts";
import { hexToNumber, hexToBigInt, zeroAddress } from "viem";
import { useQuery } from "@tanstack/react-query";

function parseTransfer(transfer: AssetTransfersResult): Transaction {
  const hash = transfer.uniqueId as `0x${string}`;
  const amount = hexToBigInt(transfer.rawContract.value as `0x${string}`);
  const blockNumber = hexToNumber(transfer.blockNum as `0x${string}`);

  if (transfer.from === zeroAddress) {
    return { type: "deposit", amount, blockNumber, hash };
  }

  if (transfer.to === zeroAddress) {
    return { type: "withdraw", amount, blockNumber, hash };
  }

  return {
    type: "transfer",
    from: transfer.from as `0x${string}`,
    to: transfer.to as `0x${string}`,
    amount,
    blockNumber,
    hash,
  };
}

async function getAssetTransfers(address: `0x${string}`, limit: number = 20) {
  const { transfers: transferTo } = await alchemy.core.getAssetTransfers({
    contractAddresses: [ghostVault.address],
    category: [AssetTransfersCategory.ERC20],
    toAddress: address,
    order: SortingOrder.DESCENDING,
    maxCount: limit,
  });

  const { transfers: transferFrom } = await alchemy.core.getAssetTransfers({
    contractAddresses: [ghostVault.address],
    category: [AssetTransfersCategory.ERC20],
    fromAddress: address,
    order: SortingOrder.DESCENDING,
    maxCount: limit,
  });

  const transfers = orderBy([...transferTo, ...transferFrom], (t) => hexToNumber(t.blockNum as `0x${string}`), "desc")
    .slice(0, limit)
    .map(parseTransfer);

  return transfers;
}

export default function useTransactionHistory(address?: `0x${string}`) {
  return useQuery({
    queryKey: ["transactionHistory", address],
    queryFn: async () => {
      if (!address) return [];
      console.log("getAssetTransfers", address);
      return getAssetTransfers(address);
    },
    enabled: !!address,
  });
}
