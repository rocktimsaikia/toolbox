"use client";
import { setTheme } from "@/lib/theme";

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
      className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-md text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span className="block dark:hidden" aria-hidden="true">
        L
      </span>
      <span className="hidden dark:block" aria-hidden="true">
        D
      </span>
    </button>
  );
}
