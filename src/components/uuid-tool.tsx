"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import SegmentedControl from "@/components/segmented-control";
import ToolError, { errorProps } from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import type { Tool } from "@/constants/tools";
import { MAX_COUNT, type UuidVersion, formatUuid, uuidv4, uuidv7 } from "@/lib/uuid.ts";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";

// "uuid" and "guid" are the same identifier under two names; the GUID page just speaks
// to .NET and Windows developers
type Kind = "uuid" | "guid";

export default function UuidTool({ tool, kind }: { tool: Tool; kind: Kind }) {
  const noun = kind === "guid" ? "GUID" : "UUID";
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [count, setCount] = useState("5");
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [braces, setBraces] = useState(false);
  // Raw ids, so format options restyle them without generating new ones
  const [ids, setIds] = useState<string[]>([]);

  const n = Number(count);
  const countError =
    Number.isInteger(n) && n >= 1 && n <= MAX_COUNT
      ? ""
      : `Enter a whole number from 1 to ${new Intl.NumberFormat("en").format(MAX_COUNT)}.`;

  const generate = useCallback(() => {
    if (countError) return;
    const make = version === "v7" ? () => uuidv7() : uuidv4;
    setIds(Array.from({ length: n }, make));
  }, [countError, n, version]);

  // Generated only in the browser: a prerendered page would hand every visitor the same
  // "random" ids. New ones on load and whenever the version or count changes.
  useEffect(() => {
    generate();
  }, [generate]);

  const output = ids
    .map((id) => formatUuid(id, { uppercase, hyphens, braces }))
    .join("\n");

  const download = () => {
    const url = URL.createObjectURL(new Blob([`${output}\n`], { type: "text/plain" }));
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: `${kind}s.txt`,
    });
    link.click();
    URL.revokeObjectURL(url);
  };

  const checkbox = (
    label: string,
    checked: boolean,
    onChange: (value: boolean) => void,
  ) => (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium lg:min-h-9">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer"
      />
      {label}
    </label>
  );

  return (
    <div className="max-w-2xl">
      <ToolsHeader tool={tool} />
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
        <SegmentedControl
          label="Version"
          name="uuid-version"
          value={version}
          options={[
            { value: "v4", label: "v4 random" },
            { value: "v7", label: "v7 time-ordered" },
          ]}
          onChange={setVersion}
        />
        <label className="flex flex-col gap-1 text-sm font-medium">
          How many
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_COUNT}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            {...errorProps("uuid-count-error", !!countError)}
            className="h-11 w-28 rounded border border-border px-3 font-mono text-sm dark:bg-input/30 lg:h-9"
          />
        </label>
      </div>
      {countError && <ToolError id="uuid-count-error" message={countError} />}
      <div className="mt-3 flex flex-wrap gap-x-6">
        {checkbox("Uppercase", uppercase, setUppercase)}
        {checkbox("Hyphens", hyphens, setHyphens)}
        {checkbox("Braces { }", braces, setBraces)}
      </div>

      <div className="mt-6">
        <PanelHeader id="uuid-output" label={`${noun}s`} format={version}>
          <button
            type="button"
            onClick={download}
            disabled={!output}
            className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded border border-border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground lg:h-9"
          >
            Download <DownloadIcon aria-hidden="true" />
          </button>
          <Clipboard text={output} />
        </PanelHeader>
        <textarea
          aria-labelledby="uuid-output"
          className="h-64 w-full cursor-default resize-y rounded border border-border bg-muted p-3 font-mono text-sm text-foreground"
          value={output}
          readOnly
          spellCheck={false}
          placeholder={`Your ${noun}s will appear here.`}
        />
        <button
          type="button"
          onClick={generate}
          disabled={!!countError}
          className="mt-3 inline-flex h-11 cursor-pointer items-center gap-2 rounded bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 lg:h-9"
        >
          <ReloadIcon aria-hidden="true" />
          Generate new {noun}s
        </button>
      </div>
    </div>
  );
}
