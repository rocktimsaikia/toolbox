import JsonTool from "@/components/json-tool";
import { TOOLS } from "@/constants/tools";

export default function Page() {
  return <JsonTool tool={TOOLS["json-validator"]} mode="validate" />;
}
