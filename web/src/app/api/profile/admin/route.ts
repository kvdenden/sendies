import { NextRequest, NextResponse } from "next/server";
import privy, { getSmartWallet } from "@/app/api/privy";
import { register } from "@/db/users";

// manually register user profile (only for admin)
// export async function POST(req: NextRequest) {
//   try {
//     const { email } = await req.json();
//     if (!email) {
//       return NextResponse.json({ error: "Email required" }, { status: 409 });
//     }

//     const privyUser = await privy.getUserByEmail(email);
//     if (!privyUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const smartWallet = await getSmartWallet(privyUser);
//     if (!smartWallet) {
//       return NextResponse.json({ error: "No wallet found" }, { status: 409 });
//     }

//     await register(privyUser.id, email, smartWallet);

//     return NextResponse.json({ did: privyUser.id, email, address: smartWallet }, { status: 201 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
