"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Brain, CheckCircle2, Clock, DollarSign, PanelRightClose, Sparkles, Target, Instagram, Mail, MessageCircle } from "lucide-react";
import type { AISummary, Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

const platformDots = {
  whatsapp: "bg-[#4caf50]",
  instagram: "bg-[#ffb86b]",
  email: "bg-sky-400"
};

const analysisSteps = ["Analyzing budget...", "Detecting intent...", "Evaluating urgency..."];

function formatOpportunityValue(value: string) {
  const amount = Number.parseFloat(value.replace(/,/g, "").replace(/[^\d.]/g, ""));

  if (Number.isNaN(amount)) {
    return value;
  }

  if (value.toLowerCase().includes("k")) {
    return `₹${Math.round(amount * 1000).toLocaleString("en-IN")}`;
  }

  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function buildFallbackReply(conversation: Conversation) {
  const latestMessage = conversation.messages[conversation.messages.length - 1]?.content ?? "your last message";

  return `${conversation.contactName.split(" ")[0]}, I saw your message about ${latestMessage.toLowerCase()}. I can help with this and will send the exact details now so we do not lose time.`;
}

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

export function ConversationDetail({
  conversation,
  onReplySent,
  aiPanelWidth,
  isAiOpen,
  onAiClose,
  onAiOpen,
  onAiResizeStart
}: {
  conversation: Conversation | null;
  onReplySent: (conversationId: string, reply: string) => void;
  aiPanelWidth: number;
  isAiOpen: boolean;
  onAiClose: () => void;
  onAiOpen: () => void;
  onAiResizeStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [analyzedLeads, setAnalyzedLeads] = useState<Record<string, boolean>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [selectedReplyIndex, setSelectedReplyIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);
  const [draftFailed, setDraftFailed] = useState(false);
  const [rescuedValue, setRescuedValue] = useState("");

  useEffect(() => {
    if (!conversation) {
      setAiSummary(null);
      setLoading(false);
      setReplies([]);
      setRepliesLoading(false);
      setSelectedReplyIndex(null);
      setDraft("");
      setSent(false);
      setDraftFailed(false);
      setRescuedValue("");
      return;
    }

    setReplies([]);
    setSelectedReplyIndex(null);
    setDraft("");
    setSent(false);
    setDraftFailed(false);
    setRescuedValue("");

    const isAnalyzed = analyzedLeads[conversation.id];

    if (isAnalyzed) {
      setAiSummary({
        summary: conversation.dealSummary,
        status: conversation.status,
        daysSinceReply: conversation.daysSinceLastReply,
        urgencyReason: conversation.nextBestAction,
        suggestedTone: conversation.urgency === "Critical" ? "urgent" : "professional",
        leadScore: conversation.leadScore
      });
      setLoading(false);
    } else {
      setLoading(true);
      setAiSummary(null);
      setCurrentStepIndex(0);

      const step1 = window.setTimeout(() => setCurrentStepIndex(1), 500);
      const step2 = window.setTimeout(() => setCurrentStepIndex(2), 1000);
      const done = window.setTimeout(() => {
        setAiSummary({
          summary: conversation.dealSummary,
          status: conversation.status,
          daysSinceReply: conversation.daysSinceLastReply,
          urgencyReason: conversation.nextBestAction,
          suggestedTone: conversation.urgency === "Critical" ? "urgent" : "professional",
          leadScore: conversation.leadScore
        });
        setAnalyzedLeads((prev) => ({ ...prev, [conversation.id]: true }));
        setLoading(false);
      }, 1500);

      return () => {
        window.clearTimeout(step1);
        window.clearTimeout(step2);
        window.clearTimeout(done);
      };
    }
  // Reset generated content only when the user switches threads, not when a sent reply updates the active thread.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?.id]);

  async function generateReplies() {
    if (!conversation || !aiSummary) {
      return;
    }

    setRepliesLoading(true);
    setSent(false);
    setDraftFailed(false);
    window.setTimeout(() => {
      const generatedReplies = conversation.contextualReplies.filter(Boolean);
      const nextReplies = generatedReplies.length > 0 ? generatedReplies : [buildFallbackReply(conversation)];

      setDraftFailed(generatedReplies.length === 0);
      setReplies(nextReplies);
      setSelectedReplyIndex(0);
      setDraft(nextReplies[0] ?? "");
      setRepliesLoading(false);
    }, 700);
  }

  if (!conversation) {
    return (
      <section className="flex min-w-0 flex-1 bg-white">
          <div className="m-4 flex flex-1 flex-col items-center justify-center rounded-xl border border-[#e8e8e4] bg-[#fafaf8]">
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
            <div className="relative">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e8f5e9] text-[13px] font-bold text-[#1a3a1c]">
                {conversation.avatar}
              </div>
              <span className={cn(
                "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-white",
                conversation.platform === "whatsapp" ? "bg-[#25D366]" : conversation.platform === "instagram" ? "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]" : "bg-sky-400"
              )}>
                {conversation.platform === "whatsapp" ? (
                  <MessageCircle className="h-3 w-3" />
                ) : conversation.platform === "instagram" ? (
                  <Instagram className="h-3 w-3" />
                ) : (
                  <Mail className="h-3 w-3" />
                )}
              </span>
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
                <span>•</span>
                <span className="font-semibold text-[#0f0f0f]">{conversation.leadValue} opportunity</span>
              </div>
            </div>
          </div>

          <div className={cn(
            "mr-12 rounded-xl border px-3 py-2 text-[11px] font-semibold",
            conversation.daysSinceLastReply > 0
              ? "border-[#ffd5d2] bg-[#fff1f0] text-[#c0392b]"
              : "border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]"
          )}>
            {conversation.daysSinceLastReply > 0
              ? `${conversation.daysSinceLastReply} days since last reply`
              : "Reply sent just now"}
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

      {isAiOpen ? (
        <aside
          className="relative flex h-full flex-shrink-0 flex-col border-l border-[#f0f0ec] bg-[#fafaf8]"
          style={{ width: aiPanelWidth }}
        >
          <button
            type="button"
            onMouseDown={onAiResizeStart}
            className="group absolute left-[-7px] top-0 z-30 flex h-full w-3 cursor-col-resize items-center justify-center"
            aria-label="Resize AI Intelligence panel"
          >
            <span className="h-24 w-1 rounded-full bg-[#d4d4cc] opacity-80 transition group-hover:h-32 group-hover:bg-[#0f0f0f]" />
          </button>
          <div className="flex items-start justify-between gap-3 border-b border-[#f0f0ec] p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b]">
                AI Intelligence
              </p>
              <h3 className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-[#0f0f0f]">
                Lead rescue brief
              </h3>
            </div>
            <button
              type="button"
              onClick={onAiClose}
              className="grid h-8 w-8 place-items-center rounded-lg border border-[#e8e8e4] bg-white text-[#6b6b6b] transition hover:border-[#d8d8d2] hover:text-[#0f0f0f]"
              aria-label="Close AI Intelligence panel"
            >
              <PanelRightClose className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
          <div className="rounded-xl border border-[#e8e8e4] bg-white p-4 text-[13px] text-[#0f0f0f] shadow-sm">
            {loading ? (
              <div className="space-y-4 py-2">
                {analysisSteps.map((step, index) => {
                  const isActive = currentStepIndex === index;
                  const isDone = currentStepIndex > index;
                  return (
                    <div key={step} className="flex items-center gap-3">
                      <span className={cn(
                        "grid h-6 w-6 place-items-center rounded-lg text-[10px] font-bold transition-all duration-300",
                        isDone ? "bg-[#a3e635] text-[#0a1a0c]" : isActive ? "bg-[#0a1a0c] text-white animate-pulse" : "bg-[#f0f0ec] text-[#6b6b6b]"
                      )}>
                        {isDone ? "✓" : index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-[12px] font-semibold transition-colors duration-300", isActive ? "text-[#0a1a0c]" : isDone ? "text-[#5a6e5c]" : "text-[#9b9b9b]")}>
                          {step}
                        </p>
                        {isActive && (
                          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#f0f0ec]">
                            <div className="h-full w-2/3 rounded-full bg-[#a3e635] animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : aiSummary ? (
              <>
                {/* Lead Score & Estimated Value Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl border border-[#e8e8e4] bg-white p-3.5 shadow-sm">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#9b9b9b]">
                      <Brain className="h-3.5 w-3.5 text-[#2e7d32]" />
                      Lead score
                    </span>
                    <p className="mt-2 text-[20px] font-extrabold text-[#0a1a0c]">
                      {aiSummary.leadScore} <span className="text-[13px] font-normal text-[#6b6b6b]">/ 10</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e4] bg-white p-3.5 shadow-sm">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#9b9b9b]">
                      <DollarSign className="h-3.5 w-3.5 text-[#6b6b6b]" />
                      Estimated value
                    </span>
                    <p className="mt-2 text-[20px] font-extrabold text-[#0a1a0c]">
                      {conversation.leadValue}
                    </p>
                  </div>
                </div>

                {/* Why This Lead Matters Section */}
                <div className="rounded-xl border border-[#f0f0ec] bg-[#fafaf8] p-4 space-y-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#9b9b9b]">
                    Why this lead matters
                  </p>
                  
                  {/* Visual bullet points representing lead metrics */}
                  <div className="flex flex-col gap-2">
                    {[
                      ["Budget mentioned", conversation.whyItMatters.budgetMentioned],
                      ["High buying intent", conversation.whyItMatters.buyingIntentDetected],
                      ["Timeline specified", conversation.whyItMatters.timelineMentioned],
                      [`Delayed response SLA breach`, conversation.whyItMatters.delayedDays > 0]
                    ].map(([label, active]) => {
                      if (!active) return null;
                      return (
                        <div key={String(label)} className="flex items-center gap-2 text-[12px] text-[#2c3e2e] font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] flex-shrink-0" />
                          <span>{label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#e8e8e4] pt-3">
                    <p className="text-[12.5px] leading-6 text-[#4a554a]">{aiSummary.summary}</p>
                  </div>
                </div>

                {/* Recommended Action Card */}
                <div className="mt-4 rounded-xl border border-[#ffd5d2] bg-[#fff1f0] p-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#c0392b]">
                    <Target className="h-3.5 w-3.5" />
                    Recommended action
                  </div>
                  <p className="mt-2 text-[12px] leading-5 font-semibold text-[#c0392b]">
                    {aiSummary.urgencyReason}
                  </p>
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
            {repliesLoading ? "Composing..." : "Generate revenue-saving follow-up"}
          </button>

          {repliesLoading ? (
            <div className="mt-4 space-y-2">
              <div className="h-20 animate-pulse rounded-xl bg-[#f0f0ec]" />
              <div className="h-20 animate-pulse rounded-xl bg-[#f0f0ec]" />
            </div>
          ) : null}

          {draftFailed ? (
            <div className="mt-4 rounded-xl border border-[#fde68a] bg-[#fffbeb] p-3 text-[#92400e]">
              <p className="text-[12px] font-bold">Draft generation failed.</p>
              <p className="mt-1 text-[12px]">Use rescue draft instead.</p>
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
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#3f6212]">
                      Context draft {index + 1}
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
                setRescuedValue(formatOpportunityValue(conversation.leadValue));
                onReplySent(conversation.id, draft.trim());
                setSent(true);
                setReplies([]);
                setSelectedReplyIndex(null);
                setDraftFailed(false);
              }
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a1a0c] px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-[#1a3a1c]"
          >
            Send reply <ArrowUpRight className="h-4 w-4" />
          </button>
          {sent ? (
            <div className="mt-3 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-3 text-center text-[#166534]">
              <p className="flex items-center justify-center gap-2 text-[12px] font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Lead rescued
              </p>
              <p className="mt-1 text-[11px]">
                {rescuedValue || formatOpportunityValue(conversation.leadValue)} opportunity moved out of risk
              </p>
            </div>
          ) : null}
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={onAiOpen}
          className="flex w-11 flex-shrink-0 items-center justify-center border-l border-[#e8e8e4] bg-[#fafaf8] text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] transition hover:bg-white hover:text-[#0f0f0f]"
          aria-label="Open AI Intelligence panel"
        >
          <span className="rotate-90 whitespace-nowrap">AI Brief</span>
        </button>
      )}
    </section>
  );
}

export default ConversationDetail;
