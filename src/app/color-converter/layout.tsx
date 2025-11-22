import Faq from "@/components/faq";
import Utterances from "@/components/utterances";
import { Faqs } from "@/constants/faq";
import { TOOLS } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";

const slug = "color-converter";

const tool = TOOLS[slug];
const faq = Faqs[slug];

export const metadata = generateSeo({
  title: tool.name,
  description: tool.description,
  path: `/${slug}`,
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
      <Faq faq={faq} />
      <Utterances path={`/${slug}`} />
    </div>
  );
}
