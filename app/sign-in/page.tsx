import Link from "next/link";
import { RovnWordmark } from "@/components/ui/RovnLogo";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0a1a0c]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/">
          <RovnWordmark className="text-[#0a1a0c]" imgClassName="invert" />
        </Link>
        <Link href="/sign-up" className="text-[13px] text-[#5a6e5c] hover:text-[#0a1a0c] font-semibold transition">
          Create account
        </Link>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-md">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#5a6e5c] font-bold">Welcome back</p>
          <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-[#0a1a0c] sm:text-4xl md:text-5xl">
            Return to calm clarity.
          </h1>
          <p className="mt-5 text-[14px] leading-6 text-[#5a6e5c]">
            Open your AI inbox and continue with the conversations most likely to convert.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[420px] rounded-[28px] border border-[#1a3a1c]/80 bg-[#0a1a0c] p-8 text-white shadow-[0_30px_90px_rgba(10,26,12,0.22)]">
          <h2 className="text-xl font-bold tracking-[-0.03em]">Sign in</h2>
          <form className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="you@company.com"
              className="h-11 w-full rounded-xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[13px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              className="h-11 w-full rounded-xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[13px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50 transition-colors"
            />
            <Link
              href="/dashboard"
              className="block w-full rounded-xl bg-[#a3e635] py-2.5 text-center text-[13px] font-bold text-[#0a1a0c] shadow-[0_0_24px_rgba(163,230,53,0.18)] transition hover:bg-[#bef264]"
            >
              Continue
            </Link>
          </form>
          <p className="mt-6 text-center text-[11px] text-[#8a9e8b] font-medium">
            Demo Sandbox mode · No credentials required
          </p>
        </div>
      </section>
    </main>
  );
}
