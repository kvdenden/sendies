"use client";

import Link, { LinkProps } from "next/link";
import { Wallet, Send, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
  const currentPath = usePathname();
  const active = useMemo(() => currentPath === href, [currentPath, href]);

  return (
    <Link
      href={href}
      className={cn("flex flex-col items-center hover:text-primary", active ? "text-primary" : "text-muted-foreground")}
    >
      {children}
    </Link>
  );
}

export default function BottomNav() {
  return (
    <nav className="bg-background border-t flex justify-around items-center h-16 px-4">
      <NavLink href="/">
        <Wallet className="h-6 w-6" />
        <span className="text-xs">Balance</span>
      </NavLink>
      <NavLink href="#">
        <Send className="h-6 w-6" />
        <span className="text-xs">Send</span>
      </NavLink>
      <NavLink href="/profile">
        <User className="h-6 w-6" />
        <span className="text-xs">Profile</span>
      </NavLink>
    </nav>
  );
}
