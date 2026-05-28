"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import ConversationList from "@/components/ConversationList";
import ConversationDetail from "@/components/ConversationDetail";
import { conversations } from "@/lib/mockData";
import type { Conversation } from "@/lib/types";

type PlatformFilter = "all" | "whatsapp" | "instagram" | "email";
type StatusFilter = "all" | "hot" | "pending" | "cold";

export default function DashboardPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>("all");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const filteredByPlatform =
    selectedPlatform === "all"
      ? conversations
      : conversations.filter((conversation) => conversation.platform === selectedPlatform);

  function onPlatformChange(platform: PlatformFilter) {
    setSelectedPlatform(platform);
    setSelectedConversation(null);
  }

  function onSelect(conversation: Conversation) {
    setSelectedConversation(conversation);
  }

  function onFilterChange(nextFilter: StatusFilter) {
    setFilter(nextFilter);
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      <Sidebar
        selectedPlatform={selectedPlatform}
        onPlatformChange={onPlatformChange}
        conversations={conversations}
      />
      <ConversationList
        conversations={filteredByPlatform}
        selectedId={selectedConversation?.id}
        onSelect={onSelect}
        filter={filter}
        onFilterChange={onFilterChange}
      />
      <ConversationDetail conversation={selectedConversation} />
      
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
