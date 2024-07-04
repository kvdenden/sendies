"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useSend from "@/hooks/useSend";
import { usePrivy } from "@privy-io/react-auth";
import { getSmartAccountAddress } from "@/web3/zerodev";
import { parseUnits } from "viem";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const FormSchema = z.object({
  amount: z.coerce.number().positive(),
  email: z.string().email(),
});

type SendFormProps = {
  onSend?: Function;
};

export default function SendForm({ onSend = () => {} }: SendFormProps) {
  const { getAccessToken } = usePrivy();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      email: "",
    },
  });

  const send = useSend();

  const handleSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        setLoading(true);

        const amount = parseUnits(data.amount.toFixed(2), 6);

        // 1. get wallet address for email
        const accessToken = await getAccessToken();
        const { user } = await fetch("/api/users", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            /* Add any other request headers you'd like */
          },
          body: JSON.stringify({ email: data.email }),
        }).then((res) => res.json());

        // 2. contract call
        toast.promise(send(amount, user.address), {
          loading: "Sending money...",
          success: "Money sent!",
          error: "Uh oh! Something went wrong.",
        });

        // 3. callback
        onSend(data);
      } catch (error) {
        console.error(error);
        toast.error("Uh oh! Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [getAccessToken, send, onSend]
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="wkm@sendies.app" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
        </Button>
      </form>
    </Form>
  );
}
