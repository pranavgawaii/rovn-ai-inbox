"use client";

import type React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Flame, Instagram, Mail, MessageCircle, PanelLeftClose, Snowflake, Timer } from "lucide-react";
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

const platformMeta = {
  whatsapp: {
    label: "WA",
    icon: MessageCircle,
    className: "border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]"
  },
  instagram: {
    label: "IG",
    icon: Instagram,
    className: "border-[#fed7aa] bg-[#fff7ed] text-[#c2410c]"
  },
  email: {
    label: "Email",
    icon: Mail,
    className: "border-[#bae6fd] bg-[#f0f9ff] text-[#0369a1]"
  }
};

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
  filter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
  width: number;
  onClose: () => void;
  onResizeStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
  recentlyRescuedId: string | null;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
  width,
  onClose,
  onResizeStart,
  recentlyRescuedId
}: ConversationListProps) {
  const visibleConversations =
    filter === "all"
      ? conversations
      : conversations.filter((conversation) => conversation.status === filter);

  return (
    <section
      className="relative flex h-full flex-shrink-0 flex-col border-r border-[#e8e8e4] bg-[#f7f7f4]"
      style={{ width }}
    >
      <header className="border-b border-[#e8e8e4] bg-[#f7f7f4] px-5 pb-4 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
              Lead rescue
            </p>
            <h1 className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#0f0f0f]">
              Revenue At Risk
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#e8e8e4] bg-white px-2.5 py-1 text-[11px] text-[#6b6b6b]">
              {visibleConversations.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg border border-[#e8e8e4] bg-white text-[#6b6b6b] transition hover:border-[#d8d8d2] hover:text-[#0f0f0f]"
              aria-label="Close Revenue At Risk panel"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>
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
              const isRecentlyRescued = recentlyRescuedId === conversation.id;
              const StatusIcon = statusMeta[conversation.status].icon;
              const PlatformIcon = platformMeta[conversation.platform].icon;

              return (
                <motion.button
                  key={conversation.id}
                  type="button"
                  onClick={() => onSelect(conversation)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isRecentlyRescued ? [1, 1.015, 1] : 1
                  }}
                  transition={{ delay: index * 0.025, duration: isRecentlyRescued ? 0.7 : 0.25 }}
                  className={cn(
                    "block w-full rounded-xl border border-[#f0f0ec] bg-white p-4 text-left transition hover:bg-[#fafaf8]",
                    isSelected && "border-[#a3e635] bg-[#f7fcf7] shadow-sm ring-1 ring-[#a3e635]/15",
                    isRecentlyRescued && "border-[#86efac] bg-[#f0fdf4] ring-2 ring-[#bbf7d0]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f5e9] text-[12px] font-bold text-[#1a3a1c]">
                        {conversation.avatar}
                      </div>
                      <span className={cn(
                        "absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white p-0.5 shadow-sm text-white",
                        conversation.platform === "whatsapp" ? "bg-[#25D366]" : conversation.platform === "instagram" ? "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]" : "bg-sky-400"
                      )}>
                        <PlatformIcon className="h-2.5 w-2.5" />
                      </span>
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
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[11px] font-semibold text-[#0f0f0f]">{conversation.leadValue}</span>
                          <span className="text-[10px] text-[#9b9b9b]">{latestMessage.timestamp}</span>
                        </div>
                      </div>

                      <p className="mt-3 truncate text-[12px] leading-5 text-[#6b6b6b]">
                        {latestMessage.content}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0f0ec] pt-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                              statusMeta[conversation.status].className
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusMeta[conversation.status].label}
                          </span>
                        </div>

                        {/* SLA visual indicator */}
                        {conversation.daysSinceLastReply > 0 && conversation.status !== "cold" ? (
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-[#c0392b]">
                              <span className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                conversation.daysSinceLastReply >= 3 ? "bg-[#c0392b] animate-ping" : "bg-amber-500"
                              )} />
                              SLA: {conversation.daysSinceLastReply}d
                            </span>
                            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-[#e8e8e4]">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  conversation.daysSinceLastReply >= 3 ? "bg-[#c0392b]" : "bg-amber-500"
                                )}
                                style={{ width: `${Math.min(conversation.daysSinceLastReply * 25, 100)}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            SLA Safe
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
      <button
        type="button"
        onMouseDown={onResizeStart}
        className="group absolute right-[-7px] top-0 z-30 flex h-full w-3 cursor-col-resize items-center justify-center"
        aria-label="Resize Revenue At Risk panel"
      >
        <span className="h-24 w-1 rounded-full bg-[#d4d4cc] opacity-80 transition group-hover:h-32 group-hover:bg-[#0f0f0f]" />
      </button>
    </section>
  );
}

export default ConversationList;
