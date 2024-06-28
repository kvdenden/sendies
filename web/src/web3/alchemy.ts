import { Network, Alchemy } from "alchemy-sdk";

function getNetwork() {
  switch (process.env.NEXT_PUBLIC_CHAIN_ID) {
    case "mainnet":
      return Network.BASE_MAINNET;
    default:
      return Network.BASE_SEPOLIA;
  }
}

const network = getNetwork();

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network,
};

const alchemy = new Alchemy(settings);

export default alchemy;
