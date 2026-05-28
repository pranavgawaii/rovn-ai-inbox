"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RovnWordmark } from "@/components/RovnLogo";
import {
  Inbox,
  Flame,
  Mail,
  Sparkles,
  ArrowRight,
  Instagram,
  Zap,
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  MessageSquare,
  Shield,
  Clock,
  Play,
  Brain,
  Target,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDemoLead, setActiveDemoLead] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScrollSpy = () => {
      const sections = ["hero", "problems", "features", "demo", "workflow", "faq"];
      const pos = window.scrollY + 180;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScrollSpy);
    return () => window.removeEventListener("scroll", onScrollSpy);
  }, []);

  const demoLeads = [
    {
      name: "Alex Rivera",
      avatar: "AR",
      platform: "WhatsApp",
      platformColor: "bg-[#4caf50]",
      message: "Hey! Can you share pricing and availability for next week? Looking to buy 50 units.",
      intent: "hot",
      aiReply: "Hi Alex! For orders of 50+ units, we offer a 10% volume discount. We have full availability next week. Should I send over the invoice?",
      score: "8/10"
    },
    {
      name: "Sofia Chen",
      avatar: "SC",
      platform: "Instagram",
      platformColor: "bg-[#ffb86b]",
      message: "Loved your design! Do you ship custom prints to California?",
      intent: "hot",
      aiReply: "Hi Sofia! Absolutely, we ship to California with expedited delivery. Custom designs take 2-3 business days. Would you like to upload your art?",
      score: "9/10"
    },
    {
      name: "Marcus Brodie",
      avatar: "MB",
      platform: "Email",
      platformColor: "bg-sky-400",
      message: "Hi, I ran into an error trying to process my payment. Can someone assist?",
      intent: "pending",
      aiReply: "Hi Marcus, I can look up your session right away. Could you share the email address registered on your account?",
      score: "5/10"
    }
  ];

  const faqs = [
    {
      q: "Which communication channels does Rovn support?",
      a: "Rovn connects directly to WhatsApp Business, Instagram Direct Messages, and Email (IMAP/Gmail). All incoming customer inquiries are aggregated in real time into one dashboard."
    },
    {
      q: "How does the AI intent scoring engine work?",
      a: "Every message is parsed by our localized semantic scoring engine. It analyzes buying signals, customer urgency, and historical context to rank inquiries as 'Hot', 'Pending', or 'Cold' so you can focus on high-value leads first."
    },
    {
      q: "Are the suggested draft replies sent automatically?",
      a: "By default, Rovn works in co-pilot mode. The AI generates contextual suggestions, which you can review, edit, and approve with a single click. Autopilot mode can also be toggled for repetitive FAQs."
    },
    {
      q: "How secure is the data ingested by Rovn?",
      a: "We employ enterprise-grade end-to-end encryption. Your messages are stored securely and we do not use your customer data to train public foundation models."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#0f0f0f] scroll-smooth antialiased">

      {/* ─── NAVBAR (matches Sidebar #0a1a0c) ──────────────────────────────── */}
      <motion.header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#0a1a0c] border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/60"
            : "bg-[#0a1a0c] border-b border-transparent py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="group">
            <RovnWordmark className="text-white transition group-hover:opacity-80" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { id: "hero", label: "Home" },
              { id: "problems", label: "Solutions" },
              { id: "features", label: "Features" },
              { id: "demo", label: "Demo" }
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => handleScroll(n.id)}
                className={`relative px-4 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeSection === n.id
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {n.label}
                {activeSection === n.id && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-[#a3e635]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/sign-in"
              className="text-[13px] font-medium text-white/60 hover:text-white transition duration-200"
            >
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 rounded-xl bg-[#a3e635] px-5 py-2.5 text-[13px] font-bold text-[#0a1a0c] transition hover:bg-[#bef264] shadow-lg shadow-[#a3e635]/20"
              >
                Start Free <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl p-2 text-[#8a9e8b] hover:text-white border border-white/10 bg-white/5 transition"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute left-0 right-0 bg-[#0a1a0c]/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col gap-5">
                {[
                  { id: "hero", label: "Home" },
                  { id: "problems", label: "Solutions" },
                  { id: "features", label: "Features" },
                  { id: "demo", label: "Demo" }
                ].map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleScroll(n.id)}
                    className={`text-left text-lg font-medium transition ${
                      activeSection === n.id ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
                <div className="border-t border-white/10 pt-5 flex flex-col gap-3">
                  <Link href="/sign-in" className="text-[#8a9e8b] font-medium">Sign in</Link>
                  <Link href="/sign-up" className="rounded-xl bg-[#a3e635] text-[#0a1a0c] text-center py-3 text-sm font-bold">
                    Start Free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── HERO (dark #0a1a0c, matches Sidebar) ──────────────────────────── */}
      <section id="hero" className="relative bg-[#0a1a0c] overflow-hidden px-6 pt-28 pb-0 md:pt-36">

        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(163,230,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />

        <motion.div
          className="relative mx-auto max-w-5xl text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-[#a3e635]/20 bg-[#a3e635]/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#a3e635]">
            <Sparkles className="h-3 w-3" /> AI-Powered Inbox Copilot
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
            One inbox for every<br />
            <span className="text-[#a3e635]">hot lead.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={item} className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#8a9e8b] md:text-lg">
            Rovn consolidates WhatsApp, Instagram, and Email into a single co-pilot workspace — scoring intent, surfacing high-value buyers, and generating instant reply drafts.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-2xl bg-[#a3e635] px-7 py-3.5 text-[14px] font-bold text-[#0a1a0c] shadow-xl shadow-[#a3e635]/20 hover:bg-[#bef264] transition group"
              >
                Open Dashboard <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <button
                onClick={() => handleScroll("demo")}
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[14px] font-medium text-white hover:bg-white/[0.08] transition"
              >
                <Play className="h-4 w-4" /> Try Simulator
              </button>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item} className="mt-14 flex flex-wrap justify-center gap-10 border-t border-white/[0.06] pt-10">
            {[
              { value: "3×", label: "Faster response time" },
              { value: "94%", label: "Lead capture rate" },
              { value: "∞", label: "Channels unified" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-[12px] text-[#6b8a6d] font-medium tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            variants={item}
            className="relative mx-auto mt-20 max-w-5xl"
          >
            {/* Mock window */}
            <div className="rounded-t-[24px] border border-white/[0.08] border-b-0 bg-[#0d1f10] overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0a1a0c] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-[11px] font-mono text-[#6b8a6d] tracking-wide">
                  rovn.ai/workspace
                </div>
                <div className="w-16" />
              </div>

              {/* 3-panel preview */}
              <div className="grid h-[340px] md:grid-cols-[220px_260px_1fr]">
                {/* Sidebar panel */}
                <div className="hidden border-r border-white/[0.06] bg-[#0a1a0c] p-5 md:flex md:flex-col">
                  <div className="mb-7">
                    <RovnWordmark className="text-white opacity-80" />
                  </div>
                  <p className="mb-3 px-2 text-[9px] font-bold uppercase tracking-widest text-[#6b8a6d]">Inbox</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 rounded-xl border border-[#a3e635]/15 bg-[rgba(163,230,53,0.12)] px-3 py-2.5 text-[12px] font-semibold text-[#a3e635]">
                      <Inbox className="h-4 w-4" /> All inbox
                      <span className="ml-auto rounded-full bg-[#a3e635] px-2 py-0.5 text-[10px] font-bold text-[#0a1a0c]">8</span>
                    </div>
                    {[
                      { icon: Zap, label: "WhatsApp", count: 3 },
                      { icon: Instagram, label: "Instagram", count: 2 },
                      { icon: Mail, label: "Email", count: 3 }
                    ].map((nav) => (
                      <div key={nav.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-medium text-[#8a9e8b]">
                        <nav.icon className="h-4 w-4" /> {nav.label}
                        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#8a9e8b]">{nav.count}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-3 rounded-xl bg-[#132a15] p-3 border border-white/5">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#a3e635] text-[11px] font-bold text-[#0a1a0c]">P</div>
                    <div>
                      <p className="text-[12px] font-semibold text-white">Pranav</p>
                      <p className="text-[10px] text-[#6b8a6d]">pranav@rovn.in</p>
                    </div>
                  </div>
                </div>

                {/* Conversation list */}
                <div className="hidden border-r border-white/[0.06] bg-[#0d1f10] p-4 md:block overflow-hidden">
                  <p className="mb-3 px-1 text-[9px] font-bold uppercase tracking-widest text-[#6b8a6d]">Leads Queue</p>
                  <div className="space-y-2">
                    {demoLeads.map((lead, idx) => (
                      <div
                        key={lead.name}
                        className={`rounded-xl p-3.5 border ${
                          idx === 0
                            ? "border-white/10 bg-[#132a15]"
                            : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] font-semibold text-white">{lead.name}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase ${
                            lead.intent === "hot"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            {lead.intent}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] text-[#6b8a6d] line-clamp-2 leading-relaxed">{lead.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detail panel */}
                <div className="flex flex-col justify-end bg-[#fafaf8] p-6">
                  <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b]">
                    <div className="h-2 w-2 rounded-full bg-[#4caf50]" /> WhatsApp · Alex Rivera
                  </div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#f4f4f1] px-4 py-3 text-[13px] leading-relaxed text-[#0f0f0f] shadow-sm">
                    "Can you share pricing for 50 units? Need availability for next week."
                  </div>
                  <div className="ml-auto mt-4 max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0a1a0c] px-4 py-3 text-[13px] leading-relaxed text-white shadow-md">
                    <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-[#a3e635] uppercase tracking-wider">
                      <Sparkles className="h-3 w-3" /> Draft · AI Generated
                    </div>
                    "Hi Alex! For 50+ units we offer 10% volume discount. Full stock available next week. Should I send the invoice?"
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PROBLEMS (light #fafaf8) ───────────────────────────────────────── */}
      <section id="problems" className="relative z-10 mx-auto max-w-6xl px-6 py-24 border-t border-[#e8e8e4]">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9b9b9b]">The Pipeline Bleed</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#0f0f0f] sm:text-5xl">
              Unanswered chats are lost revenue.
            </h2>
            <p className="mt-6 text-[15px] text-[#6b6b6b] leading-relaxed">
              Customers expect responses within minutes. Juggling WhatsApp tabs, emails, and social DMs causes delays, forgotten leads, and painful drop-offs.
            </p>
            <div className="mt-10 space-y-6">
              {[
                { title: "Fractured Channels", text: "Tabs multiplying. Missing inquiries on one platform while sorting another." },
                { title: "Cold Leads", text: "A user interested at 2 PM moves to a competitor by 2:30 PM if left unanswered." },
                { title: "Manual Response Fatigue", text: "Typing the exact same copy-paste answers for pricing and inventory queries." }
              ].map((p, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#f0f0ec] text-[#0f0f0f]">
                    <span className="text-[11px] font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#0f0f0f]">{p.title}</p>
                    <p className="mt-1 text-[13px] text-[#6b6b6b] leading-relaxed">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-[28px] border border-[#e8e8e4] bg-white p-8 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <h3 className="text-xl font-bold text-[#0f0f0f] mb-8">Traditional vs. Rovn</h3>
            <div className="relative space-y-6">
              <div className="absolute left-[24px] top-4 bottom-4 w-px bg-[#e8e8e4]" />
              {[
                { step: "1", title: "Incoming Customer Chat", detail: "Spanning WhatsApp, IG, or Email streams.", hl: false },
                { step: "2", title: "Instant Intent Assessment", detail: "Our model flags intent score. Warm leads prioritized.", hl: true },
                { step: "3", title: "AI Draft Ready", detail: "Context-aware reply automatically drafted.", hl: false },
                { step: "4", title: "1-Click Send", detail: "Verify, press send. Pipeline stays warm.", hl: false }
              ].map((s) => (
                <div key={s.step} className="flex gap-5 items-start relative z-10">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold border-2 flex-shrink-0 ${
                    s.hl
                      ? "bg-[#0a1a0c] text-white border-[#0a1a0c]"
                      : "bg-[#f4f4f1] text-[#6b6b6b] border-[#e8e8e4]"
                  }`}>{s.step}</div>
                  <div className="pt-1">
                    <p className={`text-[14px] font-semibold ${s.hl ? "text-[#0a1a0c]" : "text-[#0f0f0f]"}`}>{s.title}</p>
                    <p className="mt-1 text-[12px] text-[#6b6b6b]">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES (light) ───────────────────────────────────────────────── */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-24 border-t border-[#e8e8e4]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9b9b9b]">Core Features</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#0f0f0f] sm:text-5xl">Everything you need to convert chats.</h2>
          <p className="mt-4 text-base text-[#6b6b6b] max-w-2xl mx-auto">No complex CRM onboarding. Connect channels and let the AI do the sorting.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Unified Omnichannel Inbox",
              desc: "Consolidate WhatsApp, Instagram, and Email into one clean screen. Context never breaks.",
              icon: Inbox,
              badge: "Aggregated Streams",
              accent: "text-[#0a1a0c]",
              bg: "bg-[#f4f4f1]"
            },
            {
              title: "AI Real-time Intent Engine",
              desc: "Scores every inquiry instantly. Flags users ready to buy under 'Hot Intent' so you reach them first.",
              icon: Brain,
              badge: "Semantic Ranker",
              accent: "text-[#0a1a0c]",
              bg: "bg-[#f4f4f1]"
            },
            {
              title: "1-Click AI Suggested Drafts",
              desc: "Examine the pre-generated AI response draft, refine if needed, and send with one click.",
              icon: Sparkles,
              badge: "Co-Pilot Speed",
              accent: "text-[#0a1a0c]",
              bg: "bg-[#f4f4f1]"
            }
          ].map((feat, idx) => (
            <motion.div
              key={feat.title}
              className="group flex flex-col rounded-[28px] border border-[#e8e8e4] bg-white p-8 shadow-sm transition duration-300 hover:border-[#0a1a0c]/20 hover:shadow-md"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e8e8e4] ${feat.bg} ${feat.accent} transition group-hover:scale-105 duration-300`}>
                <feat.icon className="h-5 w-5" />
              </div>
              <span className="mt-6 inline-block rounded-full border border-[#e8e8e4] bg-[#fafaf8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9b9b9b]">
                {feat.badge}
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-[#0f0f0f]">{feat.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#6b6b6b] flex-1">{feat.desc}</p>
              <div className="mt-8 border-t border-[#f0f0ec] pt-5 flex items-center gap-1.5 text-[12px] font-semibold text-[#0f0f0f] group-hover:gap-2.5 transition-all">
                View Integration Docs <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── INTERACTIVE DEMO (light) ───────────────────────────────────────── */}
      <section id="demo" className="relative z-10 mx-auto max-w-6xl px-6 py-24 border-t border-[#e8e8e4]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9b9b9b]">Live Simulator</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#0f0f0f] sm:text-5xl">Experience Rovn</h2>
          <p className="mt-4 text-base text-[#6b6b6b] max-w-2xl mx-auto">Click through simulated leads to see the AI reply assistant in action.</p>
        </motion.div>

        <motion.div
          className="mx-auto grid h-[600px] max-w-5xl overflow-hidden rounded-[32px] border border-[#e8e8e4] bg-white shadow-sm md:grid-cols-[220px_260px_1fr]"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {/* Sidebar */}
          <div className="hidden flex-col bg-[#0a1a0c] p-5 md:flex">
            <div className="mb-7 px-1">
              <RovnWordmark className="text-white" />
            </div>
            <p className="mb-3 px-2 text-[9px] font-bold uppercase tracking-widest text-[#6b8a6d]">Workspace Inbox</p>
            <div className="space-y-1">
              <div className="flex items-center gap-3 rounded-xl border border-[#a3e635]/15 bg-[rgba(163,230,53,0.12)] px-3 py-2.5 text-[13px] font-semibold text-[#a3e635]">
                <Inbox className="h-4 w-4" /> All inbox
              </div>
              {[
                { icon: Zap, label: "WhatsApp" },
                { icon: Instagram, label: "Instagram" },
                { icon: Mail, label: "Email" }
              ].map((n) => (
                <div key={n.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#8a9e8b]">
                  <n.icon className="h-4 w-4" /> {n.label}
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-3 rounded-xl bg-[#132a15] border border-white/5 p-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#a3e635] text-[11px] font-bold text-[#0a1a0c]">P</div>
              <div>
                <p className="text-[12px] font-semibold text-white">Pranav</p>
                <p className="text-[10px] text-[#6b8a6d]">pranav@rovn.in</p>
              </div>
            </div>
          </div>

          {/* Lead list */}
          <div className="border-r border-[#f0f0ec] bg-white p-5 overflow-y-auto">
            <p className="mb-4 px-1 text-[9px] font-bold uppercase tracking-widest text-[#9b9b9b]">Leads Queue</p>
            <div className="space-y-2">
              {demoLeads.map((lead, idx) => (
                <button
                  key={lead.name}
                  onClick={() => setActiveDemoLead(idx)}
                  className={`w-full rounded-2xl p-4 text-left border transition-all ${
                    activeDemoLead === idx
                      ? "border-[#e8e8e4] bg-[#fafaf8] shadow-sm"
                      : "border-transparent hover:bg-[#fafaf8]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-[#e8f5e9] text-[11px] font-bold text-[#1a3a1c]">{lead.avatar}</div>
                      <p className="text-[13px] font-semibold text-[#0f0f0f]">{lead.name}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase border ${
                      lead.intent === "hot"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-amber-50 text-amber-600 border-amber-200"
                    }`}>{lead.intent}</span>
                  </div>
                  <p className="mt-2 ml-[42px] text-[11px] text-[#6b6b6b] line-clamp-2 leading-relaxed">{lead.message}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="flex flex-col bg-[#fafaf8] p-7 justify-between h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemoLead}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex items-center justify-between border-b border-[#f0f0ec] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f5e9] text-[12px] font-bold text-[#1a3a1c]">
                      {demoLeads[activeDemoLead].avatar}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-[#0f0f0f]">{demoLeads[activeDemoLead].name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${demoLeads[activeDemoLead].platformColor}`} />
                        <p className="text-[11px] text-[#9b9b9b] uppercase tracking-wider font-semibold">{demoLeads[activeDemoLead].platform}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl border border-[#ffd5d2] bg-[#fff1f0] px-3 py-1.5 text-[11px] font-semibold text-[#c0392b] flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5" /> High Intent
                    </div>
                    <div className="rounded-xl border border-[#e8e8e4] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6b6b6b] flex items-center gap-1.5">
                      <Brain className="h-3.5 w-3.5 text-[#2e7d32]" /> {demoLeads[activeDemoLead].score}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-5 flex-1">
                  <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-[#f4f4f1] px-5 py-3.5 text-[13px] leading-relaxed text-[#0f0f0f] shadow-sm">
                    {demoLeads[activeDemoLead].message}
                  </div>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl rounded-tr-sm border border-[#e8e8e4] bg-white px-5 py-4 shadow-sm"
                    initial={{ scale: 0.97, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, delay: 0.08 }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a3e635]" />
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b] mb-2.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#0a1a0c]" /> Co-pilot Draft
                    </div>
                    <p className="text-[13px] leading-relaxed font-medium text-[#0f0f0f]">
                      {demoLeads[activeDemoLead].aiReply}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-[#f0f0ec] pt-5 mt-6 flex justify-end gap-3">
              <button className="rounded-xl border border-[#e8e8e4] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#6b6b6b] hover:text-[#0f0f0f] transition">
                Dismiss
              </button>
              <motion.button
                onClick={() => alert("Simulated: Message sent!")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 rounded-xl bg-[#0a1a0c] text-white px-5 py-2.5 text-[13px] font-semibold hover:bg-[#1a3a1c] transition shadow-md"
              >
                Send Draft <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── CORE LOOP (light) ──────────────────────────────────────────────── */}
      <section id="workflow" className="relative z-10 mx-auto max-w-6xl px-6 py-24 border-t border-[#e8e8e4]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9b9b9b]">How It Works</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#0f0f0f] sm:text-5xl">The Core Loop</h2>
          <p className="mt-4 text-base text-[#6b6b6b] max-w-2xl mx-auto">From query ingestion to closing the loop — the full lifecycle of a Rovn-processed lead.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            { step: "01", title: "Ingestion", desc: "Connect your WhatsApp, Instagram DMs, and email in under 60 seconds.", icon: Zap },
            { step: "02", title: "Semantic Analysis", desc: "Intent engine evaluates buying urgency, keyword density, and customer history.", icon: Shield },
            { step: "03", title: "Draft Assembly", desc: "Context-aware reply drafted using conversation history and business profile.", icon: MessageSquare },
            { step: "04", title: "1-Click Close", desc: "Review, refine, and send instantly without jumping between apps.", icon: CheckCircle2 }
          ].map((s, idx) => (
            <motion.div
              key={s.step}
              className="rounded-[28px] border border-[#e8e8e4] bg-white p-8 shadow-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[32px] font-light text-[#e8e8e4]">{s.step}</span>
                <s.icon className="h-5 w-5 text-[#0a1a0c]" />
              </div>
              <h3 className="mt-8 text-lg font-bold text-[#0f0f0f]">{s.title}</h3>
              <p className="mt-3 text-[13px] text-[#6b6b6b] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FAQ (light) ────────────────────────────────────────────────────── */}
      <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 py-24 border-t border-[#e8e8e4]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9b9b9b]">F.A.Q</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#0f0f0f] sm:text-5xl">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="overflow-hidden rounded-2xl border border-[#e8e8e4] bg-white shadow-sm">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-7 py-6 text-left text-[15px] font-semibold text-[#0f0f0f] hover:bg-[#fafaf8] transition"
                >
                  {faq.q}
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 text-[#9b9b9b] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0f0f0f]" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="border-t border-[#f0f0ec] bg-[#fafaf8] px-7 pb-6 pt-5 text-[14px] text-[#6b6b6b] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA (dark, matches sidebar #0a1a0c) ───────────────────────────── */}
      <section className="bg-[#0a1a0c] py-32 border-t border-[#e8e8e4]">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            className="rounded-[40px] border border-white/[0.07] bg-[#132a15] p-16 text-center shadow-2xl shadow-black/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[40px]"
              style={{
                backgroundImage: `linear-gradient(rgba(163,230,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.03) 1px, transparent 1px)`,
                backgroundSize: "48px 48px"
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#a3e635]/20 bg-[#a3e635]/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#a3e635] mb-8">
                <Sparkles className="h-3 w-3" /> Start for Free
              </div>
              <h2 className="text-4xl font-bold text-white sm:text-5xl tracking-tight">
                Stop losing leads to delay.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base text-[#8a9e8b] leading-relaxed">
                Consolidate your inbox streams, prioritize intent in real-time, and draft responses using our modern AI workspace.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/sign-up"
                    className="rounded-2xl bg-[#a3e635] text-[#0a1a0c] px-8 py-3.5 text-sm font-bold hover:bg-[#bef264] transition shadow-xl shadow-[#a3e635]/20"
                  >
                    Get Started for Free
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/dashboard"
                    className="rounded-2xl border border-white/20 text-white bg-transparent px-8 py-3.5 text-sm font-medium hover:bg-white/[0.06] transition"
                  >
                    Enter App
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER (light) ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#e8e8e4] bg-[#fafaf8] py-14">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-[13px] text-[#9b9b9b]">
          <RovnWordmark className="text-[#0f0f0f]" />
          <div className="flex gap-8">
            {["hero", "features", "demo"].map((id) => (
              <button key={id} onClick={() => handleScroll(id)} className="hover:text-[#0f0f0f] transition capitalize">
                {id === "hero" ? "Home" : id}
              </button>
            ))}
            <Link href="mailto:support@rovn.in" className="hover:text-[#0f0f0f] transition">Support</Link>
          </div>
          <p>© 2026 Rovn. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
