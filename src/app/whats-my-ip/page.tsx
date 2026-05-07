import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { getPreferredIpAddress } from "@/libs/common";
import { headers } from "next/headers";

export default async function WhatsMyIp() {
  const headersList = await headers();
  //const userAgent = headersList.get("user-agent");
  const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
  const ipv4 = getPreferredIpAddress(ipAddress);

  return (
    <div className="flex flex-col space-y-10">
      <ToolsHeader tool={TOOLS["whats-my-ip"]} />
      <div className="flex flex-col w-[240px] mx-auto">
        <Clipboard text={ipv4} />
        <div className="bg-muted text-green-600 dark:text-green-400 tracking-wider text-2xl font-semibold p-4 border-1 border-gray-500 dark:border-gray-400 border-dotted text-center">
          {ipv4}
        </div>
      </div>
    </div>
  );
}
