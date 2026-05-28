"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("rovn-theme") as Theme | null;
    const nextTheme = storedTheme === "light" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("rovn-theme", nextTheme);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={cn(
        "flex h-10 items-center gap-2 rounded-full border border-[#1a3a1c] bg-[#0f2410]/95 px-3 text-[12px] font-medium text-[#c8d4c9] shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-[#a3e635] theme-toggle",
        className
      )}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#a3e635] text-[#0a1a0c]">
        {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
      {isLight ? "Dark" : "Light"}
    </button>
  );
}
