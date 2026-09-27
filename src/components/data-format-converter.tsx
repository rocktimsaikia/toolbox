"use client";
import Clipboard from "@/components/clipboard";
import LazyCodeEditor from "@/components/lazy-code-editor";
import PanelHeader from "@/components/panel-header";
import ToolError from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import type { Format } from "@/constants/conversions";
import type { Tool } from "@/constants/tools";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  tool: Tool;
  from: Format;
  to: Format;
  sample: string;
  // The reverse conversion page, linked from the input header
  swapHref: string;
};

type ConversionError = { message: string; detail?: string };

const label = (format: Format) => format.toUpperCase();

const isPlainObject = (data: unknown): data is Record<string, unknown> =>
  typeof data === "object" && data !== null && !Array.isArray(data);

async function parseInput(input: string, format: Format) {
  switch (format) {
    case "json":
      return JSON.parse(input);
    case "yaml": {
      const yaml = await import("js-yaml");
      return yaml.load(input);
    }
    case "toml": {
      const toml = await import("toml");
      return toml.parse(input);
    }
    case "xml": {
      const { XMLParser } = await import("fast-xml-parser");
      return new XMLParser().parse(input);
    }
    case "csv": {
      const { parse } = await import("csv/sync");
      return parse(input, { columns: true, skip_empty_lines: true });
    }
  }
}

// Throws messages written for the reader, since they are shown as-is
async function stringifyOutput(data: unknown, format: Format) {
  switch (format) {
    case "json":
      return JSON.stringify(data, null, 2);
    case "yaml": {
      const yaml = await import("js-yaml");
      return yaml.dump(data, { indent: 4 });
    }
    case "toml": {
      if (!isPlainObject(data)) {
        throw new Error(
          'TOML needs an object at the top level, such as { "key": "value" }, not a list or a single value.',
        );
      }
      const json2toml = (await import("json2toml")).default;
      try {
        return json2toml(data, { indent: 0 });
      } catch (e) {
        const key = e instanceof Error && e.message.match(/`null` at key "(.+)"/)?.[1];
        if (key) {
          throw new Error(`TOML has no null values. Give "${key}" a value or remove it.`);
        }
        throw e;
      }
    }
    case "xml": {
      const { toXML } = await import("jstoxml");
      return toXML(data as never, { header: false, indent: "  " });
    }
    case "csv": {
      if (!Array.isArray(data)) {
        throw new Error(
          "CSV needs a list of records, such as [{ ... }, { ... }]. To get a single row, wrap your object in [ ].",
        );
      }
      const { stringify } = await import("csv/sync");
      return stringify(data, { header: true });
    }
  }
}

export default function DataFormatConverter({ tool, from, to, sample, swapHref }: Props) {
  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<ConversionError | null>(null);

  useEffect(() => {
    let isCurrent = true;

    if (!input.trim()) {
      setError(null);
      setOutput("");
      return;
    }

    (async () => {
      let data: unknown;
      try {
        data = await parseInput(input, from);
      } catch (e) {
        if (!isCurrent) return;
        setOutput("");
        // The parser's own wording is technical, so it goes under a plain summary
        setError({
          message: `This is not valid ${label(from)}.`,
          detail: e instanceof Error ? e.message : String(e),
        });
        return;
      }
      try {
        const converted = await stringifyOutput(data, to);
        if (!isCurrent) return;
        setOutput(converted);
        setError(null);
      } catch (e) {
        if (!isCurrent) return;
        setOutput("");
        setError({ message: e instanceof Error ? e.message : String(e) });
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [from, to, input]);

  return (
    <div className="flex flex-col">
      <ToolsHeader tool={tool} />
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:gap-x-6 justify-center">
        {/* Fixed width: the editor fills its column, which would otherwise shrink to fit */}
        <div className="flex w-full flex-col lg:w-[529px] lg:items-start">
          <PanelHeader id="converter-input" label="Input" format={label(from)}>
            <Link
              href={swapHref}
              aria-label={`Swap: convert ${label(to)} to ${label(from)}`}
              className="inline-flex h-11 items-center gap-1.5 rounded border border-border px-3 text-sm font-medium text-foreground hover:bg-muted hover:no-underline transition-colors lg:h-9"
            >
              <ArrowLeftRight aria-hidden="true" className="h-3.5 w-3.5" />
              {label(to)} to {label(from)}
            </Link>
          </PanelHeader>
          <LazyCodeEditor
            value={input}
            onChange={setInput}
            language={from === "json" ? "javascript" : "json"}
            placeholder={`Paste your ${label(from)} here...`}
            labelledBy="converter-input"
            errorId={error ? "converter-error" : undefined}
          />
          {error && (
            <ToolError
              id="converter-error"
              message={error.message}
              detail={error.detail}
            />
          )}
        </div>
        <div className="flex flex-col items-start">
          <PanelHeader id="converter-output" label="Output" format={label(to)}>
            <Clipboard text={output} />
          </PanelHeader>
          <textarea
            aria-labelledby="converter-output"
            className="border border-border p-3 bg-muted text-foreground cursor-default font-mono text-sm w-full h-[380px] lg:w-[529px] lg:h-[485px]"
            value={output}
            readOnly
            placeholder="Converted data will appear here…"
          />
        </div>
      </div>
    </div>
  );
}
