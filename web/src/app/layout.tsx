import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Web3Provider from "@/web3/provider";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import AutoDeposit from "@/components/AutoDeposit";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Sendies",
  description:
    "Quick and easy global peer-to-peer payments. No middlemen, no hassle. Enjoy seamless freedom at your fingertips!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-[100dvh] bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Web3Provider>
            <AuthGuard>
              <div className="flex flex-col min-h-[100dvh]">
                <main className="flex-1 overflow-auto">
                  <div className="container mx-auto">{children}</div>
                </main>
                <BottomNav />
              </div>
              <AutoDeposit />
            </AuthGuard>
          </Web3Provider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
