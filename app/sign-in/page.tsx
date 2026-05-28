import Link from "next/link";
import { RovnWordmark } from "@/components/RovnLogo";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0a1a0c]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/"><RovnWordmark className="text-[#0a1a0c] dark:text-[#0a1a0c]" imgClassName="invert" /></Link>
        <Link href="/sign-up" className="text-[13px] text-[#5a6e5c] hover:text-[#0a1a0c] font-medium">Create account</Link>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#5a6e5c] font-semibold">Welcome back</p>
          <h1 className="mt-5 text-6xl font-semibold leading-[0.96] tracking-[-0.06em] text-[#0a1a0c]">Return to calm clarity.</h1>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-[#5a6e5c]">Open your AI inbox and continue with the conversations most likely to convert.</p>
        </div>
        <div className="mx-auto w-full max-w-[460px] rounded-[32px] border border-[#1a3a1c] bg-[#0a1a0c] p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Sign in</h2>
          <form className="mt-6 space-y-4">
            <input type="email" placeholder="you@company.com" className="h-12 w-full rounded-2xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[14px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50" />
            <input type="password" placeholder="Password" className="h-12 w-full rounded-2xl border border-[#1a3a1c] bg-[#0f2410] px-4 text-[14px] outline-none text-white placeholder:text-[#6b8a6d] focus:border-[#a3e635]/50" />
            <Link href="/dashboard" className="block rounded-2xl bg-[#a3e635] py-3 text-center text-[14px] font-semibold text-[#0a1a0c] transition hover:bg-[#bef264]">Continue</Link>
          </form>
          <p className="mt-5 text-center text-[13px] text-[#8a9e8b]">No auth backend connected in this demo.</p>
        </div>
      </section>
    </main>
  );
}
