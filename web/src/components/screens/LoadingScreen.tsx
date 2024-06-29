import { Send } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Send className="h-12 w-12 text-primary animate-pulse" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
