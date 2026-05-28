import Link from "next/link";
import { RovnWordmark } from "@/components/ui/RovnLogo";

function ToggleLine({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 py-3">
      <span className="text-[13px] text-[#0a1a0c] font-medium">{label}</span>
      <span className="relative h-5 w-9 rounded-full bg-[#166534] shadow-[0_0_18px_rgba(22,101,52,0.1)]">
        <span className="absolute left-[18px] top-0.5 h-4 w-4 rounded-full bg-white" />
      </span>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0a1a0c]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/"><RovnWordmark className="text-[#0a1a0c] dark:text-[#0a1a0c]" imgClassName="invert" /></Link>
        <Link href="/sign-in" className="text-[13px] text-[#5a6e5c] hover:text-[#0a1a0c] font-medium">Sign in</Link>
      </header>
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1fr_0.86fr]">
        <div className="rounded-[36px] border border-[#1a3a1c] bg-[#0a1a0c] p-8 text-white shadow-2xl">
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#8a9e8b] font-semibold">Create workspace</p>
          <h1 className="mt-5 max-w-2xl text-6xl font-semibold leading-[0.96] tracking-[-0.06em] text-white">Set up your conversation OS.</h1>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {["Connect channels", "Prioritize leads", "Draft follow-ups"].map((item, index) => (
              <div key={item} className="rounded-3xl border border-[#1a3a1c] bg-[#0f2410] p-5">
                <p className="font-mono text-[12px] text-[#a3e635]">0{index + 1}</p>
                <p className="mt-10 text-[14px] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-[#e4e8e4] bg-white p-8 text-[#0a1a0c] shadow-lg">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#0a1a0c]">Start free</h2>
          <form className="mt-6 space-y-4">
            <input type="text" placeholder="Full name" className="h-12 w-full rounded-2xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 text-[14px] outline-none text-[#0a1a0c] placeholder:text-[#7d937e] focus:border-[#166534]/50" />
            <input type="email" placeholder="Work email" className="h-12 w-full rounded-2xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 text-[14px] outline-none text-[#0a1a0c] placeholder:text-[#7d937e] focus:border-[#166534]/50" />
            <input type="text" placeholder="Business type" className="h-12 w-full rounded-2xl border border-[#e4e8e4] bg-[#f7f7f4] px-4 text-[14px] outline-none text-[#0a1a0c] placeholder:text-[#7d937e] focus:border-[#166534]/50" />
            <ToggleLine label="AI lead scoring" />
            <ToggleLine label="Smart follow-ups" />
            <Link href="/dashboard" className="block rounded-2xl bg-[#a3e635] py-3 text-center text-[14px] font-semibold text-[#0a1a0c] transition hover:bg-[#bef264]">Create workspace</Link>
          </form>
        </div>
      </section>
    </main>
  );
}
