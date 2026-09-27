"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import SegmentedControl from "@/components/segmented-control";
import ToolError, { errorProps } from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import type { Tool } from "@/constants/tools";
import {
  UNITS,
  UNIT_NAMES,
  type Unit,
  dateInputToMs,
  detectUnit,
  msToDateInput,
  msToSeconds,
  relativeTime,
  toMs,
} from "@/lib/timestamp.ts";
import { useEffect, useState } from "react";

// 2026-01-01 00:00:00 UTC. A fixed sample keeps the prerendered HTML identical for
// everyone; the live clock and local times fill in in the browser.
const SAMPLE = "1767225600";

type Zone = "utc" | "local";

function Rows({ rows }: { rows: [label: string, value: string, copy?: boolean][] }) {
  return (
    <dl className="mt-3 divide-y divide-border rounded border border-border">
      {rows.map(([label, value, copy = true]) => (
        <div
          key={label}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-3 py-2 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:gap-x-4"
        >
          <dt className="order-1 text-sm font-medium sm:order-none">{label}</dt>
          <dd className="order-3 col-span-2 min-w-0 break-all font-mono text-sm sm:order-none sm:col-span-1">
            {value || <span className="text-muted-foreground">…</span>}
          </dd>
          <dd className="order-2 min-h-11 justify-self-end sm:order-none lg:min-h-8">
            {copy && value && <Clipboard text={value} label={label} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function TimestampTool({ tool }: { tool: Tool }) {
  // Browser-only values start empty so the server and first client render agree
  const [now, setNow] = useState<number | null>(null);
  const [input, setInput] = useState(SAMPLE);
  const [unitChoice, setUnitChoice] = useState<"auto" | Unit>("auto");
  const [zone, setZone] = useState<Zone>("utc");
  const [dateValue, setDateValue] = useState(msToDateInput(Number(SAMPLE) * 1000, "utc"));

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unit = unitChoice === "auto" ? detectUnit(input.trim()) : unitChoice;
  let ms: number | null = null;
  let error = "";
  if (input.trim()) {
    try {
      ms = toMs(input, unit);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }
  const date = ms === null ? null : new Date(ms);

  let dateMs: number | null = null;
  let dateError = "";
  try {
    dateMs = dateInputToMs(dateValue, zone);
  } catch (e) {
    dateError = e instanceof Error ? e.message : String(e);
  }

  const selectClass =
    "h-11 rounded border border-border bg-background px-2 text-sm hover:bg-muted lg:h-9";

  return (
    <div className="max-w-3xl">
      <ToolsHeader tool={tool} />

      <section aria-labelledby="now-heading" className="rounded border border-border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="now-heading" className="text-sm font-medium text-muted-foreground">
            Current Unix time
          </h2>
          <Clipboard text={now === null ? "" : String(Math.floor(now / 1000))} />
        </div>
        <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">
          {now === null ? " " : Math.floor(now / 1000)}
        </p>
        <p className="mt-1 font-mono text-sm text-muted-foreground tabular-nums">
          {now === null ? " " : `${now} ms · ${new Date(now).toISOString()}`}
        </p>
      </section>

      <section aria-labelledby="to-date-heading" className="mt-10">
        <h2 id="to-date-heading" className="text-xl font-semibold">
          Timestamp to date
        </h2>
        <div className="mt-3">
          <PanelHeader htmlFor="timestamp-input" label="Timestamp">
            <button
              type="button"
              onClick={() => setInput(String(Math.floor(Date.now() / 1000)))}
              className="inline-flex h-11 cursor-pointer items-center rounded border border-border px-3 text-sm font-medium transition-colors hover:bg-muted lg:h-9"
            >
              Use now
            </button>
          </PanelHeader>
          <input
            id="timestamp-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            {...errorProps("timestamp-error", !!error)}
            className="h-11 w-full rounded border border-border px-3 font-mono dark:bg-input/30"
          />
          {error && <ToolError id="timestamp-error" message={error} />}
          <label className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Read as</span>
            <select
              value={unitChoice}
              onChange={(e) => setUnitChoice(e.target.value as "auto" | Unit)}
              className={selectClass}
            >
              <option value="auto">Auto: {UNIT_NAMES[unit]}</option>
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {UNIT_NAMES[u]}
                </option>
              ))}
            </select>
          </label>
        </div>
        {date && ms !== null && (
          <Rows
            rows={[
              ["UTC", date.toUTCString()],
              ["ISO 8601", date.toISOString()],
              [
                "Your time zone",
                now === null
                  ? ""
                  : date.toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "long",
                    }),
              ],
              ["Relative", now === null ? "" : relativeTime(ms, now), false],
              ["Seconds", msToSeconds(ms)],
              ["Milliseconds", String(ms)],
            ]}
          />
        )}
      </section>

      <section aria-labelledby="to-timestamp-heading" className="mt-10">
        <h2 id="to-timestamp-heading" className="text-xl font-semibold">
          Date to timestamp
        </h2>
        <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3">
          <div className="flex flex-col">
            <PanelHeader htmlFor="date-input" label="Date and time" />
            <input
              id="date-input"
              type="datetime-local"
              step={1}
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              {...errorProps("date-error", !!dateError)}
              className="h-11 rounded border border-border px-3 font-mono text-sm dark:bg-input/30 lg:h-9"
            />
          </div>
          <SegmentedControl
            label="Time zone of the date"
            name="date-zone"
            value={zone}
            options={[
              { value: "utc", label: "UTC" },
              { value: "local", label: "My time zone" },
            ]}
            onChange={setZone}
          />
        </div>
        {dateError && <ToolError id="date-error" message={dateError} />}
        {dateMs !== null && (
          <Rows
            rows={[
              ["Seconds", msToSeconds(dateMs)],
              ["Milliseconds", String(dateMs)],
              ["ISO 8601", new Date(dateMs).toISOString()],
            ]}
          />
        )}
      </section>
    </div>
  );
}
