import ToolLayout, { toolMetadata } from "@/components/tool-layout";

const slug = "html-escape";

export const metadata = toolMetadata(slug);

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ToolLayout slug={slug}>{children}</ToolLayout>;
}
