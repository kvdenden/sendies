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
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { Button } from "../ui/button";

export default function ProfileScreen() {
  const { user, exportWallet } = usePrivy();
  const { wallet: embeddedWallet } = useEmbeddedWallet();
  const { address: smartWalletAddress } = useSmartWallet();
  const copyToClipBoard = useCopyToClipboard();

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
              <div className="flex justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Smart wallet</p>
                  <p className="text-xs text-muted-foreground" title={smartWalletAddress}>
                    {smartWalletAddress && shortAddress(smartWalletAddress)}
                  </p>
                  <div className="flex gap-1 no-wrap">
                    <Button
                      variant="outline"
                      size="xs"
                      disabled={!smartWalletAddress}
                      onClick={() => copyToClipBoard(smartWalletAddress)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="text-xs text-muted-foreground">Embedded wallet</p>
                  <p className="text-xs text-muted-foreground" title={embeddedWalletAddress}>
                    {embeddedWalletAddress && shortAddress(embeddedWalletAddress)}
                  </p>
                  <div className="flex gap-1 no-wrap">
                    <Button
                      variant="outline"
                      size="xs"
                      disabled={!embeddedWalletAddress}
                      onClick={() => copyToClipBoard(embeddedWalletAddress)}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      disabled={!embeddedWalletAddress}
                      onClick={() => exportWallet()}
                    >
                      Export
                    </Button>
                  </div>
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
      <div className="flex flex-col gap-2 mt-auto w-full">
        <LogoutButton />
      </div>
    </div>
  );
}
