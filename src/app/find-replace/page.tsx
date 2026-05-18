import TextUtilities from "@/components/text-utilities";
import { TOOLS } from "@/constants/tools";

export default function FindReplace() {
  return <TextUtilities initialMode="find-replace" tool={TOOLS["find-replace"]} />;
}
