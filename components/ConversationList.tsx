"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Flame, Snowflake, Timer } from "lucide-react";
import type { Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "hot" | "pending" | "cold";

const filters: Array<{ key: StatusFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "hot", label: "Hot" },
  { key: "pending", label: "Waiting" },
  { key: "cold", label: "Cold" }
];

const statusMeta = {
  hot: {
    label: "Hot Lead",
    icon: Flame,
    className: "border-[#ffd5d2] bg-[#fff1f0] text-[#c0392b]"
  },
  pending: {
    label: "Waiting",
    icon: Timer,
    className: "border-[#fde68a] bg-[#fffbeb] text-[#92400e]"
  },
  cold: {
    label: "Cold",
    icon: Snowflake,
    className: "border-[#e8e8e4] bg-[#f4f4f4] text-[#6b6b6b]"
  }
};

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
  filter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  filter,
  onFilterChange
}: ConversationListProps) {
  const visibleConversations =
    filter === "all"
      ? conversations
      : conversations.filter((conversation) => conversation.status === filter);

  return (
    <section className="flex h-full w-[360px] flex-col border-r border-[#e8e8e4] bg-[#f7f7f4]">
      <header className="border-b border-[#e8e8e4] bg-[#f7f7f4] px-5 pb-4 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
              Conversations
            </p>
            <h1 className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#0f0f0f]">
              Lead queue
            </h1>
          </div>
          <span className="rounded-full border border-[#e8e8e4] bg-white px-2.5 py-1 text-[11px] text-[#6b6b6b]">
            {visibleConversations.length}
          </span>
        </div>

        <div className="mt-5 flex gap-1.5">
          {filters.map((item) => {
            const isActive = filter === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onFilterChange(item.key)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold transition",
                  isActive
                    ? "bg-[#0a1a0c] text-white"
                    : "border border-[#e8e8e4] bg-white text-[#6b6b6b] hover:bg-[#f0f0ec]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-3">
        {visibleConversations.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[#e8e8e4] text-center text-[13px] text-[#9b9b9b]">
            No conversations
          </div>
        ) : (
          <div className="space-y-2">
            {visibleConversations.map((conversation, index) => {
              const latestMessage = conversation.messages[conversation.messages.length - 1];
              const isSelected = selectedId === conversation.id;
              const StatusIcon = statusMeta[conversation.status].icon;

              return (
                <motion.button
                  key={conversation.id}
                  type="button"
                  onClick={() => onSelect(conversation)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  className={cn(
                    "block w-full rounded-2xl border border-[#f0f0ec] bg-white p-4 text-left transition hover:bg-[#fafaf8]",
                    isSelected && "border-[#a3e635] bg-[#f7fcf7] shadow-sm ring-1 ring-[#a3e635]/15"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#e8f5e9] text-[12px] font-bold text-[#1a3a1c]">
                      {conversation.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="truncate text-[13px] font-semibold text-[#0f0f0f]">
                            {conversation.contactName}
                          </h2>
                          <p className="mt-1 truncate text-[11px] text-[#9b9b9b]">
                            {conversation.businessType}
                          </p>
                        </div>
                        <span className="text-[11px] text-[#9b9b9b]">{latestMessage.timestamp}</span>
                      </div>

                      <p className="mt-3 truncate text-[12px] leading-5 text-[#6b6b6b]">
                        {latestMessage.content}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold",
                            statusMeta[conversation.status].className
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusMeta[conversation.status].label}
                        </span>
                        {conversation.daysSinceLastReply >= 2 && conversation.status !== "cold" ? (
                          <span className="text-[11px] font-medium text-[#c0392b]">
                            {conversation.daysSinceLastReply}d delayed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-1 text-[10px] font-semibold text-[#166534]">
                            <CheckCircle2 className="h-3 w-3" />
                            Replied
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ConversationList;
