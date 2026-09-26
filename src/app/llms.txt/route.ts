import { siteConfig } from "@/constants/site";
import { type Tool, tools } from "@/constants/tools";

export const dynamic = "force-static";

// Markdown map of the site for AI crawlers, built from the tool registry so it never drifts
export function GET() {
  const links = tools
    .filter((tool: Tool) => !tool.hide)
    .map(
      (tool) =>
        `- [${tool.name}](${siteConfig.url}/${tool.slug}): ${tool.seoDescription}`,
    );

  const body = `# ${siteConfig.name}

> Free developer tools that run in your browser. No sign-up, and pasted input is processed locally, never sent to a server.

## Tools

${links.join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
