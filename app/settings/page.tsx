"use client";

import { useState } from "react";
import Link from "next/link";
import { RovnWordmark } from "@/components/RovnLogo";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

const sections = [
  "Profile",
  "Connected Accounts",
  "AI Preferences",
  "Notifications",
  "Appearance",
  "Billing",
  "Workspace",
  "API Keys",
  "Integrations"
];

const toggleKeys = ["Smart Follow-ups", "AI Lead Scoring", "Quiet Mode", "Auto Summaries", "Priority Alerts"];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("AI Preferences");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Smart Follow-ups": true,
    "AI Lead Scoring": true,
    "Quiet Mode": false,
    "Auto Summaries": true,
    "Priority Alerts": false,
  });

  const toggleState = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="transition hover:opacity-80">
            <RovnWordmark className="text-[#0a1a0c] dark:text-[#0a1a0c]" imgClassName="invert" />
          </Link>
          <Link href="/sign-out" className="flex items-center gap-2 text-[13px] font-medium text-[#6b6b6b] hover:text-[#0a1a0c] transition-colors bg-white border border-[#e8e8e4] px-4 py-2 rounded-xl shadow-sm">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
        
        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-[#e8e8e4] bg-white p-3 shadow-sm">
            {sections.map((section) => {
              const isActive = activeSection === section;
              return (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={cn(
                    "mb-1 block w-full rounded-2xl px-4 py-3 text-left text-[13px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#f7f7f4] text-[#0f0f0f] shadow-sm border border-[#e8e8e4]"
                      : "text-[#6b6b6b] hover:bg-[#f7f7f4]/60 hover:text-[#0f0f0f]"
                  )}
                >
                  {section}
                </button>
              );
            })}
          </aside>
          
          <section className="rounded-3xl border border-[#e8e8e4] bg-white p-8 lg:p-12 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#a3e635]">
              {activeSection}
            </p>
            <h1 className="mt-3 text-[32px] font-bold tracking-tight text-[#0f0f0f] md:text-[40px]">
              {activeSection === "AI Preferences" ? "Tune how Rovn helps." : `${activeSection} Settings`}
            </h1>
            
            {activeSection === "AI Preferences" ? (
              <>
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {toggleKeys.map((toggle) => {
                    const enabled = toggles[toggle];
                    return (
                      <div 
                        key={toggle} 
                        className="flex items-center justify-between rounded-2xl border border-[#e8e8e4] bg-[#f7f7f4] p-5 transition-all hover:border-[#a3e635]/50"
                      >
                        <div>
                          <p className="text-[14px] font-semibold text-[#0f0f0f]">{toggle}</p>
                          <p className="mt-1.5 text-[12px] leading-relaxed text-[#6b6b6b]">
                            Keep AI proactive, quiet, and useful.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleState(toggle)}
                          className={cn(
                            "relative flex h-7 w-12 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:ring-offset-2",
                            enabled ? "bg-[#a3e635]" : "bg-[#d0d0cc]"
                          )}
                        >
                          <span
                            className={cn(
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                              enabled ? "translate-x-5" : "translate-x-0.5"
                            )}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 rounded-2xl border border-[#e8e8e4] bg-[#f7f7f4] p-6">
                  <p className="text-[14px] font-semibold text-[#0f0f0f]">OpenAI / OpenRouter key</p>
                  <p className="mt-1 text-[12px] text-[#6b6b6b]">Your API key is securely stored in environment variables.</p>
                  <div className="mt-4 rounded-xl border border-[#e8e8e4] bg-white px-4 py-3 font-mono text-[13px] text-[#6b8a6d]">
                    sk-••••••••••••••••••••••••••••
                  </div>
                </div>
              </>
            ) : activeSection === "Connected Accounts" ? (
              <div className="mt-10 space-y-4">
                {[
                  { name: "WhatsApp Business", connected: true, id: "+1 (555) 123-4567" },
                  { name: "Instagram Direct", connected: false, id: "@rovn.ai" },
                  { name: "Gmail Workspace", connected: true, id: "hello@rovn.in" }
                ].map(account => (
                  <div key={account.name} className="flex items-center justify-between rounded-2xl border border-[#e8e8e4] bg-[#f7f7f4] p-5">
                    <div>
                      <p className="text-[14px] font-semibold text-[#0f0f0f]">{account.name}</p>
                      <p className="mt-1 text-[12px] text-[#6b6b6b]">{account.connected ? `Connected as ${account.id}` : "Not connected"}</p>
                    </div>
                    <button className={cn("px-4 py-2 rounded-xl text-[12px] font-bold transition-all", account.connected ? "bg-white border border-[#e8e8e4] text-[#6b6b6b] hover:text-[#c0392b]" : "bg-[#a3e635] text-[#0a1a0c] hover:bg-[#8bc92a]")}>
                      {account.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d0d0cc] py-20 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f7f7f4]">
                  <svg className="h-6 w-6 text-[#8a9e8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <p className="mt-4 text-[14px] font-medium text-[#0f0f0f]">Configuration</p>
                <p className="mt-1 text-[13px] text-[#6b6b6b]">Configure your {activeSection.toLowerCase()} settings here.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
