import { NextRequest, NextResponse } from "next/server";
import privy, { getSmartWallet, getUserId } from "@/app/api/privy";
import { search, register } from "@/db/users";

// search user
export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;

    const address = searchParams.get("address");

    if (!address) return NextResponse.json({ error: "Missing address" }, { status: 400 });

    const user = await search({ address });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ did: user.privyDid, email: user.email, address: user.address }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// register user profile
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const userId = await getUserId(authHeader);

    if (!userId) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

    const privyUser = await privy.getUser(userId);

    const email = privyUser.email?.address;
    if (!email) {
      return NextResponse.json({ error: "No email address found" }, { status: 409 });
    }

    const smartWallet = await getSmartWallet(privyUser);
    if (!smartWallet) {
      return NextResponse.json({ error: "No wallet found" }, { status: 409 });
    }

    await register(privyUser.id, email, smartWallet);

    return NextResponse.json({ did: userId, email, address: smartWallet }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
