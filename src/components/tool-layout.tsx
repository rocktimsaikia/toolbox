import Faq from "@/components/faq";
import RelatedTools from "@/components/related-tools";
import { ToolStructuredData } from "@/components/structured-data";
import ToolGuide from "@/components/tool-guide";
import { Faqs } from "@/constants/faq";
import { type Slug, TOOLS } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";

export const toolMetadata = (slug: Slug) =>
  generateSeo({
    title: TOOLS[slug].seoTitle,
    description: TOOLS[slug].seoDescription,
    path: `/${slug}`,
  });

// Every tool page shares this column: one width (the two-pane tools) and one left edge,
// so moving between tools never shifts the title or the input
export default function ToolLayout({
  slug,
  children,
}: Readonly<{ slug: Slug; children: React.ReactNode }>) {
  return (
    <div className="w-full max-w-[1084px]">
      {children}
      <ToolGuide slug={slug} />
      <Faq faq={Faqs[slug]} />
      <RelatedTools slug={slug} />
      <ToolStructuredData slug={slug} />
    </div>
  );
}
