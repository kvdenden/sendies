"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAddress, parseUnits } from "viem";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useWithdraw from "@/hooks/useWithdraw";
import useSmartWallet from "@/hooks/useSmartWallet";

export const FormSchema = z.object({
  amount: z.coerce.number().positive(),
  receiver: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

type WithdrawFormProps = {
  onWithdraw?: Function;
};

export default function WithdrawForm({ onWithdraw = () => {} }: WithdrawFormProps) {
  const { address } = useSmartWallet();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      receiver: "",
    },
  });

  const withdraw = useWithdraw();

  const handleSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      if (!address) return;
      try {
        setLoading(true);

        const amount = parseUnits(data.amount.toFixed(2), 6);
        const receiver = getAddress(data.receiver);

        // 2. contract call
        const txHash = await withdraw(amount, receiver, address);

        // 3. callback
        onWithdraw(data, txHash);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [address, withdraw, onWithdraw]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0.00" step="0.01" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="0xE71D8DED9DeE1187E25a2D0Fca8c8b050559D7D3" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Withdraw"}
        </Button>
      </form>
    </Form>
  );
}
