import type { Tool } from "@/constants/tools";

type Props = {
  tool: Tool;
};

export default function ToolsHeader({ tool: { name, description } }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
      <p className="text-lg mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
