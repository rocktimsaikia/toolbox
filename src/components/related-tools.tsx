import ToolCard from "@/components/tool-card";
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
            <ToolCard tool={tool} />
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-11 items-center text-sm text-muted-foreground"
      >
        All tools
      </Link>
    </nav>
  );
}
