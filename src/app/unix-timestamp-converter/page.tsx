import TimestampTool from "@/components/timestamp-tool";
import { TOOLS } from "@/constants/tools";

export default function Page() {
  return <TimestampTool tool={TOOLS["unix-timestamp-converter"]} />;
}
