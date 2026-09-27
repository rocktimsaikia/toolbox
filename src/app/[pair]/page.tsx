import DataFormatConverter, { type Converter } from "@/components/data-format-converter";
import Faq from "@/components/faq";
import RelatedTools from "@/components/related-tools";
import { ToolStructuredData } from "@/components/structured-data";
import ToolGuide from "@/components/tool-guide";
import { Faqs } from "@/constants/faq";
import { TOOLS } from "@/constants/tools";
import { generateSeo } from "@/lib/seo";
import Link from "next/link";

// One landing page per popular conversion, each preset on the shared converter.
// Static routes like /json-to-ts take precedence over this segment.
const PAIRS = {
  "json-to-yaml": {
    from: "json",
    to: "yaml",
    sample: `{
  "app": {
    "name": "web",
    "port": 8080,
    "hosts": ["a.local", "b.local"]
  }
}
`,
  },
  "yaml-to-json": {
    from: "yaml",
    to: "json",
    sample: `services:
  web:
    image: nginx:1.27
    ports:
      - "8080:80"
    environment:
      LOG_LEVEL: info
`,
  },
  "json-to-csv": {
    from: "json",
    to: "csv",
    sample: `[
  { "name": "Ann", "age": 31, "city": "Oslo" },
  { "name": "Raj", "age": 27, "city": "Pune" }
]
`,
  },
  "csv-to-json": {
    from: "csv",
    to: "json",
    sample: `name,age,city
Ann,31,Oslo
Raj,27,Pune
`,
  },
  "xml-to-json": {
    from: "xml",
    to: "json",
    sample: `<note>
  <to>Ann</to>
  <from>Raj</from>
  <tag>work</tag>
  <tag>urgent</tag>
</note>
`,
  },
  "json-to-xml": {
    from: "json",
    to: "xml",
    sample: `{
  "note": {
    "to": "Ann",
    "from": "Raj",
    "tags": ["work", "urgent"]
  }
}
`,
  },
} satisfies Record<string, { from: Converter; to: Converter; sample: string }>;

type Pair = keyof typeof PAIRS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PAIRS).map((pair) => ({ pair }));
}

type Props = { params: Promise<{ pair: Pair }> };

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
  const { from, to, sample } = PAIRS[pair];
  const others = (Object.keys(PAIRS) as Pair[]).filter((slug) => slug !== pair);

  return (
    <div>
      <DataFormatConverter tool={TOOLS[pair]} from={from} to={to} sample={sample} />
      <ToolGuide slug={pair} />
      <Faq faq={Faqs[pair]} />
      <nav
        aria-label="Other conversions"
        className="mx-auto mt-16 w-full max-w-2xl text-sm"
      >
        <h2 className="mb-3 text-xl font-semibold text-foreground">Other conversions</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {others.map((slug) => (
            <li key={slug}>
              <Link href={`/${slug}`}>{TOOLS[slug].name}</Link>
            </li>
          ))}
          <li>
            <Link href="/data-format-converter">All formats, including TOML</Link>
          </li>
        </ul>
      </nav>
      <RelatedTools slug={pair} />
      <ToolStructuredData slug={pair} />
    </div>
  );
}
