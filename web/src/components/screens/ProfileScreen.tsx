"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import useSmartWallet from "@/hooks/useSmartWallet";
import LogoutButton from "../LogoutButton";
import DepositDrawer from "../DepositDrawer";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import WithdrawDrawer from "../WithdrawDrawer";
import { shortenAddress } from "@/lib/utils";

export default function ProfileScreen() {
  const { address } = useSmartWallet();
  const { user } = usePrivy();
  return (
    <div className="flex flex-col h-[calc(100dvh-60px)] py-16 items-center justify-between">
      <Card className="flex items-center w-full gap-4 p-4 border-primary border-2 rounded-lg sticky top-0 mb-8">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>{user?.email?.address.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1 w-full">
          <div className="text-sm font-medium text-primary">{user?.email?.address}</div>
          <div className="flex justify-between w-full">
            <div>
              <p className="text-xs break-all text-muted-foreground">Smart wallet</p>
              <p className="text-xs break-all text-muted-foreground">{shortenAddress(address)}</p>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p className="text-xs break-all text-muted-foreground">Embedded wallet</p>
              <p className="text-xs break-all text-muted-foreground">
                {shortenAddress(user?.wallet?.address as `0x${string}` | undefined)}
              </p>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex flex-col w-full mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Add USDC to your Sendies account</p>
        <DepositDrawer />
      </div>
      <Separator />
      <div className="flex my-4 flex-col w-full mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Withdraw USDC to your wallet</p>
        <WithdrawDrawer />
      </div>
      <Separator />
      <div className="my-4 w-full flex-col mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Export embedded wallet</p>
        <Link href="https://www.privy.io/" target="_blank" rel="noreferrer" passHref>
          <Button variant="outline" className="border-primary text-primary w-full">
            Export wallet
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="my-4 w-full flex-col mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Log out of Sendies</p>
        <LogoutButton />
      </div>
    </div>
  );
}
