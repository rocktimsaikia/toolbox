import UuidTool from "@/components/uuid-tool";
import { TOOLS } from "@/constants/tools";

export default function Page() {
  return <UuidTool tool={TOOLS["uuid-generator"]} kind="uuid" />;
}
