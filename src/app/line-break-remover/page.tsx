import TextUtilities from "@/components/text-utilities";
import { TOOLS } from "@/constants/tools";

export default function LineBreakRemover() {
  return (
    <TextUtilities initialMode="line-break-remover" tool={TOOLS["line-break-remover"]} />
  );
}
