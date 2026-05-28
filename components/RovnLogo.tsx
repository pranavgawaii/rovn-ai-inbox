import { cn } from "@/lib/utils";
import Image from "next/image";

export function RovnMark({ className, imgClassName }: { className?: string; imgClassName?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image src="/logo.png" alt="Rovn Logo" width={24} height={24} className={cn("object-contain", imgClassName)} />
    </div>
  );
}

export function RovnWordmark({ className, imgClassName }: { className?: string; imgClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/logo.png" alt="Rovn Logo" width={24} height={24} className={cn("object-contain", imgClassName)} />
      <span className="text-[20px] font-bold tracking-tight text-current">Rovn</span>
    </div>
  );
}

