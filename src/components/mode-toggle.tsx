"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground">
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-full border border-border/80 bg-background/80 hover:bg-muted transition-colors flex items-center justify-center text-foreground hover:text-primary shadow-xs"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 transition-transform rotate-0 scale-100" />
      )}
    </button>
  );
}
