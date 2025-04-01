import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { headers } from "next/headers";

export default async function WhatsMyIp() {
  const headersList = await headers();
  //const userAgent = headersList.get("user-agent");
  const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");

  return (
    <div>
      <ToolsHeader tool={TOOLS["whats-my-ip"]} />
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="bg-gray-100 text-green-600 tracking-wider mb-2 text-2xl font-semibold p-4 border-1 border-gray-500 border-dotted">
          {ipAddress}
        </div>
      </div>
    </div>
  );
}
