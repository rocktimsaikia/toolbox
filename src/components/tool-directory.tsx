/* Hallmark · genre: modern-minimal · macrostructure: Catalogue (grouped) · tone: utilitarian
 * features: icon cards per category · nav: unchanged · footer: Ft2
 * theme: project tokens (globals.css, cool-tinted neutrals, Geist + Geist Mono)
 * pre-emit critique: P4 H4 E4 S4 R5 V4
 */
"use client";
import { Icons } from "@/components/ui/icons";
import { CATEGORIES, type Tool } from "@/constants/tools";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  tools: Tool[];
};

export default function ToolDirectory({ tools }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // "/" focuses the filter unless the user is already typing somewhere
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || target.closest("input, textarea, [contenteditable]")) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const needle = query.trim().toLowerCase();
  const matches = tools.filter((tool) =>
    `${tool.name} ${tool.description} ${tool.slug}`.toLowerCase().includes(needle),
  );
  const groups = CATEGORIES.map((category) => ({
    category,
    tools: matches.filter((tool) => tool.category === category),
  })).filter((group) => group.tools.length > 0);
  // Groups render in CATEGORIES order, so this is the first visible row
  const firstMatch = groups[0]?.tools[0];

  return (
    <div className="mb-12">
      <div className="mb-10 flex max-w-xl items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 transition-colors focus-within:border-foreground/40 focus-within:ring-[3px] focus-within:ring-ring/30">
        <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
        <label htmlFor="tool-filter" className="sr-only">
          Search tools
        </label>
        <input
          id="tool-filter"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && needle && firstMatch) {
              router.push(`/${firstMatch.slug}`);
            } else if (event.key === "Escape") {
              setQuery("");
            }
          }}
          placeholder={`Search ${tools.length} tools`}
          aria-keyshortcuts="/"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        <span
          aria-live="polite"
          className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground"
        >
          {needle ? `${matches.length} of ${tools.length}` : ""}
        </span>
        {needle ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="-mr-1 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground sm:inline-block">
            /
          </kbd>
        )}
      </div>

      {groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No tool matches &ldquo;{query.trim()}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {groups.map(({ category, tools }) => (
            <section key={category}>
              <div className="mb-3 flex items-baseline gap-2">
                <h2 className="text-sm font-semibold text-foreground">{category}</h2>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {tools.length}
                </span>
              </div>
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      className={`group flex h-full items-start gap-3 rounded-lg border bg-card p-4 hover:border-foreground/30 hover:no-underline transition-colors ${
                        needle && tool === firstMatch
                          ? "border-foreground/30"
                          : "border-border"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground transition-colors">
                        {Icons[tool.icon] || Icons.code}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-card-foreground">
                          {tool.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {tool.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
