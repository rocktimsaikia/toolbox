"use client";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { type Decoded, type ParsedUrl, type QueryParam, parseUrl } from "@/lib/parse-url";
import { CheckIcon, ChevronDownIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const EXAMPLE_URL =
  "https://shop.example.com:8443/en/products/running%20shoes/?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale_2026&q=red+trail+shoes&size=42&size=43&sort=price_asc&redirect_uri=https%3A%2F%2Faccounts.example.com%2Fcallback%3Fstate%3Dxyz&state=eyJyZXR1cm5UbyI6Ii9jYXJ0IiwiY2FydElkIjoiYzE5MiJ9&ref=#reviews";

function CopyValue({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      title="Copy value"
      onClick={() => {
        copyToClipboard(value);
        setCopied(true);
      }}
      className="shrink-0 cursor-pointer rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

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
      className="shrink-0 cursor-pointer rounded border border-border px-2 py-0.5 text-xs hover:bg-muted"
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
      <CopyValue value={decoded.text} label={`decoded ${name}`} />
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
          {value !== "" && <CopyValue value={value} label={name} />}
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
      setError("That doesn't look like a valid URL");
    }
  }, [input]);

  function handleParse(url: string) {
    setInput(url);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="w-full max-w-4xl">
      <ToolsHeader tool={TOOLS["url-parser"]} />
      <div className="mt-12 flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <label htmlFor="url-input" className="text-lg font-semibold">
            URL
          </label>
          <button
            type="button"
            onClick={() => setInput(EXAMPLE_URL)}
            className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Try an example
          </button>
        </div>
        <textarea
          id="url-input"
          className="h-28 w-full resize-y rounded border border-border p-3 font-mono text-sm dark:bg-input/30"
          value={input}
          spellCheck={false}
          placeholder="Paste a URL here…"
          onChange={(e) => setInput(e.target.value)}
        />
        {error && <p className="text-destructive">{error}</p>}
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
