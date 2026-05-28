import type { Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

type ConversationStatus = Conversation["status"];

const statusStyles: Record<ConversationStatus, string> = {
  hot: "border-red-200 bg-red-50 text-red-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  cold: "border-slate-200 bg-slate-50 text-slate-600"
};

export function StatusBadge({ status }: { status: ConversationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}
