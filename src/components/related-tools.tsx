import { Icons } from "@/components/ui/icons";
import { type Slug, TOOLS, tools } from "@/constants/tools";
import Link from "next/link";

const MIN_LINKS = 3;

export default function RelatedTools({ slug }: { slug: Slug }) {
  const { category } = TOOLS[slug];
  const others = tools.filter((tool) => tool.slug !== slug && !("hide" in tool));
  const sameCategory = others.filter((tool) => tool.category === category);
  // Small categories (Web has two tools) get topped up from the rest of the list
  const related = [
    ...sameCategory,
    ...others.filter((tool) => tool.category !== category),
  ].slice(0, Math.max(sameCategory.length, MIN_LINKS));

  return (
    <nav aria-labelledby="related-tools" className="mx-auto mt-16 w-full max-w-2xl">
      <h2 id="related-tools" className="mb-3 text-xl font-semibold text-foreground">
        Related tools
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {related.map((tool) => (
          <li key={tool.slug}>
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
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-4 inline-block text-sm text-muted-foreground">
        All tools
      </Link>
    </nav>
  );
}
