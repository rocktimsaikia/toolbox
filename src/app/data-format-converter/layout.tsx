import Faq from "@/components/faq";
import RelatedTools from "@/components/related-tools";
import { ToolStructuredData } from "@/components/structured-data";
import ToolGuide from "@/components/tool-guide";
import { Faqs } from "@/constants/faq";
import { TOOLS } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";
import Link from "next/link";

const slug = "data-format-converter";

const tool = TOOLS[slug];
const faq = Faqs[slug];

const PAIRS = [
  "json-to-yaml",
  "yaml-to-json",
  "json-to-csv",
  "csv-to-json",
  "xml-to-json",
  "json-to-xml",
] as const;

export const metadata = generateSeo({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/${slug}`,
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
      <ToolGuide slug={slug} />
      <Faq faq={faq} />
      <nav
        aria-label="Popular conversions"
        className="mx-auto mt-16 w-full max-w-2xl text-sm"
      >
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          Popular conversions
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {PAIRS.map((pair) => (
            <li key={pair}>
              <Link href={`/${pair}`}>{TOOLS[pair].name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <RelatedTools slug={slug} />
      <ToolStructuredData slug={slug} />
    </div>
  );
}
