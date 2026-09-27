import DataFormatConverter from "@/components/data-format-converter";
import Faq from "@/components/faq";
import RelatedTools from "@/components/related-tools";
import { ToolStructuredData } from "@/components/structured-data";
import ToolGuide from "@/components/tool-guide";
import {
  CONVERSIONS,
  type ConversionSlug,
  conversionSlugs,
} from "@/constants/conversions";
import { Faqs } from "@/constants/faq";
import { TOOLS } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";

// One page per conversion in CONVERSIONS. Static routes like /json-to-ts take
// precedence over this segment, and anything not listed is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return conversionSlugs.map((pair) => ({ pair }));
}

type Props = { params: Promise<{ pair: ConversionSlug }> };

export async function generateMetadata({ params }: Props) {
  const { pair } = await params;
  const tool = TOOLS[pair];
  return generateSeo({
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: `/${pair}`,
  });
}

export default async function Page({ params }: Props) {
  const { pair } = await params;
  const { from, to, sample } = CONVERSIONS[pair];

  return (
    <div>
      <DataFormatConverter
        tool={TOOLS[pair]}
        from={from}
        to={to}
        sample={sample}
        swapHref={`/${to}-to-${from}`}
      />
      <ToolGuide slug={pair} />
      <Faq faq={Faqs[pair]} />
      <RelatedTools slug={pair} />
      <ToolStructuredData slug={pair} />
    </div>
  );
}
