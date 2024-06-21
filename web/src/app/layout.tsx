import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Web3Provider from "@/web3/provider";

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
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
