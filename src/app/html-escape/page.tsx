import TextUtilities from "@/components/text-utilities";
import { TOOLS } from "@/constants/tools";

export default function HtmlEscape() {
  return <TextUtilities initialMode="html-escape" tool={TOOLS["html-escape"]} />;
}
