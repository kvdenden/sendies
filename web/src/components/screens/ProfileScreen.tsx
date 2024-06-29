"use client";

import useSmartWallet from "@/hooks/useSmartWallet";
import LogoutButton from "../LogoutButton";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { usePrivy } from "@privy-io/react-auth";
import useEmbeddedWallet from "@/hooks/useEmbeddedWallet";
import { UserRound } from "lucide-react";
import { shortAddress } from "@/web3/utils";
import WithdrawDrawer from "../WithdrawDrawer";
import DepositDrawer from "../DepositDrawer";

export default function ProfileScreen() {
  const { user } = usePrivy();
  const { wallet: embeddedWallet } = useEmbeddedWallet();
  const { address: smartWalletAddress } = useSmartWallet();

  // if (!user || !embeddedWallet || !smartWalletAddress) return null; // todo: show skeleton?

  const email = user?.email?.address;
  const embeddedWalletAddress = embeddedWallet?.address;

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col py-16">
        <Card>
          <div className="flex items-center gap-4 p-6">
            <Avatar className="h-12 w-12">
              {/* <AvatarImage src="/placeholder-user.jpg" /> */}
              <AvatarFallback>
                <UserRound className="h-8 w-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-2 w-full">
              <div className="text-sm font-medium text-primary">{email}</div>
              <div className="flex justify-between gap-2 w-full">
                <div>
                  <p className="text-xs break-all text-muted-foreground">Smart wallet</p>
                  <p className="text-xs break-all text-muted-foreground">
                    {smartWalletAddress && shortAddress(smartWalletAddress)}
                  </p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="text-xs break-all text-muted-foreground">Embedded wallet</p>
                  <p className="text-xs break-all text-muted-foreground">
                    {embeddedWalletAddress && shortAddress(embeddedWalletAddress)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-col w-full mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Add money to your Sendies account</p>
        <DepositDrawer />
      </div>
      <div className="flex my-4 flex-col w-full mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Withdraw money from your Sendies account</p>
        <WithdrawDrawer />
      </div>
      <div className="text-center mt-auto w-full">
        <LogoutButton />
      </div>
    </div>
  );
}
