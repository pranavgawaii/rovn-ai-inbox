import Link from "next/link";
import { RovnWordmark } from "@/components/RovnLogo";

export default function SignOutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f4] px-6 text-[#0a1a0c]">
      <section className="w-full max-w-[480px] rounded-[36px] border border-[#e4e8e4] bg-white p-8 text-center shadow-xl">
        <div className="mx-auto w-fit">
          <RovnWordmark className="text-[#0a1a0c] dark:text-[#0a1a0c]" imgClassName="invert" />
        </div>
        <p className="mt-10 text-[12px] uppercase tracking-[0.18em] text-[#5a6e5c] font-semibold">Signed out</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Workspace closed.</h1>
        <p className="mt-4 text-[14px] leading-7 text-[#5a6e5c]">Your demo session is safe. Return whenever you want to organize the next lead queue.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href="/sign-in" className="rounded-2xl bg-[#a3e635] px-4 py-3 text-[14px] font-semibold text-[#0a1a0c] transition hover:bg-[#bef264] shadow-sm">
            Sign in
          </Link>
          <Link href="/" className="rounded-2xl border border-[#e4e8e4] px-4 py-3 text-[14px] font-medium text-[#0a1a0c] hover:bg-[#f7f7f4] transition shadow-sm">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
