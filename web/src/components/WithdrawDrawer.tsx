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

export default function WithdrawDrawer() {
  const [open, setOpen] = useState(false);

  const handleWithdraw = useCallback(async (data: any) => {
    setOpen(false);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="w-full">
          Withdraw
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Withdraw</DrawerTitle>
            <DrawerDescription>Withdraw money from your Sendies account</DrawerDescription>
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
