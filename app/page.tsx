"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import rough from "roughjs";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Inbox,
  Instagram,
  Mail,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import { RovnWordmark } from "@/components/ui/RovnLogo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Demo", href: "#map" }
];

const heroKpis = ["3 Hot Leads", "3 Delayed Replies", "5 Drafts Ready", "₹126.8k At Risk"];

const mapNodes = [
  { id: "whatsapp", label: "WhatsApp", detail: "Pricing and booking intent", icon: MessageCircle, x: 20, y: 14 },
  { id: "instagram", label: "Instagram", detail: "DMs from reels and stories", icon: Instagram, x: 50, y: 14 },
  { id: "email", label: "Email", detail: "Quote requests and longer asks", icon: Mail, x: 80, y: 14 },
  { id: "missed", label: "Missed Follow-ups", detail: "Warm intent waits too long", icon: Zap, x: 50, y: 36 },
  { id: "risk", label: "Revenue At Risk", detail: "High-value leads start cooling", icon: TrendingUp, x: 50, y: 58 },
  { id: "rovn", label: "Rovn", detail: "Prioritize and draft the rescue", icon: Sparkles, x: 38, y: 82 },
  { id: "rescued", label: "Lead Rescued", detail: "Reply sent, momentum restored", icon: CheckCircle2, x: 62, y: 82 }
];

const steps = [
  ["01", "Connect Channels", "Bring WhatsApp, Instagram, and Email into one calm workspace."],
  ["02", "Identify Hot Leads", "See which conversations have budget, urgency, timeline, and delay."],
  ["03", "Generate Follow-Ups", "Create replies that reference the actual customer context."],
  ["04", "Rescue Revenue", "Send the reply and move the opportunity out of risk."]
];

function RoughRevenueMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState("risk");
  const [mapSize, setMapSize] = useState({ width: 600, height: 430 });
  const active = mapNodes.find((node) => node.id === activeNode) ?? mapNodes[4];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveNode((current) => {
        const index = mapNodes.findIndex((node) => node.id === current);
        return mapNodes[(index + 1) % mapNodes.length].id;
      });
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const mapElement = mapRef.current;

    if (!mapElement) {
      return;
    }

    const updateSize = () => {
      const rect = mapElement.getBoundingClientRect();
      setMapSize({ width: rect.width, height: rect.height });
    };
    const observer = new ResizeObserver(updateSize);

    updateSize();
    observer.observe(mapElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = mapSize.width * pixelRatio;
    canvas.height = mapSize.height * pixelRatio;
    canvas.style.width = `${mapSize.width}px`;
    canvas.style.height = `${mapSize.height}px`;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, mapSize.width, mapSize.height);
    const rc = rough.canvas(canvas);

    const point = (x: number, y: number): [number, number] => [
      (x / 100) * mapSize.width,
      (y / 100) * mapSize.height
    ];

    const drawPath = (points: Array<[number, number]>, accent = false) => {
      points.slice(0, -1).forEach((point, index) => {
        const next = points[index + 1];
        rc.line(point[0], point[1], next[0], next[1], {
          stroke: accent ? "#1a3a1c" : "#cfd8c7",
          strokeWidth: accent ? 2.2 : 1.4,
          roughness: 1.2
        });
      });
    };

    drawPath([point(20, 22), point(50, 29)], false);
    drawPath([point(50, 22), point(50, 29)], false);
    drawPath([point(80, 22), point(50, 29)], false);
    drawPath([point(50, 43), point(50, 50), point(50, 65)], true);
    drawPath([point(50, 65), point(38, 75)], true);
    drawPath([point(50, 65), point(62, 75)], true);

    rc.circle(point(50, 58)[0], point(50, 58)[1], Math.min(mapSize.width, mapSize.height) * 0.28, {
      stroke: "#a3e635",
      strokeWidth: 1.5,
      roughness: 1.8,
      fill: "rgba(163,230,53,0.08)",
      fillStyle: "hachure",
      hachureGap: 8,
      hachureAngle: 45
    });
  }, [activeNode, mapSize]);

  return (
    <div className="grid gap-7 lg:grid-cols-[1fr_300px] lg:items-center">
      <div ref={mapRef} className="relative min-h-[430px] overflow-hidden rounded-[24px] border border-[#e1e5dc] bg-[#fbfbf8] p-5 shadow-sm">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />
        {mapNodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNode(node.id)}
              className={cn(
                "absolute z-10 w-[138px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white/92 p-2.5 text-left shadow-[0_12px_34px_rgba(10,26,12,0.07)] backdrop-blur transition",
                isActive
                  ? "border-[#a3e635] ring-4 ring-[#a3e635]/20"
                  : "border-[#e1e5dc] hover:border-[#cdd5c7]"
              )}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="flex items-center gap-2">
                <span className={cn("grid h-7 w-7 place-items-center rounded-lg", isActive ? "bg-[#a3e635] text-[#0a1a0c]" : "bg-[#eef2e9] text-[#1a3a1c]")}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-bold leading-4 text-[#0f0f0f]">{node.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-[24px] border border-[#e1e5dc] bg-white p-5 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c8979]">Active signal</p>
        <div className="mt-5 flex items-start gap-4">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#a3e635] text-[#0a1a0c]">
            <active.icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[16px] font-bold tracking-[-0.02em] text-[#0f0f0f]">{active.label}</h3>
            <p className="mt-2 text-[13px] leading-6 text-[#687266]">{active.detail}</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[#e1e5dc] bg-[#f7f9f3] p-4">
          <p className="text-[12px] font-semibold leading-6 text-[#1a3a1c]">
            The memorable point: Rovn is not a CRM. It is the moment a scattered conversation becomes a rescued opportunity.
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#071108] shadow-[0_36px_110px_rgba(0,0,0,0.32)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0a1a0c] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-mono text-[#6b8a6d]">
          rovn.ai/dashboard
        </p>
        <div className="w-12" />
      </div>
      <div className={cn("grid", compact ? "min-h-[390px] md:grid-cols-[260px_1fr_310px]" : "min-h-[540px] md:grid-cols-[280px_1fr_340px]")}>
        <div className="hidden border-r border-white/10 p-5 md:block">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#6b8a6d]">Revenue At Risk</p>
          {[
            ["MN", "Meera Nair", "₹72k/mo", "4d delayed"],
            ["RM", "Rahul Mehta", "₹50k", "3d delayed"],
            ["AJ", "Ananya Joshi", "₹4.8k", "2d delayed"]
          ].map((row, index) => (
            <div key={row[1]} className={cn("mb-3 rounded-2xl border p-4", index === 0 ? "border-[#a3e635]/40 bg-[#a3e635]/10" : "border-white/10 bg-white/[0.03]")}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#a3e635] text-[12px] font-bold text-[#0a1a0c]">{row[0]}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-white">{row[1]}</p>
                  <p className="text-[11px] text-[#6b8a6d]">{row[3]}</p>
                </div>
                <p className="text-[12px] font-bold text-white">{row[2]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-end p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#a3e635] text-[13px] font-bold text-[#0a1a0c]">MN</span>
            <div>
              <p className="text-[16px] font-bold text-white">Meera Nair</p>
              <p className="text-[12px] text-[#6b8a6d]">₹72k/mo opportunity · 4 days delayed</p>
            </div>
          </div>
          <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white px-5 py-4 text-[13px] leading-6 text-[#0f0f0f]">
            Can you send weekly menu and bulk pricing for 20 employees?
          </div>
          <div className="ml-auto mt-4 max-w-[86%] rounded-2xl rounded-tr-sm border border-[#a3e635]/25 bg-[#a3e635]/12 px-5 py-4 text-[13px] leading-6 text-white">
            Meera, for 20 employees we can do a weekly veg lunch plan at ₹180 per meal. Delivery before 12:45 PM in Koramangala is workable.
          </div>
        </div>
        <div className="hidden border-l border-white/10 p-5 md:block">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b8a6d]">Lead rescue brief</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-[#9aac9b]">Lead score</p>
              <p className="rounded-full bg-[#a3e635] px-3 py-1 text-[11px] font-bold text-[#0a1a0c]">10/10</p>
            </div>
            <p className="mt-4 text-[13px] leading-6 text-white">Budget, timeline, and scale are all present. This is a revenue rescue moment.</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {["Budget", "Intent", "Timeline", "Delayed"].map((signal) => (
              <div key={signal} className="rounded-2xl border border-[#a3e635]/20 bg-[#a3e635]/10 p-3 text-[11px] font-bold text-[#a3e635]">
                {signal}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b8a6d]">Success state</p>
            <p className="mt-3 flex items-center gap-2 text-[13px] font-bold text-white">
              <CheckCircle2 className="h-4 w-4 text-[#a3e635]" />
              ₹72,000 moved out of risk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 96);
    onScroll();
    window.addEventListener("scroll", onScroll);
    
    // Check if approved sandbox access is active
    if (typeof window !== "undefined") {
      setHasAccess(localStorage.getItem("rovn_approved") === "true");
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleBypassAccess() {
    localStorage.setItem("rovn_approved", "true");
    setHasAccess(true);
    setIsWaitlistModalOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#0f0f0f] antialiased">
      <header className="fixed inset-x-0 top-5 z-50 px-4">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={cn(
            "mx-auto flex max-w-5xl items-center justify-between rounded-full px-3 py-2 backdrop-blur-2xl transition-all duration-300",
            scrolled
              ? "border border-[#dfe5d8] bg-white/88 shadow-[0_16px_46px_rgba(10,26,12,0.12)]"
              : "border border-white/10 bg-[#0a1a0c]/52 shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
          )}
        >
          <Link
            href="/"
            className={cn(
              "rounded-full px-3 py-2 transition",
              scrolled ? "text-[#0a1a0c] hover:bg-[#f1f5ec]" : "text-white hover:bg-white/7"
            )}
          >
            <RovnWordmark imgClassName={scrolled ? "invert" : undefined} />
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-semibold transition",
                  scrolled
                    ? "text-[#5f6d5e] hover:bg-[#f1f5ec] hover:text-[#0a1a0c]"
                    : "text-[#c8d4c9] hover:bg-white/8 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] font-semibold transition",
                scrolled
                  ? "text-[#5f6d5e] hover:bg-[#f1f5ec] hover:text-[#0a1a0c]"
                  : "text-[#c8d4c9] hover:bg-white/8 hover:text-white"
              )}
            >
              Sign In
            </Link>
            {hasAccess ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-4 py-2.5 text-[13px] font-bold text-[#0a1a0c] shadow-[0_0_34px_rgba(163,230,53,0.28)] transition hover:bg-[#bef264]"
              >
                Open Dashboard
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <button
                onClick={() => setIsWaitlistModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-4 py-2.5 text-[13px] font-bold text-[#0a1a0c] shadow-[0_0_34px_rgba(163,230,53,0.28)] transition hover:bg-[#bef264]"
              >
                Join Waitlist
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </motion.nav>
      </header>

      <section className="relative overflow-hidden bg-[#0a1a0c] px-6 pb-20 pt-36 text-white md:pb-28 md:pt-40 border-b border-white/5">
        <div className="relative mx-auto max-w-6xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#a3e635]"
          >
            <Sparkles className="h-3 w-3" />
            Revenue Rescue Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl text-white"
          >
            Never let a lead go cold.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
            className="mx-auto mt-5 max-w-xl text-[14px] leading-6 text-[#869b88] md:text-[15px]"
          >
            Rovn consolidates high-intent conversations from WhatsApp, Instagram, and Email, helping you rescue warm prospects before they slip away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {heroKpis.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/5 bg-white/[0.03] px-3.5 py-1 text-[11px] font-semibold text-[#c8d4c9]"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.34, duration: 0.65, ease: "easeOut" }}
            className="relative mx-auto mt-12 max-w-5xl"
          >
            <DashboardPreview compact />
          </motion.div>

          {/* Built For Trust Signals Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-16 border-t border-white/5 pt-8 text-center"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b8a6d]">Built for</p>
            <div className="mt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[12px] font-semibold text-[#869b88]">
              <span>Photographers</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Agencies</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Consultants</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Salons</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Local Businesses</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#e1e5dc] bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1fr] md:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c8979]">The leak</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0f0f0f] md:text-5xl">
              Unanswered chats are lost revenue.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-[#687266]">
            <p>
              Small businesses do not lose leads because they lack another CRM. They lose them because buying intent lands in separate inboxes and waits too long.
            </p>
            <p>
              Rovn compresses that gap: identify the hottest conversation, explain why it matters, generate the right follow-up, and move the opportunity out of risk.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e1e5dc] bg-[#fafaf8] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c8979]">Visual pathway</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[#0f0f0f]">
              What Rovn Actually Does
            </h2>
          </div>
          
          <div className="relative rounded-3xl border border-[#e1e5dc] bg-white p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center max-w-[160px]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef2e9] text-[#1a3a1c]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[13px] font-bold text-[#0f0f0f]">WhatsApp Lead</p>
                <p className="mt-1.5 text-[11px] text-[#7c8979] leading-relaxed">Warm prospect reaches out with intent</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-[#a8b0a3] rotate-0">
                <ArrowRight className="h-5 w-5 animate-pulse" />
              </div>
              <div className="block md:hidden text-[#a8b0a3] rotate-90">
                <ArrowRight className="h-5 w-5" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center max-w-[160px]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#efffd6] text-[#1a3a1c]">
                  <Target className="h-5 w-5 text-[#2e7d32]" />
                </div>
                <p className="mt-4 text-[13px] font-bold text-[#0f0f0f]">Intent Detected</p>
                <p className="mt-1.5 text-[11px] text-[#7c8979] leading-relaxed">Rovn flags budget, timeline, and value</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-[#a8b0a3]">
                <ArrowRight className="h-5 w-5 animate-pulse" />
              </div>
              <div className="block md:hidden text-[#a8b0a3] rotate-90">
                <ArrowRight className="h-5 w-5" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center max-w-[160px]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fffbeb] text-[#92400e]">
                  <Flame className="h-5 w-5 text-[#c0392b]" />
                </div>
                <p className="mt-4 text-[13px] font-bold text-[#0f0f0f]">Urgency Scored</p>
                <p className="mt-1.5 text-[11px] text-[#7c8979] leading-relaxed">AI flags delay SLA and response risk</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-[#a8b0a3]">
                <ArrowRight className="h-5 w-5 animate-pulse" />
              </div>
              <div className="block md:hidden text-[#a8b0a3] rotate-90">
                <ArrowRight className="h-5 w-5" />
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center max-w-[160px]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#efffd6] text-[#1a3a1c]">
                  <Sparkles className="h-5 w-5 text-[#2e7d32]" />
                </div>
                <p className="mt-4 text-[13px] font-bold text-[#0f0f0f]">Draft Generated</p>
                <p className="mt-1.5 text-[11px] text-[#7c8979] leading-relaxed">Custom context-rich replies composed</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-[#a8b0a3]">
                <ArrowRight className="h-5 w-5 animate-pulse" />
              </div>
              <div className="block md:hidden text-[#a8b0a3] rotate-90">
                <ArrowRight className="h-5 w-5" />
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center max-w-[160px]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#a3e635] text-[#0a1a0c]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[13px] font-bold text-[#0f0f0f]">Lead Rescued</p>
                <p className="mt-1.5 text-[11px] text-[#7c8979] leading-relaxed">Reply sent and opportunity saved</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="map" className="border-b border-[#e1e5dc] bg-[#fafaf8] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c8979]">Signature system</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[#0f0f0f] md:text-5xl">
              Where Revenue Gets Lost
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#687266]">
              A light, interactive map of the path from scattered customer intent to a rescued lead.
            </p>
          </div>
          <RoughRevenueMap />
        </div>
      </section>

      <section id="product" className="border-b border-[#e1e5dc] bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c8979]">Rescue mechanics</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[#0f0f0f] md:text-5xl">
                Engineered for speed & accuracy.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-6 text-[#687266]">
              Every inbound signal is parsed instantly to prevent high-value opportunities from slipping through the cracks.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Mechanic 1: Revenue Triage */}
            <div className="rounded-[24px] border border-[#e1e5dc] bg-[#fafaf8] p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a1a0c] text-[12px] font-bold text-white">01</span>
                <h3 className="mt-6 text-[18px] font-bold tracking-tight text-[#0f0f0f]">Automatic Revenue Triage</h3>
                <p className="mt-3 text-[13px] leading-6 text-[#687266]">
                  Rovn instantly pulls scattered chats and highlights estimated value and SLA breach levels.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-[#ffd5d2] bg-[#fff1f0] p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#c0392b]">Meera Nair</p>
                  <p className="text-[13px] font-bold text-[#0f0f0f] mt-1">₹72,000 / month</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#c0392b]/10 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#c0392b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c0392b] animate-ping" />
                  SLA: 4d delayed
                </div>
              </div>
            </div>

            {/* Mechanic 2: AI Intelligence */}
            <div className="rounded-[24px] border border-[#e1e5dc] bg-[#fafaf8] p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a1a0c] text-[12px] font-bold text-white">02</span>
                <h3 className="mt-6 text-[18px] font-bold tracking-tight text-[#0f0f0f]">Deep Intent Diagnostics</h3>
                <p className="mt-3 text-[13px] leading-6 text-[#687266]">
                  Our AI scans message history to map out budget, buying intent, timeline, and customer urgency.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-[#e1e5dc] bg-white p-4 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold border-b border-[#f0f0ec] pb-1.5">
                  <span className="text-[#6b6b6b]">LEAD SCORE</span>
                  <span className="text-[#a3e635] bg-[#0a1a0c] px-2 py-0.5 rounded-md">10 / 10</span>
                </div>
                <div className="flex flex-col gap-1.5 text-[11px] text-[#2c3e2e] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
                    <span>Budget mentioned</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
                    <span>High buying intent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mechanic 3: Contextual Drafts */}
            <div className="rounded-[24px] border border-[#e1e5dc] bg-[#fafaf8] p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a1a0c] text-[12px] font-bold text-white">03</span>
                <h3 className="mt-6 text-[18px] font-bold tracking-tight text-[#0f0f0f]">1-Click Contextual Drafts</h3>
                <p className="mt-3 text-[13px] leading-6 text-[#687266]">
                  No copy-pasting or manual typing. Generate context-rich drafts tailored specifically to the user's intent.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-4 shadow-sm">
                <p className="text-[10px] font-bold text-[#166534] uppercase tracking-wider">SUGGESTED AI DRAFT</p>
                <p className="text-[12px] text-[#1a3a1c] leading-5 mt-1 font-semibold italic">
                  "Meera, for 20 employees we can do a weekly veg lunch plan..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e1e5dc] bg-[#fafaf8] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c8979]">How it works</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[#0f0f0f] md:text-5xl">
              Four moves. One outcome.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map(([number, title, detail], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="rounded-3xl border border-[#e1e5dc] bg-white p-6 shadow-sm"
              >
                <p className="text-[32px] font-light tracking-[-0.05em] text-[#a8b0a3]">{number}</p>
                <h3 className="mt-8 text-[17px] font-bold text-[#0f0f0f]">{title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-[#687266]">{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1a0c] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#a3e635]">Demo-ready</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] md:text-5xl">
            Stop losing leads to delayed replies.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-[#9aac9b]">
            Open the dashboard and show the exact moment a high-value conversation moves out of risk.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-6 py-3 text-[14px] font-bold text-[#0a1a0c] shadow-[0_0_36px_rgba(163,230,53,0.24)] transition hover:bg-[#bef264]"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#product"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-white/[0.08]"
            >
              View product
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-[13px] text-[#7c8979] md:flex-row">
          <RovnWordmark className="text-[#0f0f0f]" imgClassName="invert" />
          <div className="flex items-center gap-6">
            <Link href="#product" className="transition hover:text-[#0f0f0f]">Product</Link>
            <Link href="#map" className="transition hover:text-[#0f0f0f]">Demo</Link>
            <Link href="/dashboard" className="transition hover:text-[#0f0f0f]">Dashboard</Link>
          </div>
          <p>
            Built by{" "}
            <a
              href="https://pranavx.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1a3a1c] hover:text-[#a3e635] transition"
            >
              Pranav Gawai
            </a>{" "}
            · © 2026 Rovn
          </p>
        </div>
      </footer>

      {/* Premium Dark Waitlist Modal Overlay */}
      {isWaitlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-[28px] border border-[#1a3a1c] bg-[#0a1a0c] p-8 text-white shadow-[0_30px_90px_rgba(10,26,12,0.4)] animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsWaitlistModalOpen(false);
                setJoinedWaitlist(false);
                setWaitlistEmail("");
              }}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-[#8a9e8b] transition hover:border-[#a3e635]/30 hover:bg-[#132a15] hover:text-[#a3e635]"
            >
              ✕
            </button>

            {joinedWaitlist ? (
              <div className="text-center py-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#a3e635] text-[#0a1a0c] mx-auto text-[20px] font-bold">
                  ✓
                </span>
                <h3 className="mt-5 text-[20px] font-bold tracking-tight text-white">Joined the Private Beta</h3>
                <p className="mt-3 text-[13px] text-[#8a9e8b] leading-relaxed">
                  Excellent. You are **#2,491** in line. We will notify you at <span className="text-[#a3e635] font-semibold">{waitlistEmail}</span> once your workspace is approved.
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-[11px] uppercase tracking-wider text-[#6b8a6d] font-bold">Reviewing for Hackathon?</p>
                  <button
                    onClick={handleBypassAccess}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/15 py-2.5 text-[12px] font-bold text-white transition hover:bg-[#a3e635] hover:text-[#0a1a0c] hover:border-[#a3e635]"
                  >
                    🔓 Bypass & Grant Sandbox Access
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a9e8b] font-bold">Private Beta</p>
                <h3 className="mt-3 text-[22px] font-bold tracking-tight text-white leading-tight">Join the Rovn Waitlist</h3>
                <p className="mt-2.5 text-[13px] text-[#8a9e8b] leading-relaxed">
                  Rovn is currently in private preview. Register below to secure early access.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (waitlistEmail.trim()) {
                      setJoinedWaitlist(true);
                    }
                  }}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6b8a6d] font-bold mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[13px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6b8a6d] font-bold mb-1.5">Business Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meera's Tiffins"
                      className="h-11 w-full rounded-xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[13px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6b8a6d] font-bold mb-1.5">Primary Channel</label>
                    <select className="h-11 w-full rounded-xl border border-[#1a3a1c] bg-[#0f2410] px-3 text-[13px] outline-none text-[#8a9e8b] focus:border-[#a3e635]/50 transition">
                      <option value="whatsapp">WhatsApp Business API</option>
                      <option value="instagram">Instagram DMs</option>
                      <option value="email">Gmail / GSuite</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="block w-full rounded-xl bg-[#a3e635] py-2.5 text-center text-[13px] font-bold text-[#0a1a0c] shadow-[0_0_24px_rgba(163,230,53,0.18)] transition hover:bg-[#bef264]"
                  >
                    Request Sandbox Approval
                  </button>

                  <div className="border-t border-white/5 pt-4 text-center">
                    <button
                      type="button"
                      onClick={handleBypassAccess}
                      className="text-[11px] font-semibold text-[#8a9e8b] hover:text-[#a3e635] transition"
                    >
                      🔓 Hackathon Reviewer? Bypass Gate
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
