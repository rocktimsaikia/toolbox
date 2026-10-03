"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import ToolError, { errorProps } from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { type ParsedDbUrl, parseDbUrl } from "@/lib/db-url";
import { useEffect, useState } from "react";

// Made-up credentials, one per common engine
const EXAMPLES = {
  PostgreSQL:
    "postgresql://app_user:s3cr%40t@db.example.com:5432/shop?sslmode=require&connect_timeout=10&application_name=checkout",
  MySQL: "mysql://root:hunter2@localhost/blog?charset=utf8mb4&timezone=UTC",
  "MongoDB Atlas":
    "mongodb+srv://admin:pa55word@cluster0.ab1cd.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0",
  Redis: "rediss://:s3cret@cache.example.com:6380/2",
  SQLite: "sqlite:///data/app.db",
  JDBC: "jdbc:sqlserver://sql.example.com:1433;databaseName=sales;encrypt=true;trustServerCertificate=false",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="divide-y divide-border rounded border border-border">
        {children}
      </div>
    </section>
  );
}

function Row({
  name,
  value,
  about,
  note,
  action,
  masked = false,
}: {
  name: string;
  value: string;
  about?: string;
  note?: string;
  action?: React.ReactNode;
  masked?: boolean;
}) {
  return (
    <div className="grid gap-1 px-3 py-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-4">
      <div className="min-w-0 break-all text-sm font-medium">{name}</div>
      <div className="min-w-0">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 break-all font-mono text-sm">
            {value === "" ? (
              <span className="text-muted-foreground">(empty)</span>
            ) : masked ? (
              "••••••••"
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
        {about && <p className="mt-1 text-sm text-muted-foreground">{about}</p>}
      </div>
    </div>
  );
}

export default function DatabaseUrlParser() {
  // Opens on an example so the page shows a result right away, and the server HTML has it
  const [input, setInput] = useState(EXAMPLES.PostgreSQL);
  const [parsed, setParsed] = useState<ParsedDbUrl | null>(() =>
    parseDbUrl(EXAMPLES.PostgreSQL),
  );
  const [error, setError] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    setError("");
    if (!input.trim()) {
      setParsed(null);
      return;
    }
    try {
      setParsed(parseDbUrl(input));
    } catch {
      setParsed(null);
      setError(
        "That doesn't look like a database URL. It should start with a scheme, as in postgresql://user:password@host:5432/database.",
      );
    }
  }, [input]);

  return (
    <div className="w-full max-w-4xl">
      <ToolsHeader tool={TOOLS["database-url-parser"]} />
      <div className="flex flex-col">
        <PanelHeader htmlFor="db-url-input" label="Connection URL" />
        <textarea
          id="db-url-input"
          {...errorProps("db-url-error", !!error)}
          className="h-28 w-full resize-y rounded border border-border p-3 font-mono text-sm dark:bg-input/30"
          value={input}
          spellCheck={false}
          autoComplete="off"
          placeholder="Paste a connection URL, such as postgresql://user:password@host:5432/db"
          onChange={(e) => setInput(e.target.value)}
        />
        {error && <ToolError id="db-url-error" message={error} />}
        <div className="mt-2 flex flex-wrap items-center gap-x-1 text-sm text-muted-foreground">
          <span>Examples:</span>
          {Object.entries(EXAMPLES).map(([label, url]) => (
            <button
              key={label}
              type="button"
              onClick={() => setInput(url)}
              className="inline-flex h-11 cursor-pointer items-center rounded px-2 underline-offset-4 hover:text-foreground hover:underline lg:h-8"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {parsed && (
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="rounded border border-border bg-muted px-3 py-2 text-sm">
              {parsed.summary}
            </p>
            {parsed.warnings.length > 0 && (
              <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                {parsed.warnings.map((warning) => (
                  <li key={warning}>
                    <span className="font-medium text-foreground">Note:</span> {warning}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Section title="Connection">
            {parsed.parts.map((part) => (
              <Row
                key={part.label}
                name={part.label}
                value={part.value}
                about={part.about}
                note={part.note}
                masked={part.secret && !showSecret}
                action={
                  part.secret && (
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="inline-flex h-11 shrink-0 cursor-pointer items-center rounded border border-border px-3 text-xs font-medium hover:bg-muted lg:h-8"
                    >
                      {showSecret ? "Hide" : "Show"}
                    </button>
                  )
                }
              />
            ))}
          </Section>

          {parsed.params.length > 0 && (
            <Section title="Options">
              {parsed.params.map((param, idx) => (
                <Row
                  key={`${param.key}-${idx}`}
                  name={param.key}
                  value={param.value}
                  about={
                    param.about ?? "A driver-specific option. Check your driver's docs."
                  }
                />
              ))}
            </Section>
          )}
        </div>
      )}
    </div>
  );
}
