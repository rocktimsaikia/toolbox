"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import ToolError, { errorProps } from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import { Input } from "@/components/ui/input";
import { TOOLS } from "@/constants/tools";
import cronstrue from "cronstrue";
import { useState } from "react";

type Option = { value: string; label: string };

const range = (from: number, to: number, label: (n: number) => string): Option[] =>
  Array.from({ length: to - from + 1 }, (_, i) => ({
    value: String(from + i),
    label: label(from + i),
  }));

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// The builder: one picker per field, in cron order. Values outside these lists still
// work; the picker shows them as Custom.
const FIELDS: { name: string; options: Option[] }[] = [
  {
    name: "Minute",
    options: [
      { value: "*", label: "Every minute" },
      ...[5, 10, 15, 30].map((n) => ({ value: `*/${n}`, label: `Every ${n} min` })),
      ...[0, 15, 30, 45].map((n) => ({
        value: String(n),
        label: `At :${String(n).padStart(2, "0")}`,
      })),
    ],
  },
  {
    name: "Hour",
    options: [
      { value: "*", label: "Every hour" },
      ...[2, 3, 4, 6, 12].map((n) => ({ value: `*/${n}`, label: `Every ${n} hours` })),
      ...range(0, 23, (h) => `${String(h).padStart(2, "0")}:00`),
    ],
  },
  {
    name: "Day of month",
    options: [
      { value: "*", label: "Every day" },
      ...range(1, 31, (d) => `Day ${d}`),
      { value: "L", label: "Last day" },
    ],
  },
  {
    name: "Month",
    options: [
      { value: "*", label: "Every month" },
      { value: "*/3", label: "Quarterly" },
      { value: "*/6", label: "Twice a year" },
      ...range(1, 12, (m) => MONTHS[m - 1]),
    ],
  },
  {
    name: "Day of week",
    options: [
      { value: "*", label: "Any day" },
      { value: "1-5", label: "Weekdays" },
      { value: "0,6", label: "Weekends" },
      ...range(0, 6, (d) => DAYS[d]),
    ],
  },
];

const RANGE_FIELD: Record<string, string> = {
  minutes: "minute",
  hours: "hour",
  DOM: "day of month",
  month: "month",
  DOW: "day of week",
};

// Errors are thrown so the page can show them as errors, not as a description
function describeCron(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error(
      `A cron expression has 5 fields separated by spaces: minute, hour, day of month, month, and day of week. This has ${parts.length}.`,
    );
  }
  if (parts.some((part) => /\/0+$/.test(part))) {
    throw new Error("A step can't be 0. Use */1, or * for every value.");
  }
  try {
    return cronstrue.toString(parts.join(" "), {
      throwExceptionOnParseError: true,
      use24HourTimeFormat: false,
    });
  } catch (e) {
    const raw = String(e).replace(/^Error:\s*/, "");
    const outOfRange = raw.match(/^(\w+) part must be >= (\d+) and <= (\d+)/);
    if (outOfRange) {
      const field = RANGE_FIELD[outOfRange[1]] ?? outOfRange[1];
      throw new Error(`The ${field} must be from ${outOfRange[2]} to ${outOfRange[3]}.`);
    }
    const invalid = raw.match(/invalid values: '(.+)'/);
    if (invalid) {
      throw new Error(
        `"${invalid[1]}" isn't a value cron understands. Check it against the pickers below.`,
      );
    }
    throw new Error(raw);
  }
}

const commonExamples = [
  { title: "Every minute", expression: "* * * * *" },
  { title: "Every 5 minutes", expression: "*/5 * * * *" },
  { title: "Every 15 minutes", expression: "*/15 * * * *" },
  { title: "Every 30 minutes", expression: "*/30 * * * *" },
  { title: "Every hour", expression: "0 * * * *" },
  { title: "Every 2 hours", expression: "0 */2 * * *" },
  { title: "Every 6 hours", expression: "0 */6 * * *" },
  { title: "Every 12 hours", expression: "0 */12 * * *" },
  { title: "Daily at midnight", expression: "0 0 * * *" },
  { title: "Daily at 9 AM", expression: "0 9 * * *" },
  { title: "Daily at 6 PM", expression: "0 18 * * *" },
  { title: "Every weekday at 9 AM", expression: "0 9 * * 1-5" },
  { title: "Every Saturday at 10 AM", expression: "0 10 * * 6" },
  { title: "Every Sunday at 2 PM", expression: "0 14 * * 0" },
  { title: "First day of every month", expression: "0 0 1 * *" },
  { title: "Last day of every month", expression: "0 0 L * *" },
  { title: "Every month on the 15th", expression: "0 0 15 * *" },
  { title: "Every January 1st", expression: "0 0 1 1 *" },
  { title: "Every 3 months", expression: "0 0 1 */3 *" },
  { title: "Twice daily (9 AM and 6 PM)", expression: "0 9,18 * * *" },
];

const CUSTOM = "custom";

export default function CronExpressionGenerator() {
  const [cronExpression, setCronExpression] = useState("*/5 * * * *");

  // Everything is derived from the expression, so the pickers, the preset, and the
  // description can never disagree with what is in the input
  let description = "";
  let error = "";
  if (cronExpression.trim()) {
    try {
      description = describeCron(cronExpression);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }
  const parts = cronExpression.trim().split(/\s+/);
  const hasFiveParts = parts.length === 5;
  const normalized = parts.join(" ");
  const preset = commonExamples.find((example) => example.expression === normalized);

  const setPart = (index: number, value: string) => {
    const next = hasFiveParts ? [...parts] : ["*", "*", "*", "*", "*"];
    next[index] = value;
    setCronExpression(next.join(" "));
  };

  const selectClass =
    "h-11 w-full rounded border border-border bg-background px-2 text-sm hover:bg-muted lg:h-9";

  return (
    <div>
      <ToolsHeader tool={TOOLS["cron-expression-generator"]} />
      <div className="flex justify-center">
        <div className="flex w-full max-w-2xl flex-col">
          <PanelHeader htmlFor="cron-input" label="Cron expression">
            <Clipboard text={cronExpression} />
          </PanelHeader>
          <Input
            id="cron-input"
            {...errorProps("cron-error", !!error)}
            type="text"
            value={cronExpression}
            onChange={(e) => setCronExpression(e.target.value)}
            placeholder="*/5 * * * *"
            spellCheck={false}
            autoComplete="off"
            className="h-11 w-full font-mono lg:h-9"
          />
          {error && <ToolError id="cron-error" message={error} />}

          <fieldset className="mt-6">
            <legend className="mb-2 text-sm text-muted-foreground">
              Or build it field by field
            </legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {FIELDS.map((field, index) => {
                const current = hasFiveParts ? parts[index] : "";
                const known = field.options.some((option) => option.value === current);
                return (
                  <label key={field.name} className="flex flex-col gap-1 text-sm">
                    <span className="font-medium">{field.name}</span>
                    <select
                      value={known ? current : CUSTOM}
                      onChange={(e) => setPart(index, e.target.value)}
                      className={selectClass}
                    >
                      {!known && (
                        <option value={CUSTOM} disabled>
                          {current ? `Custom: ${current}` : "Custom"}
                        </option>
                      )}
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6">
            <PanelHeader id="cron-description" label="In plain English" />
            <p
              aria-labelledby="cron-description"
              aria-live="polite"
              className="min-h-11 rounded border border-border bg-muted p-3 text-sm text-foreground"
            >
              {description || (
                <span className="text-muted-foreground">
                  The schedule will be described here.
                </span>
              )}
            </p>
          </div>

          <label className="mt-6 flex flex-col gap-1 text-sm">
            <span className="font-medium">Common schedules</span>
            <select
              value={preset?.expression ?? CUSTOM}
              onChange={(e) => setCronExpression(e.target.value)}
              className={selectClass}
            >
              {!preset && (
                <option value={CUSTOM} disabled>
                  Custom schedule
                </option>
              )}
              {commonExamples.map((example) => (
                <option key={example.title} value={example.expression}>
                  {example.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
