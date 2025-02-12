import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Web3Provider from "@/web3/provider";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import AutoDeposit from "@/components/AutoDeposit";
import { Toaster } from "@/components/ui/sonner";
import TestnetBanner from "@/components/TestnetBanner";
import OnboardingGuard from "@/components/OnboardingGuard";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn("h-[100dvh] bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Web3Provider>
            <AuthGuard>
              <OnboardingGuard>
                <div className="flex flex-col h-full">
                  <main className="h-[100dvh] overflow-auto">
                    <div className="absolute top-0 w-full z-10">
                      <TestnetBanner />
                    </div>
                    <div className="container h-full mx-auto pb-4">{children}</div>
                  </main>
                  <div className="sticky bottom-0 mt-auto">
                    <BottomNav />
                  </div>
                  <AutoDeposit />
                </div>
              </OnboardingGuard>
            </AuthGuard>
          </Web3Provider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
