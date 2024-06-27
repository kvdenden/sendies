import { useCallback, useState } from "react";
import SendForm from "./SendForm";
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

export default function DepositDrawer() {
  const { address } = useSmartWallet();
  const [open, setOpen] = useState(false);

  const copyToClipBoard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // setCopySuccess("Copied!");
    } catch (err) {
      // setCopySuccess("Failed to copy!");
    }
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="w-full">
          Deposit monies
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Deposit monies</DrawerTitle>
            <DrawerDescription>Deposit monies in your account</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <p>
              Send USDC to <span className="font-mono text-xs">{address}</span> to deposit monies.
            </p>
            <Button variant="secondary" className="w-full" onClick={() => copyToClipBoard(address ?? "")}>
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
