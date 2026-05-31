"use client";

import { useState } from "react";
import Link from "next/link";
import { RovnWordmark } from "@/components/ui/RovnLogo";
import { cn } from "@/lib/utils";

function ToggleLine({ label }: { label: string }) {
  const [active, setActive] = useState(true);
  return (
    <button
      type="button"
      onClick={() => setActive(!active)}
      className="flex w-full items-center justify-between rounded-xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 py-3 text-left transition hover:bg-[#eff2ea] focus:outline-none"
    >
      <span className="text-[13px] text-[#0a1a0c] font-semibold">{label}</span>
      <span className={cn("relative h-5 w-9 rounded-full transition-colors duration-200", active ? "bg-[#1a3a1c]" : "bg-neutral-200 border border-neutral-300")}>
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-200 shadow-sm", active ? "left-[18px]" : "left-0.5")} />
      </span>
    </button>
  );
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0a1a0c]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/">
          <RovnWordmark className="text-[#0a1a0c]" imgClassName="invert" />
        </Link>
        <Link href="/sign-in" className="text-[13px] text-[#5a6e5c] hover:text-[#0a1a0c] font-semibold transition">
          Sign in
        </Link>
      </header>
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1fr_0.86fr]">
        <div className="rounded-[32px] border border-[#1a3a1c] bg-[#0a1a0c] p-8 text-white shadow-[0_24px_70px_rgba(10,26,12,0.18)] flex flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a9e8b] font-bold">Create workspace</p>
            <h1 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
              Set up your conversation OS.
            </h1>
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {["Connect channels", "Prioritize leads", "Draft follow-ups"].map((item, index) => (
              <div key={item} className="rounded-2xl border border-[#1a3a1c]/40 bg-[#0f2410]/50 p-5 backdrop-blur transition-all hover:border-[#a3e635]/30">
                <p className="font-mono text-[11px] font-bold text-[#a3e635]">0{index + 1}</p>
                <p className="mt-8 text-[13px] font-semibold text-[#c8d4c9]">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-[#e4e8e4] bg-white p-8 text-[#0a1a0c] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <h2 className="text-xl font-bold tracking-[-0.03em] text-[#0a1a0c]">Start free</h2>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="h-11 w-full rounded-xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 text-[13px] outline-none text-[#0a1a0c] placeholder:text-[#7d937e] focus:border-[#1a3a1c] transition-colors"
            />
            <input
              type="email"
              placeholder="Work email"
              className="h-11 w-full rounded-xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 text-[13px] outline-none text-[#0a1a0c] placeholder:text-[#7d937e] focus:border-[#1a3a1c] transition-colors"
            />
            <input
              type="text"
              placeholder="Business type"
              className="h-11 w-full rounded-xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 text-[13px] outline-none text-[#0a1a0c] placeholder:text-[#7d937e] focus:border-[#1a3a1c] transition-colors"
            />
            <ToggleLine label="AI lead scoring" />
            <ToggleLine label="Smart follow-ups" />
            <Link
              href="/dashboard"
              className="block rounded-xl bg-[#a3e635] py-2.5 text-center text-[13px] font-bold text-[#0a1a0c] shadow-[0_0_24px_rgba(163,230,53,0.18)] transition hover:bg-[#bef264]"
            >
              Create workspace
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
