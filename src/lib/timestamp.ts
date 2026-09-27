export const UNITS = ["s", "ms", "us", "ns"] as const;
export type Unit = (typeof UNITS)[number];

export const UNIT_NAMES: Record<Unit, string> = {
  s: "seconds",
  ms: "milliseconds",
  us: "microseconds",
  ns: "nanoseconds",
};

// Dates can go 100 million days either side of 1970 (ECMAScript's Date range)
const MAX_MS = 8.64e15;

// Epoch values of today's era have 10 digits in seconds, 13 in ms, 16 in µs, 19 in ns
export function detectUnit(digits: string): Unit {
  const n = digits.replace(/^-/, "").split(".")[0].length;
  if (n <= 11) return "s";
  if (n <= 14) return "ms";
  if (n <= 17) return "us";
  return "ns";
}

// Works on the digits as text: nanosecond values exceed Number's exact integer range
export function toMs(input: string, unit: Unit): number {
  const text = input.trim().replace(/[\s_,]/g, "");
  if (!/^-?\d+(\.\d+)?$/.test(text)) {
    throw new Error(
      "Enter a timestamp in digits, such as 1767225600. A minus sign is fine for dates before 1970.",
    );
  }
  if (text.includes(".") && (unit === "us" || unit === "ns")) {
    throw new Error(
      `Timestamps in ${UNIT_NAMES[unit]} are whole numbers. Remove the decimal part.`,
    );
  }
  let ms: number;
  if (unit === "s") ms = Number(text) * 1000;
  else if (unit === "ms") ms = Number(text);
  else ms = Number(BigInt(text) / BigInt(unit === "us" ? 1000 : 1_000_000));
  if (!Number.isFinite(ms) || Math.abs(ms) > MAX_MS) {
    throw new Error(
      "This is outside the range a date can show, about 270,000 years either side of 1970.",
    );
  }
  return ms;
}

// "2026-09-27T18:30:15" from a datetime-local input, read as UTC or as the viewer's time
export function dateInputToMs(value: string, zone: "utc" | "local") {
  const ms = zone === "utc" ? Date.parse(`${value}Z`) : new Date(value).getTime();
  if (Number.isNaN(ms)) throw new Error("Pick a full date and time.");
  return ms;
}

// The datetime-local value for a timestamp, in UTC or the viewer's time
export function msToDateInput(ms: number, zone: "utc" | "local") {
  const date = new Date(ms);
  const shifted =
    zone === "utc" ? date : new Date(ms - date.getTimezoneOffset() * 60_000);
  return shifted.toISOString().slice(0, 19);
}

const RELATIVE_STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365.25 * 86400],
  ["month", 30.44 * 86400],
  ["week", 7 * 86400],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

// "in 3 days", "2 hours ago", or "now"
export function relativeTime(ms: number, now: number) {
  const seconds = (ms - now) / 1000;
  const format = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, size] of RELATIVE_STEPS) {
    if (Math.abs(seconds) >= size || unit === "second") {
      return format.format(Math.round(seconds / size), unit);
    }
  }
  return "";
}

// Seconds as they are usually written: whole when the time is on a second boundary
export const msToSeconds = (ms: number) =>
  ms % 1000 === 0 ? String(ms / 1000) : (ms / 1000).toFixed(3);
