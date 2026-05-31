"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, MessageSquareReply, Sparkles, TrendingUp } from "lucide-react";
import { RovnWordmark } from "@/components/ui/RovnLogo";
import Sidebar from "@/components/dashboard/Sidebar";
import ConversationList from "@/components/dashboard/ConversationList";
import ConversationDetail from "@/components/dashboard/ConversationDetail";
import { conversations as initialConversations } from "@/lib/data/mockData";
import type { Conversation } from "@/lib/types";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

type PlatformFilter = "all" | "whatsapp" | "instagram" | "email";
type StatusFilter = "all" | "hot" | "pending" | "cold";
type ResizeTarget = "list" | "ai";

function getHottestConversation(conversations: Conversation[]) {
  return [...conversations].sort((a, b) => {
    const statusWeight = { hot: 3, pending: 2, cold: 1 };
    const aScore = a.leadScore * 10 + a.daysSinceLastReply * 4 + statusWeight[a.status] * 20;
    const bScore = b.leadScore * 10 + b.daysSinceLastReply * 4 + statusWeight[b.status] * 20;

    return bScore - aScore;
  })[0] ?? null;
}

function getLeadValueInThousands(value: string) {
  const normalized = value.toLowerCase().replace(/,/g, "");
  const amount = Number.parseFloat(normalized.replace(/[^\d.]/g, ""));

  if (Number.isNaN(amount)) {
    return 0;
  }

  return normalized.includes("k") ? amount : amount / 1000;
}

function formatAtRiskValue(valueInThousands: number) {
  if (valueInThousands <= 0) {
    return "₹0";
  }

  const rounded = Number.isInteger(valueInThousands)
    ? valueInThousands.toFixed(0)
    : valueInThousands.toFixed(1);

  return `₹${rounded}k`;
}

export default function DashboardPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>("all");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    getHottestConversation(initialConversations)?.id ?? null
  );
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isListOpen, setIsListOpen] = useState(true);
  const [isAiOpen, setIsAiOpen] = useState(true);
  const [listWidth, setListWidth] = useState(380);
  const [aiWidth, setAiWidth] = useState(336);
  const [recentlyRescuedId, setRecentlyRescuedId] = useState<string | null>(null);
  const [animateKpis, setAnimateKpis] = useState(false);
  const resizeRef = useRef<{ target: ResizeTarget; startX: number; startWidth: number } | null>(null);

  function handleResetDemo() {
    setConversations(JSON.parse(JSON.stringify(initialConversations)));
    setResetKey((prev) => prev + 1);
    setSelectedConversationId(getHottestConversation(initialConversations)?.id ?? null);
    setShowProfileMenu(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const approved = localStorage.getItem("rovn_approved");
      setIsApproved(approved === "true");

      // Load Gmail leads from cookie
      const accountCookie = getCookie("rovn_gmail_account");
      const leadsCookie = getCookie("rovn_gmail_leads");

      if (accountCookie) {
        try {
          const account = JSON.parse(accountCookie);
          setGmailConnected(!!account.connected);
        } catch {}
      }

      if (leadsCookie) {
        try {
          const gmailLeads = JSON.parse(leadsCookie) as Conversation[];
          if (Array.isArray(gmailLeads) && gmailLeads.length > 0) {
            setConversations((prev) => {
              // Avoid duplicates
              const existingIds = new Set(prev.map((c) => c.id));
              const newLeads = gmailLeads.filter((l) => !existingIds.has(l.id));
              return [...prev, ...newLeads];
            });
          }
        } catch {}
      }
    }
  }, [resetKey]);

  const filteredByPlatform =
    selectedPlatform === "all"
      ? conversations
      : conversations.filter((conversation) => conversation.platform === selectedPlatform);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ??
    getHottestConversation(filteredByPlatform);

  const hotLeads = conversations.filter((conversation) => conversation.status === "hot").length;
  const delayedReplies = conversations.filter(
    (conversation) => conversation.daysSinceLastReply >= 2 && conversation.status !== "cold"
  ).length;
  const draftsReady = conversations.filter((conversation) => conversation.status !== "cold").length;
  const pipelineAtRisk = formatAtRiskValue(conversations
    .filter((conversation) => conversation.status === "hot")
    .reduce((total, conversation) => total + getLeadValueInThousands(conversation.leadValue), 0));

  const kpis = [
    { label: "Hot Leads", value: hotLeads, icon: Flame, tone: "text-[#c0392b]", bg: "bg-[#fff1f0]" },
    { label: "Delayed Replies", value: delayedReplies, icon: MessageSquareReply, tone: "text-[#92400e]", bg: "bg-[#fffbeb]" },
    { label: "Drafts Ready", value: draftsReady, icon: Sparkles, tone: "text-[#1a3a1c]", bg: "bg-[#efffd6]" },
    { label: "At Risk", value: pipelineAtRisk, icon: TrendingUp, tone: "text-[#0f0f0f]", bg: "bg-white" }
  ];

  useEffect(() => {
    function clamp(value: number, min: number, max: number) {
      return Math.min(Math.max(value, min), max);
    }

    function onMouseMove(event: MouseEvent) {
      const activeResize = resizeRef.current;

      if (!activeResize) {
        return;
      }

      const delta = event.clientX - activeResize.startX;

      if (activeResize.target === "list") {
        setListWidth(clamp(activeResize.startWidth + delta, 300, 520));
      } else {
        setAiWidth(clamp(activeResize.startWidth - delta, 300, 480));
      }
    }

    function onMouseUp() {
      resizeRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  function onPlatformChange(platform: PlatformFilter) {
    setSelectedPlatform(platform);
    const nextPool = platform === "all"
      ? conversations
      : conversations.filter((conversation) => conversation.platform === platform);
    setSelectedConversationId(getHottestConversation(nextPool)?.id ?? null);
  }

  function onSelect(conversation: Conversation) {
    setSelectedConversationId(conversation.id);
  }

  function onFilterChange(nextFilter: StatusFilter) {
    setFilter(nextFilter);
  }

  function startResize(target: ResizeTarget, event: React.MouseEvent<HTMLButtonElement>) {
    resizeRef.current = {
      target,
      startX: event.clientX,
      startWidth: target === "list" ? listWidth : aiWidth
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    event.preventDefault();
  }

  function onReplySent(conversationId: string, reply: string) {
    setRecentlyRescuedId(conversationId);
    setAnimateKpis(true);
    setConversations((current) =>
      current.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,
          status: "pending",
          daysSinceLastReply: 0,
          messages: [
            ...conversation.messages,
            {
              id: `sent_${Date.now()}`,
              role: "business",
              content: reply,
              timestamp: "Just now"
            }
          ]
        };
      })
    );
    window.setTimeout(() => setAnimateKpis(false), 900);
    window.setTimeout(() => setRecentlyRescuedId(null), 2400);
  }

  if (isApproved === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#fafaf8]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1a3a1c] border-t-transparent" />
      </div>
    );
  }

  if (isApproved === false) {
    return (
      <main className="min-h-screen bg-[#fafaf8] text-[#0a1a0c] flex flex-col justify-between">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/">
            <RovnWordmark className="text-[#0a1a0c]" imgClassName="invert" />
          </Link>
          <button
            onClick={() => {
              localStorage.setItem("rovn_approved", "true");
              setIsApproved(true);
            }}
            className="text-[12px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 hover:text-emerald-950 px-3 py-1.5 rounded-lg transition"
          >
            🔓 Bypass Gate for Hackathon
          </button>
        </header>

        <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] w-full">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5a6e5c] font-bold">Workspace Gated</p>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#0a1a0c] sm:text-4xl">
              Rovn Private Preview Sandbox
            </h1>
            <p className="mt-4 text-[14px] leading-6 text-[#5a6e5c] max-w-md">
              Rovn is currently in private preview. To access the live AI lead rescue sandbox, your workspace must be approved by the core team.
            </p>
            
            <div className="mt-8 rounded-xl border border-[#e4e8e4] bg-[#eff2eb]/40 p-4 max-w-md space-y-2.5">
              <p className="text-[11px] font-bold text-[#1a3a1c] uppercase tracking-wider">Private Beta Highlights</p>
              <div className="flex items-center gap-2.5 text-[12.5px] text-[#4a5a4a] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1a3a1c]" />
                <span>Real-time WhatsApp & Instagram API integration</span>
              </div>
              <div className="flex items-center gap-2.5 text-[12.5px] text-[#4a5a4a] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1a3a1c]" />
                <span>Urgency diagnostics & lead prioritization</span>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[400px] rounded-[28px] border border-[#1a3a1c] bg-[#0a1a0c] p-8 text-white shadow-[0_30px_90px_rgba(10,26,12,0.22)]">
            <h2 className="text-xl font-bold tracking-[-0.03em]">Request Sandbox Access</h2>
            <p className="mt-2 text-[12px] text-[#8a9e8b] leading-relaxed">
              Register below. The demo allows instant dev-bypass for the OpenAI Hackathon team.
            </p>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("✨ Joined! Your email has been added to waitlist. We will notify you once approved.");
              }}
              className="mt-6 space-y-4"
            >
              <input
                type="email"
                required
                placeholder="Work Email"
                className="h-11 w-full rounded-xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[13px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50 transition-colors"
              />
              <input
                type="text"
                required
                placeholder="Company Name"
                className="h-11 w-full rounded-xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[13px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50 transition-colors"
              />
              
              <button
                type="submit"
                className="block w-full rounded-xl bg-[#a3e635] py-2.5 text-center text-[13px] font-bold text-[#0a1a0c] shadow-[0_0_24px_rgba(163,230,53,0.18)] transition hover:bg-[#bef264]"
              >
                Join Waitlist
              </button>

              <div className="border-t border-white/5 pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("rovn_approved", "true");
                    setIsApproved(true);
                  }}
                  className="text-[11px] font-semibold text-[#8a9e8b] hover:text-[#a3e635] transition"
                >
                  🔓 Hackathon Reviewer? Bypass Gate
                </button>
              </div>
            </form>
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-6xl items-center justify-between border-t border-[#e4e8e4] px-6 py-6 text-[12px] text-[#5a6e5c]">
          <p>© 2026 Rovn. All rights reserved.</p>
          <a
            href="https://pranavx.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#1a3a1c] hover:text-[#a3e635] transition"
          >
            Built by Pranav Gawai
          </a>
        </footer>
      </main>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      {isSidebarOpen ? (
        <Sidebar
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
          conversations={conversations}
          onClose={() => setIsSidebarOpen(false)}
          gmailConnected={gmailConnected}
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="flex w-12 flex-shrink-0 items-center justify-center border-r border-[#143416] bg-[#0a1a0c] text-[10px] font-bold uppercase tracking-widest text-[#8a9e8b] transition hover:bg-[#132a15] hover:text-[#a3e635]"
          aria-label="Open main sidebar"
        >
          <span className="-rotate-90 whitespace-nowrap">Rovn</span>
        </button>
      )}
      <main className="flex min-w-0 flex-1 flex-col">
        <section className="grid grid-cols-4 gap-3 border-b border-[#e8e8e4] bg-[#f7f7f4] px-4 py-3">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;

            return (
              <motion.div
                key={kpi.label}
                animate={animateKpis ? { scale: [1, 1.035, 1], borderColor: ["#e8e8e4", "#86efac", "#e8e8e4"] } : { scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="min-w-0 rounded-xl border border-[#e8e8e4] bg-white px-4 py-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <motion.p
                    key={`${kpi.label}-${kpi.value}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="truncate text-[18px] font-bold tracking-[-0.03em] text-[#0f0f0f]"
                  >
                    <span>{kpi.value}</span>{" "}
                    <span className="text-[13px] font-semibold tracking-normal text-[#6b6b6b]">{kpi.label}</span>
                  </motion.p>
                  <span className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg ${kpi.bg} ${kpi.tone}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </section>
        <div className="flex min-h-0 flex-1">
          {isListOpen ? (
            <ConversationList
              conversations={filteredByPlatform}
              selectedId={selectedConversation?.id}
              onSelect={onSelect}
              filter={filter}
              onFilterChange={onFilterChange}
              width={listWidth}
              onClose={() => setIsListOpen(false)}
              onResizeStart={(event) => startResize("list", event)}
              recentlyRescuedId={recentlyRescuedId}
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsListOpen(true)}
              className="flex w-11 flex-shrink-0 items-center justify-center border-r border-[#e8e8e4] bg-[#f7f7f4] text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] transition hover:bg-white hover:text-[#0f0f0f]"
              aria-label="Open Revenue At Risk panel"
            >
              <span className="-rotate-90 whitespace-nowrap">Revenue</span>
            </button>
          )}
          <ConversationDetail
            key={resetKey}
            conversation={selectedConversation}
            onReplySent={onReplySent}
            aiPanelWidth={aiWidth}
            isAiOpen={isAiOpen}
            onAiClose={() => setIsAiOpen(false)}
            onAiOpen={() => setIsAiOpen(true)}
            onAiResizeStart={(event) => startResize("ai", event)}
          />
        </div>
      </main>
      
      {/* Global Dashboard Profile Avatar */}
      <div className="absolute right-6 top-4 z-40">
        <button
          type="button"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#132a15] border border-[#1a3a1c] hover:border-[#166534] transition text-[13px] font-bold text-[#a3e635] shadow-md cursor-pointer"
        >
          P
        </button>
 
        {showProfileMenu && (
          <div className="absolute right-0 mt-2.5 w-52 rounded-2xl border border-[#e8e8e4] bg-white/95 backdrop-blur-lg p-2.5 shadow-2xl text-left z-50 animate-in fade-in duration-200">
            <div className="px-3 py-1.5 border-b border-[#e8e8e4] mb-1.5">
              <p className="text-[12px] font-semibold text-[#0a1a0c]">Pranav</p>
              <p className="text-[10px] text-[#5a6e5c] truncate">pranav@rovn.in</p>
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={handleResetDemo}
                className="w-full text-left px-3 py-2 text-[12px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-950 font-bold rounded-lg transition"
              >
                Reset Demo
              </button>
              <Link
                href="/settings"
                className="block w-full text-left px-3 py-2 text-[12px] text-[#5a6e5c] hover:bg-[#f7f7f4] hover:text-[#0a1a0c] rounded-lg transition"
                onClick={() => setShowProfileMenu(false)}
              >
                Settings
              </Link>
              <Link
                href="/sign-out"
                className="block w-full text-left px-3 py-2 text-[12px] text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                onClick={() => setShowProfileMenu(false)}
              >
                Sign out
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
