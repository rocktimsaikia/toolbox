import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { headers } from "next/headers";

export default async function WhatsMyIp() {
  const headersList = await headers();
  //const userAgent = headersList.get("user-agent");
  const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
  const ipv4 = ipAddress?.split(",")[0] as string;

  return (
    <div className="flex flex-col space-y-10">
      <ToolsHeader tool={TOOLS["whats-my-ip"]} />
      <div className="flex flex-col w-[240px] mx-auto">
        <Clipboard text={ipv4} />
        <div className="bg-gray-100 text-green-600 tracking-wider text-2xl font-semibold p-4 border-1 border-gray-500 border-dotted text-center">
          {ipv4}
        </div>
      </div>
    </div>
  );
}
