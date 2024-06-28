import WelcomeEmail from "@/components/WelcomeEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function send(to: string, referrer?: string) {
  return resend.emails.send({
    from: "Sendies <hello@sendies.app>",
    to,
    subject: "Welcome to Sendies. Let's Get Sending! 💸",
    react: WelcomeEmail({ referrer }),
  });
}
