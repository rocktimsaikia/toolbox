import Faq from "@/components/faq";
import { Faqs } from "@/constants/faq";
import { TOOLS } from "@/constants/tools";
import type { Metadata } from "next";

const slug = "url-encoder-decoder";

const tool = TOOLS[slug];
const faq = Faqs[slug];

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
      <Faq faq={faq} />
    </div>
  );
}
