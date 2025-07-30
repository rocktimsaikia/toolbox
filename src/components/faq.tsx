import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq as FaqType } from "@/constants/faq";
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

      <Accordion type="single" collapsible className="w-full">
        {faq.map(({ question, answer }, idx) => (
          <AccordionItem value={`question-${idx}`} key={question}>
            <AccordionTrigger className="cursor-pointer">{question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </article>
  );
}
