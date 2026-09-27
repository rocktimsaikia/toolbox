import Faq from "@/components/faq";
import ToolGuide from "@/components/tool-guide";
import { Faqs } from "@/constants/faq";
import { TOOLS } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";

const slug = "password-generator";

const tool = TOOLS[slug];
const faq = Faqs[slug];

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
    </div>
  );
}
