"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, Inbox, Mail, PanelLeftClose, Settings, Sparkles, Instagram } from "lucide-react";
import { RovnWordmark } from "@/components/ui/RovnLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={props.className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.488 4.603 1.49 5.485 0 9.947-4.461 9.95-9.95.002-2.66-1.033-5.159-2.908-7.037-1.875-1.878-4.378-2.913-7.04-2.915-5.49 0-9.953 4.463-9.957 9.953-.002 1.64.467 3.243 1.353 4.643l-.994 3.634 3.743-.982zm11.382-7.854c-.29-.145-1.716-.848-1.982-.943-.266-.096-.46-.145-.653.146-.193.29-.748.943-.918 1.139-.17.195-.34.22-.63.074-1.282-.641-2.115-1.125-2.946-2.545-.22-.375.22-.349.63-1.168.07-.145.035-.272-.017-.38-.052-.108-.46-1.11-.63-1.52-.17-.408-.346-.35-.476-.355-.125-.004-.268-.005-.41-.005-.143 0-.376.054-.57.263-.195.21-.745.727-.745 1.77 0 1.044.759 2.051.865 2.193.106.142 1.492 2.278 3.615 3.193.504.218.898.348 1.206.446.508.162.969.139 1.334.085.408-.06 1.716-.7 1.961-1.374.246-.674.246-1.25.173-1.373-.074-.124-.27-.197-.56-.343z"/>
  </svg>
);

type PlatformFilter = "all" | "whatsapp" | "instagram" | "email";

interface SidebarProps {
  selectedPlatform: PlatformFilter;
  onPlatformChange: (platform: PlatformFilter) => void;
  conversations: Conversation[];
  onClose: () => void;
  gmailConnected?: boolean;
}

const navItems: Array<{
  key: PlatformFilter;
  label: string;
  icon: React.ComponentType<any>;
}> = [
  { key: "all", label: "All inbox", icon: Inbox },
  { key: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "email", label: "Email", icon: Mail }
];

function PremiumToggle({
  label,
  enabled,
  onChange
}: {
  label: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[#c8d4c9] transition hover:bg-white/5"
    >
      <span className="text-[12px] font-medium">{label}</span>
      <span className={cn("relative h-5 w-9 rounded-full transition", enabled ? "bg-[#a3e635]" : "bg-white/10")}>
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-[#0a1a0c] transition",
            enabled ? "left-[18px]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

export default function Sidebar({
  selectedPlatform,
  onPlatformChange,
  conversations,
  onClose,
  gmailConnected = false,
}: SidebarProps) {
  const [leadScoring, setLeadScoring] = useState(true);
  const [smartDrafts, setSmartDrafts] = useState(true);
  const [quietMode, setQuietMode] = useState(false);

  const getCount = (platform: PlatformFilter) => {
    return conversations.filter((conversation) => {
      const matchesPlatform = platform === "all" || conversation.platform === platform;

      return matchesPlatform && conversation.status !== "cold";
    }).length;
  };

  return (
    <aside className="relative flex h-full w-[260px] flex-shrink-0 flex-col bg-[#0a1a0c]">
      <div className="flex items-center justify-between px-5 pb-8 pt-8">
        <RovnWordmark className="text-white" />
        <button
          type="button"
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#8a9e8b] transition hover:border-[#a3e635]/30 hover:bg-[#132a15] hover:text-[#a3e635]"
          aria-label="Close main sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <nav className="px-4">
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b8a6d]">
          Inbox
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const count = getCount(item.key);
          const isActive = selectedPlatform === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onPlatformChange(item.key)}
              className={cn(
                "mb-1 flex w-full items-center justify-between rounded-xl py-3 pl-3 pr-3 text-left text-[14px] transition border",
                isActive
                  ? "border-[#a3e635]/15 bg-[rgba(163,230,53,0.15)] text-[#a3e635] font-semibold"
                  : "border-transparent text-[#8a9e8b] hover:bg-white/5"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </span>
              {count > 0 ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    isActive ? "bg-[#a3e635] text-[#0a1a0c]" : "bg-white/10 text-[#8a9e8b]"
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

        <div className="mt-6 px-4">
        <p className="mb-2.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b8a6d]">
          Channels
        </p>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#8a9e8b] font-medium flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse" /> WhatsApp
            </span>
            <span className="text-[10px] font-semibold text-[#a3e635] bg-[#a3e635]/10 px-2 py-0.5 rounded-md">Connected</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#8a9e8b] font-medium flex items-center gap-2">
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                gmailConnected ? "bg-[#a3e635] animate-pulse" : "bg-amber-400"
              )} /> Gmail
            </span>
            {gmailConnected ? (
              <span className="text-[10px] font-semibold text-[#a3e635] bg-[#a3e635]/10 px-2 py-0.5 rounded-md">Connected</span>
            ) : (
              <a
                href="/api/auth/google"
                className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md hover:bg-amber-400/20 transition"
              >
                Connect
              </a>
            )}
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#8a9e8b] font-medium flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Instagram
            </span>
            <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">Pending</span>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b8a6d]">
          AI mode
        </p>
        <div className="space-y-1">
          <Link href="/settings?tab=ai" className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[#c8d4c9] transition hover:bg-white/5">
            <span className="flex items-center gap-3 text-[13px] font-medium"><Sparkles className="h-4 w-4 text-[#a3e635]" /> AI Settings</span>
          </Link>
        </div>
      </div>

      <div className="mt-auto px-4 pb-5">
        <div className="mb-4 space-y-1 border-b border-white/10 pb-4">
          <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-[#8a9e8b] transition hover:bg-white/5 hover:text-[#c8d4c9]">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link href="mailto:support@rovn.in" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-[#8a9e8b] transition hover:bg-white/5 hover:text-[#c8d4c9]">
            <HelpCircle className="h-4 w-4" />
            Help centre
          </Link>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-[#132a15] p-3 border border-white/5 transition hover:border-white/10 hover:bg-[#1a3a1c] cursor-pointer">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#a3e635] text-[13px] font-bold text-[#0a1a0c]">
            P
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-[13px] font-semibold text-white">Pranav</p>
            <p className="truncate text-[11px] text-[#8a9e8b]">pranav@rovn.in</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
