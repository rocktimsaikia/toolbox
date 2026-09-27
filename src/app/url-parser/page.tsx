"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import ToolError, { errorProps } from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { type Decoded, type ParsedUrl, type QueryParam, parseUrl } from "@/lib/parse-url";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const EXAMPLE_URL =
  "https://shop.example.com:8443/en/products/running%20shoes/?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale_2026&q=red+trail+shoes&size=42&size=43&sort=price_asc&redirect_uri=https%3A%2F%2Faccounts.example.com%2Fcallback%3Fstate%3Dxyz&state=eyJyZXR1cm5UbyI6Ii9jYXJ0IiwiY2FydElkIjoiYzE5MiJ9&ref=#reviews";

function Section({
  title,
  count,
  collapsible = false,
  children,
}: {
  title: string;
  count?: number;
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  const heading = (
    <h2 className="text-lg font-semibold">
      {title}
      {count !== undefined && (
        <span className="ml-2 text-sm font-normal text-muted-foreground">{count}</span>
      )}
    </h2>
  );
  const body = (
    <div className="divide-y divide-border rounded border border-border">{children}</div>
  );

  if (!collapsible) {
    return (
      <section className="flex w-full flex-col gap-2">
        {heading}
        {body}
      </section>
    );
  }

  // ponytail: native <details> keeps open/closed state across re-parses, no React state
  return (
    <details open className="group w-full">
      <summary className="mb-2 flex w-fit cursor-pointer list-none items-center gap-2 rounded [&::-webkit-details-marker]:hidden">
        {heading}
        <ChevronDownIcon
          className="text-muted-foreground transition-transform group-[:not([open])]:-rotate-90"
          aria-hidden="true"
        />
      </summary>
      {body}
    </details>
  );
}

function ParseButton({ url, onParse }: { url: string; onParse: (url: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onParse(url)}
      className="inline-flex h-11 shrink-0 cursor-pointer items-center rounded border border-border px-3 text-xs font-medium hover:bg-muted lg:h-8"
    >
      Parse
    </button>
  );
}

function DecodedValue({
  decoded,
  name,
  onParse,
}: {
  decoded: Decoded;
  name: string;
  onParse?: (url: string) => void;
}) {
  return (
    <div className="mt-2 flex items-start gap-2 rounded bg-muted px-2 py-1.5">
      <div className="min-w-0 flex-1">
        <div className="font-sans text-xs text-muted-foreground">
          {decoded.kind === "jwt" ? "JWT, decoded header and payload" : "Base64, decoded"}
        </div>
        <pre className="whitespace-pre-wrap break-all font-mono text-sm">
          {decoded.text}
        </pre>
      </div>
      {decoded.isUrl && onParse && <ParseButton url={decoded.text} onParse={onParse} />}
      <Clipboard text={decoded.text} label={`decoded ${name}`} />
    </div>
  );
}

function Row({
  name,
  value,
  note,
  action,
  decoded,
  onParse,
}: {
  name: string;
  value: string;
  note?: string;
  action?: React.ReactNode;
  decoded?: Decoded;
  onParse?: (url: string) => void;
}) {
  return (
    <div className="grid gap-1 px-3 py-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-4">
      <div className="min-w-0 break-all font-mono text-sm text-muted-foreground">
        {name}
      </div>
      <div className="min-w-0">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 break-all font-mono text-sm">
            {value === "" ? (
              <span className="text-muted-foreground">(empty)</span>
            ) : (
              value
            )}
            {note && (
              <span className="ml-2 font-sans text-xs text-muted-foreground">{note}</span>
            )}
          </div>
          {action}
          {value !== "" && <Clipboard text={value} label={`${name} value`} />}
        </div>
        {decoded && <DecodedValue decoded={decoded} name={name} onParse={onParse} />}
      </div>
    </div>
  );
}

function ParamRows({
  params,
  onParse,
}: {
  params: QueryParam[];
  onParse: (url: string) => void;
}) {
  const counts = params.reduce<Record<string, number>>((acc, { key }) => {
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return params.map((param, idx) => (
    <Row
      key={`${param.raw}-${idx}`}
      name={param.key}
      value={param.value}
      note={counts[param.key] > 1 ? "repeated" : undefined}
      action={param.isUrl && <ParseButton url={param.value} onParse={onParse} />}
      decoded={param.decoded}
      onParse={onParse}
    />
  ));
}

export default function UrlParser() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<ParsedUrl | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (!input.trim()) {
      setParsed(null);
      return;
    }
    try {
      setParsed(parseUrl(input));
    } catch {
      setParsed(null);
      setError(
        "That doesn't look like a URL. Check for spaces or a missing host, as in example.com/page.",
      );
    }
  }, [input]);

  function handleParse(url: string) {
    setInput(url);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="w-full max-w-4xl">
      <ToolsHeader tool={TOOLS["url-parser"]} />
      <div className="flex flex-col">
        <PanelHeader htmlFor="url-input" label="URL">
          <button
            type="button"
            onClick={() => setInput(EXAMPLE_URL)}
            className="inline-flex h-11 cursor-pointer items-center rounded px-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline lg:h-9"
          >
            Try an example
          </button>
        </PanelHeader>
        <textarea
          id="url-input"
          {...errorProps("url-parse-error", !!error)}
          className="h-28 w-full resize-y rounded border border-border p-3 font-mono text-sm dark:bg-input/30"
          value={input}
          spellCheck={false}
          placeholder="Paste a URL here…"
          onChange={(e) => setInput(e.target.value)}
        />
        {error && <ToolError id="url-parse-error" message={error} />}
      </div>

      {parsed && (
        <div className="mt-10 flex flex-col gap-8">
          <Section title="Overview" collapsible>
            <Row name="protocol" value={parsed.protocol} />
            {parsed.username && <Row name="username" value={parsed.username} />}
            {parsed.password && <Row name="password" value={parsed.password} />}
            <Row name="host" value={parsed.hostname} />
            {parsed.port && (
              <Row
                name="port"
                value={parsed.port}
                note={parsed.defaultPort ? "default" : undefined}
              />
            )}
            <Row name="path" value={parsed.pathname} />
            {parsed.hash && (
              <Row
                name="fragment"
                value={parsed.hash}
                decoded={parsed.hashDecoded}
                onParse={handleParse}
              />
            )}
          </Section>

          {parsed.pathSegments.length > 0 && (
            <Section title="Path segments" count={parsed.pathSegments.length} collapsible>
              {parsed.pathSegments.map((segment, idx) => (
                <Row
                  key={`${segment.value}-${idx}`}
                  name={String(idx + 1)}
                  value={segment.value}
                  decoded={segment.decoded}
                  onParse={handleParse}
                />
              ))}
            </Section>
          )}

          {parsed.params.length > 0 && (
            <Section title="Query parameters" count={parsed.params.length}>
              <ParamRows params={parsed.params} onParse={handleParse} />
            </Section>
          )}

          {parsed.hashParams.length > 0 && (
            <Section title="Fragment parameters" count={parsed.hashParams.length}>
              <ParamRows params={parsed.hashParams} onParse={handleParse} />
            </Section>
          )}
        </div>
      )}
    </div>
  );
}
