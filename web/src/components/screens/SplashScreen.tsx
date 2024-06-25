import { Send } from "lucide-react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <Send className="h-16 w-16 text-primary" />
      <div className="mt-12 flex w-full max-w-[300px] flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">Welcome to Sendies</h1>
        <p className="text-center text-muted-foreground">Quick and easy global peer-to-peer payments.</p>
        <div className="mt-6 flex w-full flex-col items-center">{children}</div>
      </div>
    </div>
  );
}
