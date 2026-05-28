"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Gauge, Sparkles, Target } from "lucide-react";
import type { AISummary, Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

const platformDots = {
  whatsapp: "bg-[#4caf50]",
  instagram: "bg-[#ffb86b]",
  email: "bg-sky-400"
};

function formatMessageTimestamp(timestamp: string) {
  const parsed = new Date(timestamp);

  if (Number.isNaN(parsed.getTime())) {
    return timestamp;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(parsed);
}

export function ConversationDetail({ conversation }: { conversation: Conversation | null }) {
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [selectedReplyIndex, setSelectedReplyIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!conversation) {
      setAiSummary(null);
      setLoading(false);
      setReplies([]);
      setRepliesLoading(false);
      setSelectedReplyIndex(null);
      setDraft("");
      setSent(false);
      return;
    }

    const activeConversation = conversation;
    let isMounted = true;

    async function loadSummary() {
      setLoading(true);
      setAiSummary(null);
      setReplies([]);
      setSelectedReplyIndex(null);
      setDraft("");
      setSent(false);

      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: activeConversation.messages,
            contactName: activeConversation.contactName,
            platform: activeConversation.platform,
            businessType: activeConversation.businessType
          })
        });

        if (!response.ok) {
          throw new Error("Unable to summarize conversation");
        }

        const data = (await response.json()) as AISummary;

        if (isMounted) {
          setAiSummary(data);
        }
      } catch {
        if (isMounted) {
          setAiSummary(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, [conversation?.id, conversation]);

  async function generateReplies() {
    if (!conversation || !aiSummary) {
      return;
    }

    setRepliesLoading(true);
    setSent(false);

    try {
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: conversation.contactName,
          summary: aiSummary.summary,
          platform: conversation.platform,
          businessType: conversation.businessType,
          tone: aiSummary.suggestedTone,
          lastMessage: conversation.messages[conversation.messages.length - 1].content
        })
      });

      if (!response.ok) {
        throw new Error("Unable to generate replies");
      }

      const data = (await response.json()) as { replies: string[] };
      setReplies(data.replies);
      setSelectedReplyIndex(data.replies.length > 0 ? 0 : null);
      setDraft(data.replies[0] ?? "");
    } catch {
      setReplies([]);
    } finally {
      setRepliesLoading(false);
    }
  }

  if (!conversation) {
    return (
      <section className="flex min-w-0 flex-1 bg-white">
        <div className="m-4 flex flex-1 flex-col items-center justify-center rounded-2xl border border-[#e8e8e4] bg-[#fafaf8]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#e8f5e9] text-[#1a3a1c]">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="mt-5 text-[15px] font-semibold text-[#0f0f0f]">Select a conversation</p>
          <p className="mt-2 text-[13px] text-[#6b6b6b]">
            AI context, intent, and follow-up drafts will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-w-0 flex-1 bg-white">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#f0f0ec] bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e8f5e9] text-[13px] font-bold text-[#1a3a1c]">
              {conversation.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[16px] font-bold tracking-[-0.02em] text-[#0f0f0f]">
                  {conversation.contactName}
                </h2>
                <span className="rounded-full border border-[#e8e8e4] bg-[#f4f4f4] px-2 py-0.5 text-[10px] font-semibold uppercase text-[#6b6b6b]">
                  {conversation.status}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[12px] text-[#6b6b6b]">
                <span>{conversation.businessType}</span>
                <span className={cn("h-1.5 w-1.5 rounded-full", platformDots[conversation.platform])} />
                <span className="capitalize">{conversation.platform}</span>
              </div>
            </div>
          </div>

          <div className="mr-12 rounded-xl border border-[#ffd5d2] bg-[#fff1f0] px-3 py-2 text-[11px] font-semibold text-[#c0392b]">
            {conversation.daysSinceLastReply} days since last reply
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {conversation.messages.map((message, index) => {
              const isBusiness = message.role === "business";

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn("flex", isBusiness ? "justify-end" : "justify-start")}
                >
                  <div className="max-w-[74%]">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-sm",
                        isBusiness
                          ? "rounded-tr-sm bg-[#0a1a0c] text-white"
                          : "rounded-tl-sm bg-[#f4f4f1] text-[#0f0f0f]"
                      )}
                    >
                      {message.content}
                    </div>
                    <p
                      className={cn(
                        "mt-1.5 text-[10px]",
                        isBusiness ? "mr-2 text-right text-[#9b9b9b]" : "ml-2 text-[#9b9b9b]"
                      )}
                    >
                      {formatMessageTimestamp(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="flex h-full w-80 flex-shrink-0 flex-col border-l border-[#f0f0ec] bg-[#fafaf8]">
        <div className="border-b border-[#f0f0ec] p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b]">
            AI Intelligence
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="rounded-xl border border-[#e8e8e4] bg-white p-4 text-[13px] text-[#0f0f0f]">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-3 w-24 rounded bg-[#f0f0ec]" />
                <div className="h-3 w-full rounded bg-[#f0f0ec]" />
                <div className="h-3 w-4/5 rounded bg-[#f0f0ec]" />
              </div>
            ) : aiSummary ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6b6b6b]">
                    <Brain className="h-3.5 w-3.5 text-[#2e7d32]" />
                    Lead score
                  </span>
                  <span className="rounded-full bg-[#a3e635] px-2.5 py-1 text-[11px] font-bold text-[#0a1a0c]">
                    {aiSummary.leadScore}/10
                  </span>
                </div>
                <p className="leading-6">{aiSummary.summary}</p>
                <div className="mt-4 rounded-xl border border-[#fde68a] bg-[#fffbeb] p-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#92400e]">
                    <Target className="h-3.5 w-3.5" />
                    Suggested action
                  </div>
                  <p className="mt-2 text-[12px] leading-5 text-[#92400e]">{aiSummary.urgencyReason}</p>
                </div>
              </>
            ) : (
              <p className="leading-6 text-[#6b6b6b]">
                Add an OpenRouter key to enable live analysis.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={generateReplies}
            disabled={repliesLoading || !aiSummary}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#a3e635] py-3 text-[13px] font-semibold text-[#0a1a0c] transition hover:bg-[#bef264] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>✦</span>
            {repliesLoading ? "Composing..." : "Generate follow-up"}
          </button>

          {repliesLoading ? (
            <div className="mt-4 space-y-2">
              <div className="h-20 animate-pulse rounded-xl bg-[#f0f0ec]" />
              <div className="h-20 animate-pulse rounded-xl bg-[#f0f0ec]" />
            </div>
          ) : null}

          {replies.length > 0 ? (
            <div className="mt-4 space-y-2">
              {replies.map((reply, index) => {
                const isSelected = selectedReplyIndex === index;

                return (
                  <button
                    key={`${reply}-${index}`}
                    type="button"
                    onClick={() => {
                      setSelectedReplyIndex(index);
                      setDraft(reply);
                      setSent(false);
                    }}
                    className={cn(
                      "w-full rounded-xl border border-[#e8e8e4] bg-white p-3 text-left transition hover:border-[#a3e635] hover:bg-[#fafffe]",
                      isSelected && "border-[#a3e635] bg-[#f7ffe8]"
                    )}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#a3e635]">
                      Option {index + 1}
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-[#0f0f0f]">{reply}</p>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="border-t border-[#f0f0ec] p-5">
          <textarea
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setSent(false);
            }}
            placeholder="AI draft appears here..."
            className="h-24 w-full resize-none rounded-xl border border-[#e8e8e4] bg-[#f7f7f4] p-4 text-[13px] leading-6 text-[#0f0f0f] outline-none placeholder:text-[#9b9b9b] focus:border-[#a3e635]"
          />
          <button
            type="button"
            onClick={() => {
              if (draft.trim()) {
                setSent(true);
              }
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a1a0c] px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-[#1a3a1c]"
          >
            Send reply <ArrowUpRight className="h-4 w-4" />
          </button>
          {sent ? (
            <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-[#166534]">
              <Gauge className="h-3.5 w-3.5" />
              Reply marked as sent
            </p>
          ) : null}
        </div>
      </aside>
    </section>
  );
}

export default ConversationDetail;
