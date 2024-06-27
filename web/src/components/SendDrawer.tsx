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

export default function SendDrawer() {
  const [open, setOpen] = useState(false);

  const handleSend = useCallback((data: any) => {
    console.log("Send", data);
    setOpen(false);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Send monies</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Send monies</DrawerTitle>
            <DrawerDescription>Send monies to a friend or foe</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <SendForm onSend={handleSend} />
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
