import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
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
    <div className="flex flex-col">
      <ToolsHeader tool={TOOLS["whats-my-ip"]} />
      <div className="flex flex-col w-[240px] mx-auto">
        <PanelHeader label="Your IP">
          <Clipboard text={ipv4} />
        </PanelHeader>
        <div className="bg-muted text-success tracking-wider text-2xl font-semibold p-4 border-1 border-muted-foreground border-dotted text-center">
          {ipv4}
        </div>
      </div>
    </div>
  );
}
