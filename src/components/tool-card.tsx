import { Icons } from "@/components/ui/icons";
import type { Tool } from "@/constants/tools";
import Link from "next/link";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex h-full items-start gap-3 rounded-lg border border-border bg-card p-4 hover:border-foreground/30 hover:no-underline transition-colors"
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
  );
}
