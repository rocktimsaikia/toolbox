import ToolLayout, { toolMetadata } from "@/components/tool-layout";

const slug = "sha1-generator";

export const metadata = toolMetadata(slug);

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ToolLayout slug={slug}>{children}</ToolLayout>;
}
