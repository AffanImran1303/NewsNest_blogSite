"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevents hydration mismatch (SSR error)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />; // Placeholder to avoid layout shift

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-brand-light-text dark:text-brand-dark-text"
      onClick={() => {setTheme(theme === "dark" ? "light" : "dark"),console.log("Toggle clicked!")}}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}