import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import useSmartWallet from "@/hooks/useSmartWallet";
import chain from "@/web3/chain";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

export default function DepositDrawer() {
  const { address } = useSmartWallet();
  const [open, setOpen] = useState(false);

  const copyToClipBoard = useCopyToClipboard();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="w-full">
          Deposit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Deposit</DrawerTitle>
            <DrawerDescription>Add money to your Sendies account</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="mb-2">
              <span className="font-semibold">Send USDC to this address:</span>
              <p className="font-mono bg-accent p-2 rounded mt-2 break-all">{address}</p>
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold">Currency:</span>{" "}
              <>
                Send <span className="font-semibold">USDC</span> only.
              </>
            </div>
            <div className="text-sm  mb-2">
              <span className="font-semibold">Network:</span>{" "}
              <>
                Make sure you&apos;re using the <span className="font-semibold">{chain.name}</span> network for this
                transaction.
              </>
            </div>

            <Button variant="secondary" className="w-full" disabled={!address} onClick={() => copyToClipBoard(address)}>
              Copy Address
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">OK</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
