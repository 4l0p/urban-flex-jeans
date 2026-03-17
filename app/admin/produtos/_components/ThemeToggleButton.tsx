"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div className="w-32 h-10 bg-muted rounded-xl animate-pulse" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-secondary transition-all shadow-sm font-bold text-xs text-foreground"
    >
      {theme === "dark" ? "☀️ MODO CLARO" : "🌙 MODO ESCURO"}
    </button>
  );
}
