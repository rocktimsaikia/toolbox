"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { type ParsedUrl, type QueryParam, parseUrl } from "@/lib/parse-url";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const EXAMPLE_URL =
  "https://shop.example.com:8443/en/products/running%20shoes/?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale_2026&q=red+trail+shoes&size=42&size=43&sort=price_asc&redirect_uri=https%3A%2F%2Faccounts.example.com%2Fcallback%3Fstate%3Dxyz&ref=#reviews";

function toJson(parsed: ParsedUrl) {
  const group = (params: QueryParam[]) =>
    params.reduce<Record<string, string | string[]>>((acc, { key, value }) => {
      const existing = acc[key];
      acc[key] =
        existing === undefined
          ? value
          : [...(Array.isArray(existing) ? existing : [existing]), value];
      return acc;
    }, {});

  return JSON.stringify(
    {
      protocol: parsed.protocol,
      username: parsed.username || undefined,
      password: parsed.password || undefined,
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      path: parsed.pathname,
      query: group(parsed.params),
      hash: parsed.hash || undefined,
      hashParams: parsed.hashParams.length ? group(parsed.hashParams) : undefined,
    },
    null,
    2,
  );
}

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
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <h2 className="mb-2 text-lg font-semibold">
        {title}
        {count !== undefined && (
          <span className="ml-2 text-sm font-normal text-muted-foreground">{count}</span>
        )}
      </h2>
      <div className="divide-y divide-border rounded border border-border">
        {children}
      </div>
    </section>
  );
}

function Row({
  name,
  value,
  note,
  action,
}: {
  name: string;
  value: string;
  note?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 px-3 py-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-4">
      <div className="min-w-0 break-all font-mono text-sm text-muted-foreground">
        {name}
      </div>
      <div className="flex min-w-0 items-start gap-2">
        <div className="min-w-0 flex-1 break-all font-mono text-sm">
          {value === "" ? <span className="text-muted-foreground">(empty)</span> : value}
          {note && (
            <span className="ml-2 font-sans text-xs text-muted-foreground">{note}</span>
          )}
        </div>
        {action}
        {value !== "" && <CopyValue value={value} label={name} />}
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
      action={
        param.isUrl && (
          <button
            type="button"
            onClick={() => onParse(param.value)}
            className="shrink-0 cursor-pointer rounded border border-border px-2 py-0.5 text-xs hover:bg-muted"
          >
            Parse
          </button>
        )
      }
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
          <div className="flex items-end justify-between gap-4">
            <p className="min-w-0 text-sm text-muted-foreground">
              {parsed.params.length} query{" "}
              {parsed.params.length === 1 ? "parameter" : "parameters"}
              {parsed.schemeAdded && " · no scheme given, assumed https"}
            </p>
            <div className="shrink-0">
              <Clipboard text={toJson(parsed)} />
            </div>
          </div>

          <Section title="Overview">
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
            {parsed.hash && <Row name="fragment" value={parsed.hash} />}
          </Section>

          {parsed.pathSegments.length > 0 && (
            <Section title="Path segments" count={parsed.pathSegments.length}>
              {parsed.pathSegments.map((segment, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: segments can repeat
                <Row key={`${segment}-${idx}`} name={String(idx + 1)} value={segment} />
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
