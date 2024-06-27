import { NextRequest, NextResponse } from "next/server";
import privy from "@/app/api/privy";

async function getUserId(authHeader: string) {
  try {
    const token = authHeader.replace("Bearer ", "");
    const verifiedClaims = await privy.verifyAuthToken(token);
    return verifiedClaims.userId;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const userId = await getUserId(authHeader);

    if (!userId) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

    const { email } = await req.json();

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await privy.getUserByEmail(email);
    if (user) return NextResponse.json({ user }, { status: 200 });

    const newUser = await privy.importUser({
      linkedAccounts: [
        {
          type: "email",
          address: email,
        },
      ],
      createEmbeddedWallet: true,
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
