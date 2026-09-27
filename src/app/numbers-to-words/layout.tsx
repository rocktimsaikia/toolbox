import ToolLayout, { toolMetadata } from "@/components/tool-layout";

const slug = "numbers-to-words";

export const metadata = toolMetadata(slug);

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ToolLayout slug={slug}>{children}</ToolLayout>;
}
