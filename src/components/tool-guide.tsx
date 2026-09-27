import { GUIDES } from "@/constants/guides";
import { type Slug, TOOLS } from "@/constants/tools";

export default function ToolGuide({ slug }: { slug: Slug }) {
  const guide = GUIDES[slug];
  if (!guide) return null;

  return (
    <section className="mx-auto mt-16 w-full max-w-2xl text-sm leading-relaxed">
      <h2 className="mb-3 text-xl font-semibold text-foreground">
        {TOOLS[slug].name} guide
      </h2>
      <p className="text-muted-foreground">{guide.intro}</p>

      {guide.sections.map((section) => (
        <div key={section.heading} className="mt-8">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            {section.heading}
          </h3>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-2 text-muted-foreground">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted-foreground">
              {section.list.map((item) => (
                <li key={item.term ?? item.text}>
                  {item.term && (
                    <span className="font-medium text-foreground">{item.term} </span>
                  )}
                  {item.text}
                </li>
              ))}
            </ul>
          )}
          {section.code && (
            <pre className="mt-3 whitespace-pre-wrap break-all rounded border border-border bg-muted p-3 font-mono text-xs text-foreground">
              <code>{section.code}</code>
            </pre>
          )}
          {section.note && <p className="mt-2 text-muted-foreground">{section.note}</p>}
        </div>
      ))}
    </section>
  );
}
