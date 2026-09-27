import DataFormatConverter from "@/components/data-format-converter";
import ToolLayout, { toolMetadata } from "@/components/tool-layout";
import {
  CONVERSIONS,
  type ConversionSlug,
  conversionSlugs,
} from "@/constants/conversions";
import { TOOLS } from "@/constants/tools";

// One page per conversion in CONVERSIONS. Static routes like /json-to-ts take
// precedence over this segment, and anything not listed is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return conversionSlugs.map((pair) => ({ pair }));
}

type Props = { params: Promise<{ pair: ConversionSlug }> };

export async function generateMetadata({ params }: Props) {
  const { pair } = await params;
  return toolMetadata(pair);
}

export default async function Page({ params }: Props) {
  const { pair } = await params;
  const { from, to, sample } = CONVERSIONS[pair];

  return (
    <ToolLayout slug={pair}>
      {/* key: a new pair is a new tool, so state starts fresh (or from the carry) */}
      <DataFormatConverter
        key={pair}
        tool={TOOLS[pair]}
        from={from}
        to={to}
        sample={sample}
        swapHref={`/${to}-to-${from}`}
      />
    </ToolLayout>
  );
}
