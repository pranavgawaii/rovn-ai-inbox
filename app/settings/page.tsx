"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RovnWordmark } from "@/components/ui/RovnLogo";
import { cn } from "@/lib/utils";
import { LogOut, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";

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

interface GmailAccount {
  email: string;
  connected: boolean;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("Connected Accounts");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Smart Follow-ups": true,
    "AI Lead Scoring": true,
    "Quiet Mode": false,
    "Auto Summaries": true,
    "Priority Alerts": false,
  });

  const [gmailAccount, setGmailAccount] = useState<GmailAccount | null>(null);
  const [gmailLeadsCount, setGmailLeadsCount] = useState(0);
  const [gmailStatus, setGmailStatus] = useState<"idle" | "connecting" | "success" | "error">("idle");
  const [gmailError, setGmailError] = useState<string | null>(null);

  // Check URL params & cookie on mount
  useEffect(() => {
    const connected = searchParams.get("gmailConnected");
    const error = searchParams.get("gmailError");

    if (connected === "true") {
      setGmailStatus("success");
      setActiveSection("Connected Accounts");
    }
    if (error) {
      setGmailStatus("error");
      setGmailError(
        error === "access_denied"
          ? "Access was denied. Please try again."
          : "Connection failed. Check your Google OAuth credentials."
      );
      setActiveSection("Connected Accounts");
    }

    // Read from cookie
    const accountCookie = getCookie("rovn_gmail_account");
    const leadsCookie = getCookie("rovn_gmail_leads");

    if (accountCookie) {
      try {
        setGmailAccount(JSON.parse(accountCookie));
      } catch {}
    }
    if (leadsCookie) {
      try {
        const leads = JSON.parse(leadsCookie);
        setGmailLeadsCount(Array.isArray(leads) ? leads.length : 0);
      } catch {}
    }
  }, [searchParams]);

  const toggleState = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConnectGmail = () => {
    setGmailStatus("connecting");
    window.location.href = "/api/auth/google";
  };

  const handleDisconnectGmail = () => {
    // Clear cookies
    document.cookie = "rovn_gmail_account=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "rovn_gmail_leads=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setGmailAccount(null);
    setGmailLeadsCount(0);
    setGmailStatus("idle");
    setGmailError(null);
  };

  const isGmailConnected = !!gmailAccount?.connected || gmailStatus === "success";

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
                  {section === "Connected Accounts" && isGmailConnected && (
                    <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#a3e635] align-middle" />
                  )}
                </button>
              );
            })}
          </aside>

          <section className="rounded-3xl border border-[#e8e8e4] bg-white p-8 lg:p-12 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#a3e635]">
              {activeSection}
            </p>
            <h1 className="mt-3 text-[32px] font-bold tracking-tight text-[#0f0f0f] md:text-[40px]">
              {activeSection === "AI Preferences"
                ? "Tune how Rovn helps."
                : activeSection === "Connected Accounts"
                ? "Connect your channels."
                : `${activeSection} Settings`}
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
                {/* WhatsApp */}
                <div className="flex items-center justify-between rounded-2xl border border-[#e8e8e4] bg-[#f7f7f4] p-5">
                  <div>
                    <p className="text-[14px] font-semibold text-[#0f0f0f]">WhatsApp Business</p>
                    <p className="mt-1 text-[12px] text-[#6b6b6b]">Connected as +1 (555) 123-4567</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-[12px] font-bold transition-all bg-white border border-[#e8e8e4] text-[#6b6b6b] hover:text-[#c0392b]">
                    Disconnect
                  </button>
                </div>

                {/* Instagram */}
                <div className="flex items-center justify-between rounded-2xl border border-[#e8e8e4] bg-[#f7f7f4] p-5">
                  <div>
                    <p className="text-[14px] font-semibold text-[#0f0f0f]">Instagram Direct</p>
                    <p className="mt-1 text-[12px] text-[#6b6b6b]">Not connected</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-[12px] font-bold transition-all bg-[#a3e635] text-[#0a1a0c] hover:bg-[#8bc92a]">
                    Connect
                  </button>
                </div>

                {/* Gmail — real OAuth */}
                <div className={cn(
                  "rounded-2xl border p-5 transition-all",
                  isGmailConnected
                    ? "border-[#a3e635]/40 bg-[#efffd6]/40"
                    : "border-[#e8e8e4] bg-[#f7f7f4]"
                )}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl",
                        isGmailConnected ? "bg-[#a3e635]/20" : "bg-white border border-[#e8e8e4]"
                      )}>
                        <Mail className={cn("h-4 w-4", isGmailConnected ? "text-[#1a3a1c]" : "text-[#6b6b6b]")} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-semibold text-[#0f0f0f]">Gmail Workspace</p>
                          {isGmailConnected && (
                            <>
                              <span className="flex items-center gap-1 rounded-full bg-[#a3e635]/20 px-2 py-0.5 text-[10px] font-bold text-[#1a3a1c]">
                                <CheckCircle2 className="h-3 w-3" />
                                Gmail Connected
                              </span>
                              <span className="flex items-center gap-1 rounded-full bg-[#a3e635]/20 px-2 py-0.5 text-[10px] font-bold text-[#1a3a1c]">
                                1 Inbox Synced
                              </span>
                            </>
                          )}
                        </div>
                        {isGmailConnected ? (
                          <div className="mt-1 space-y-0.5">
                            <p className="text-[12px] text-[#4a6a4c] font-medium">
                              {gmailAccount?.email || "Gmail account connected"}
                            </p>
                            {gmailLeadsCount > 0 && (
                              <p className="text-[11px] text-[#6b8a6d]">
                                {gmailLeadsCount} leads imported into Revenue At Risk
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="mt-1 text-[12px] text-[#6b6b6b]">
                            Connect Gmail to import leads from your inbox
                          </p>
                        )}
                        {gmailError && (
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-red-600">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {gmailError}
                          </div>
                        )}
                      </div>
                    </div>

                    {isGmailConnected ? (
                      <button
                        onClick={handleDisconnectGmail}
                        className="flex-shrink-0 px-4 py-2 rounded-xl text-[12px] font-bold transition-all bg-white border border-[#e8e8e4] text-[#6b6b6b] hover:text-[#c0392b]"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={handleConnectGmail}
                        disabled={gmailStatus === "connecting"}
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all bg-[#a3e635] text-[#0a1a0c] hover:bg-[#8bc92a] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {gmailStatus === "connecting" ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Connecting…
                          </>
                        ) : (
                          "Connect Gmail"
                        )}
                      </button>
                    )}
                  </div>

                  {/* Success import summary */}
                  {isGmailConnected && gmailLeadsCount > 0 && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 px-4 py-3">
                      <CheckCircle2 className="h-4 w-4 text-[#1a3a1c] flex-shrink-0" />
                      <p className="text-[12px] font-medium text-[#1a3a1c]">
                        {gmailLeadsCount} emails imported and scored as leads. Check your{" "}
                        <Link href="/dashboard" className="underline font-bold">
                          Revenue At Risk dashboard
                        </Link>{" "}
                        to see them.
                      </p>
                    </div>
                  )}
                </div>
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

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#f7f7f4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#6b6b6b]" />
          <p className="text-[13px] text-[#6b6b6b] font-medium">Loading Settings…</p>
        </div>
      </main>
    }>
      <SettingsContent />
    </Suspense>
  );
}
