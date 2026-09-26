import Faq from "@/components/faq";
import { Icons } from "@/components/ui/icons";
import { HOME_PAGE_FAQ } from "@/constants/faq";
import { siteConfig } from "@/constants/site";
import { type Tool, tools } from "@/constants/tools";
import Link from "next/link";

const visibleTools = tools
  .filter((tool: Tool) => !tool.hide)
  .sort((firstTool: Tool, secondTool: Tool) => {
    if (firstTool.slug === "text-tools") return -1;
    if (secondTool.slug === "text-tools") return 1;
    return 0;
  });

export const metadata = {
  title: "Essential Developer Tools - Free Online Utilities for Programmers",
  description:
    "A collection of free, fast, and easy-to-use developer tools including JSON to TypeScript, Base64 Encoder/Decoder, HTML Escape, Password Generator, and more to streamline your development workflow.",
  keywords: [
    "developer tools",
    "web development utilities",
    "JSON to TypeScript",
    "Base64 converter",
    "HTML escape tool",
    "password generator",
    "URL encoder decoder",
    "online development tools",
    "programming utilities",
  ],
  openGraph: {
    title: "Essential Developer Tools - Free Online Utilities for Programmers",
    description:
      "A collection of free, fast, and easy-to-use developer tools to streamline your development workflow.",
    type: "website",
    url: siteConfig.url,
    siteName: "Tool Box - Essential Developer Tools",
  },
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
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <Link
                href={`/${tool.slug}`}
                className="block p-4 rounded-lg hover:no-underline"
                itemProp="url"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                    {Icons[tool.icon] || Icons.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2
                      className="text-sm font-semibold text-card-foreground truncate"
                      itemProp="name"
                    >
                      {tool.name}
                    </h2>
                    <p
                      className="text-xs text-muted-foreground line-clamp-2"
                      itemProp="description"
                    >
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
        <h2 className="text-2xl font-semibold text-center">Frequently Asked Questions</h2>
        <Faq faq={HOME_PAGE_FAQ} />
      </section>
    </main>
  );
}
