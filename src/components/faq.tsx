import type { Faq as FaqType } from "@/constants/faq";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { FAQPage, WithContext } from "schema-dts";

type Props = {
  faq: FaqType[];
};

function generateFaqSchema(faqs: FaqType[]) {
  const mainEntity = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // @ts-ignore
    mainEntity,
  };
  return jsonLd;
}

export default function Faq({ faq }: Props) {
  const jsonLd = generateFaqSchema(faq);

  return (
    <article className="lg:w-sm lg:mx-auto mt-10">
      {/* Schema.org FAQ markup */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full divide-y divide-border border-b border-t">
        {faq.map(({ question, answer }, idx) => (
          <details key={question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium">
              {question}
              <ChevronDownIcon
                className="ml-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="pb-4 text-sm text-muted-foreground">{answer}</div>
          </details>
        ))}
      </div>
    </article>
  );
}
