import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/constants/faq";
import type { FAQPage, WithContext } from "schema-dts";

type Props = {
  faq: Faq[];
};

function generateFaqSchema(faqs: Faq[]) {
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
    <article>
      {/* Schema.org FAQ markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Accordion type="single" collapsible className="w-full">
        {faq.map(({ question, answer }, idx) => (
          <AccordionItem value={`question-${idx}`} key={idx}>
            <AccordionTrigger className="cursor-pointer">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </article>
  );
}
