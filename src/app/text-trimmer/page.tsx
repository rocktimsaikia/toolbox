import TextUtilities from "@/components/text-utilities";
import { TOOLS } from "@/constants/tools";

export default function TextTrimmer() {
  return <TextUtilities initialMode="text-trimmer" tool={TOOLS["text-trimmer"]} />;
}
