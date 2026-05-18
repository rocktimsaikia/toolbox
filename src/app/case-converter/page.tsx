import TextUtilities from "@/components/text-utilities";
import { TOOLS } from "@/constants/tools";

export default function CaseConverter() {
  return <TextUtilities initialMode="case-converter" tool={TOOLS["case-converter"]} />;
}
