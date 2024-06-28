import { useCallback, useState } from "react";
import WithdrawForm from "./WithdrawForm";
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
import useGhostBalance from "@/hooks/useGhostBalance";

export default function WithdrawDrawer() {
  const [open, setOpen] = useState(false);
  const { refresh } = useGhostBalance();

  const handleWithdraw = useCallback(async (data: any, txHash: `0x${string}`) => {
    await refresh();
    setOpen(false);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="border-primary text-primary w-full">
          Withdraw
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Withdraw monies</DrawerTitle>
            <DrawerDescription>Withdraw monies from your account</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <WithdrawForm onWithdraw={handleWithdraw} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
