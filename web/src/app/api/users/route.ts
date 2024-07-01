import { NextRequest, NextResponse } from "next/server";
import privy, { getSmartWallet, getUserId } from "../privy";
import { send as sendWelcomeEmail } from "@/email/welcome";
import { register, search } from "@/db/users";

// refer new user
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const userId = await getUserId(authHeader);

    if (!userId) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

    const { email } = await req.json();

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await search({ email });

    if (user) return NextResponse.json({ user }, { status: 200 });

    const newUser = await privy.importUser({
      linkedAccounts: [
        {
          type: "email",
          address: email,
          firstVerifiedAt: null,
          latestVerifiedAt: null,
        },
      ],
      createEmbeddedWallet: true,
    });

    if (!newUser) return NextResponse.json({ error: "User not created" }, { status: 500 });

    const smartWallet = await getSmartWallet(newUser);
    if (!smartWallet) return NextResponse.json({ error: "Wallet not created" }, { status: 500 });

    await register(newUser.id, email, smartWallet);

    // send welcome email
    await privy
      .getUser(userId)
      .then((referrer) => sendWelcomeEmail(email, referrer.email?.address))
      .catch(console.error);

    return NextResponse.json({ did: newUser.id, email, address: smartWallet }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
