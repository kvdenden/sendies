import { useCallback } from "react";
import { toast } from "sonner";

export default function useCopyToClipboard() {
  const copyToClipboard = useCallback(async (text?: string) => {
    if (!text) return null;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard", { duration: 1000 });
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
      toast.error("Uh oh! Something went wrong.", { duration: 1000 });
    }
  }, []);

  return copyToClipboard;
}
