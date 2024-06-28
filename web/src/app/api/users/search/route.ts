import { NextRequest, NextResponse } from "next/server";
import privy from "@/app/api/privy";

type SearchParams = Partial<{
  email: string;
  address: `0x${string}`;
}>;

async function getUser(search: SearchParams) {
  if (search.email) return privy.getUserByEmail(search.email);
  if (search.address) return privy.getUserByWalletAddress(search.address);
}

export async function POST(req: NextRequest) {
  try {
    const search = await req.json();

    if (!search.email && !search.address)
      return NextResponse.json({ error: "Email or address is required" }, { status: 400 });

    const user = await getUser(search);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
