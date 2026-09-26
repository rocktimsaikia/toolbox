import Faq from "@/components/faq";
import { Icons } from "@/components/ui/icons";
import { HOME_PAGE_FAQ } from "@/constants/faq";
import { type Tool, tools } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const visibleTools = tools.filter((tool: Tool) => !tool.hide);

const title = "Toolbelt - Free Online Developer Tools, No Sign-up";
const seo = generateSeo({ path: "/" });

export const metadata: Metadata = {
  ...seo,
  title,
  openGraph: { ...seo.openGraph, title },
  twitter: { ...seo.twitter, title },
};

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <header className="mb-10 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">
          Essential Developer Tools
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Free, fast, and easy-to-use online tools to streamline your development
          workflow. No sign-up required. Just pick a tool and get started!
        </p>
      </header>

      <section className="mb-12">
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleTools.map((tool: Tool) => (
            <li
              key={tool.name}
              className="group bg-card border border-border rounded-lg hover:border-foreground/30 hover:shadow-sm transition-[border-color,box-shadow] duration-200"
            >
              <Link
                href={`/${tool.slug}`}
                className="block p-4 rounded-lg hover:no-underline"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                    {Icons[tool.icon] || Icons.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-card-foreground truncate">
                      {tool.name}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <Faq faq={HOME_PAGE_FAQ} />
      </section>
    </main>
  );
}
