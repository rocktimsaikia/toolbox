"use client";
import { setTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
  const handleClick = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle theme"
      className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      <SunIcon className="block dark:hidden h-4 w-4" aria-hidden="true" />
      <MoonIcon className="hidden dark:block h-4 w-4" aria-hidden="true" />
    </button>
  );
}
