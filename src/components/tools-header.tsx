import type { Tool } from "@/constants/tools";

type Props = {
  tool: Tool;
};

export default function ToolsHeader({ tool: { name, description } }: Props) {
  return (
    <div className="">
      <h1 className="text-center text-3xl">{name}</h1>
      <h2 className="text-center text-lg mt-2">{description}</h2>
    </div>
  );
}
