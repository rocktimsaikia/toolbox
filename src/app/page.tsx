import Faq from "@/components/faq";
import ToolDirectory from "@/components/tool-directory";
import { HOME_PAGE_FAQ } from "@/constants/faq";
import { type Tool, tools } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";
import type { Metadata } from "next";

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
    <div className="max-w-6xl w-full mx-auto px-4">
      <header className="pt-4 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Developer tools for everyday chores
        </h1>
        <p className="mt-1 text-muted-foreground">
          Converters, encoders, text cleanup, and generators. Free, no sign-up.
        </p>
      </header>

      <ToolDirectory tools={visibleTools} />

      <section className="mb-16">
        <Faq faq={HOME_PAGE_FAQ} />
      </section>
    </div>
  );
}
