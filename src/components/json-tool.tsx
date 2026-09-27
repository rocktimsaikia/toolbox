"use client";
import Clipboard from "@/components/clipboard";
import LazyCodeEditor from "@/components/lazy-code-editor";
import PanelHeader from "@/components/panel-header";
import SegmentedControl from "@/components/segmented-control";
import ToolError from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import type { Tool } from "@/constants/tools";
import {
  type Indent,
  byteSize,
  describeJson,
  formatJson,
  minifyJson,
  parseJson,
} from "@/lib/json-tools.ts";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export type JsonMode = "format" | "validate" | "minify";

const RECORD = {
  id: 1042,
  name: "Ann Example",
  email: "ann@example.com",
  active: true,
  roles: ["admin", "editor"],
  address: { city: "Oslo", zip: "0150" },
  lastLogin: null,
};

// Each page opens on input that shows off its job: minified JSON to format, formatted
// JSON to validate or minify
const SAMPLES: Record<JsonMode, string> = {
  format: JSON.stringify(RECORD),
  validate: JSON.stringify(RECORD, null, 2),
  minify: JSON.stringify(RECORD, null, 2),
};

const OUTPUT_LABEL: Record<JsonMode, string> = {
  format: "Formatted",
  validate: "Formatted",
  minify: "Minified",
};

const bytes = (n: number) =>
  `${new Intl.NumberFormat("en").format(n)} ${n === 1 ? "byte" : "bytes"}`;

export default function JsonTool({ tool, mode }: { tool: Tool; mode: JsonMode }) {
  const [input, setInput] = useState(SAMPLES[mode]);
  const [indent, setIndent] = useState<Indent>("2");
  const [sort, setSort] = useState(false);

  // Parsing is synchronous, so everything is derived during render and the prerendered
  // HTML already shows the result for the sample
  const result = input.trim() ? parseJson(input) : null;
  const error = result?.error;
  const output =
    result && !result.error
      ? mode === "minify"
        ? minifyJson(result.value)
        : formatJson(
            result.value,
            mode === "format" ? indent : "2",
            mode === "format" && sort,
          )
      : "";

  let status = "";
  if (result && !result.error) {
    const before = byteSize(input);
    const after = byteSize(output);
    status =
      mode === "minify"
        ? `${bytes(before)} to ${bytes(after)}${before > after ? `, ${Math.round((1 - after / before) * 100)}% smaller` : ""}`
        : `Valid JSON: ${describeJson(result.value)}`;
  }

  return (
    <div>
      <ToolsHeader tool={tool} />
      {mode === "format" && (
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <SegmentedControl
            label="Indentation"
            name="json-indent"
            value={indent}
            options={[
              { value: "2", label: "2 spaces" },
              { value: "4", label: "4 spaces" },
              { value: "tab", label: "Tabs" },
            ]}
            onChange={setIndent}
          />
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium lg:min-h-9">
            <input
              type="checkbox"
              checked={sort}
              onChange={(e) => setSort(e.target.checked)}
              className="h-4 w-4 cursor-pointer"
            />
            Sort keys A to Z
          </label>
        </div>
      )}
      <div className="flex flex-col space-y-4 lg:flex-row lg:gap-x-6 lg:space-y-0">
        {/* Fixed width: the editor fills its column, which would otherwise shrink to fit */}
        <div className="flex w-full flex-col lg:w-[529px]">
          <PanelHeader id="json-input" label="Input" format="JSON" />
          <LazyCodeEditor
            value={input}
            onChange={setInput}
            language="json"
            placeholder="Paste your JSON here..."
            labelledBy="json-input"
            errorId={error ? "json-error" : undefined}
          />
          {error && (
            <ToolError
              id="json-error"
              message={error.message}
              detail={`Line ${error.line}, column ${error.column}\n\n${error.excerpt}`}
              preformatted
            />
          )}
        </div>
        <div className="flex w-full flex-col lg:w-[529px]">
          <PanelHeader id="json-output" label={OUTPUT_LABEL[mode]}>
            <Clipboard text={output} />
          </PanelHeader>
          <textarea
            aria-labelledby="json-output"
            className="h-[380px] w-full cursor-default rounded border border-border bg-muted p-3 font-mono text-sm text-foreground lg:h-[485px]"
            value={output}
            readOnly
            spellCheck={false}
            placeholder="The result will appear here…"
          />
          <p
            aria-live="polite"
            className="mt-2 flex min-h-5 items-center gap-1.5 text-sm"
          >
            {status && mode !== "minify" && (
              <CheckCircledIcon aria-hidden="true" className="text-success" />
            )}
            <span
              className={mode === "minify" ? "text-muted-foreground" : "text-success"}
            >
              {status}
            </span>
          </p>
          {/* Valid JSON that still changes on the way through, such as a lost large number */}
          {result?.warnings && result.warnings.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
              {result.warnings.slice(0, 3).map((warning) => (
                <li key={warning}>
                  <span className="font-medium text-foreground">Note:</span> {warning}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
