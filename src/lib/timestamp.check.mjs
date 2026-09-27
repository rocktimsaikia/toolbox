// Self-check for timestamp.ts. Run: node src/lib/timestamp.check.mjs
import assert from "node:assert/strict";
import {
  dateInputToMs,
  detectUnit,
  msToDateInput,
  msToSeconds,
  relativeTime,
  toMs,
} from "./timestamp.ts";

const NEW_YEAR = Date.UTC(2026, 0, 1);

// Unit detection by digit count
assert.equal(detectUnit("1767225600"), "s");
assert.equal(detectUnit("1767225600000"), "ms");
assert.equal(detectUnit("1767225600000000"), "us");
assert.equal(detectUnit("1767225600000000000"), "ns");
assert.equal(detectUnit("-86400"), "s");
assert.equal(detectUnit("1767225600.5"), "s");

// The same instant in every unit, including nanoseconds beyond Number's exact range
assert.equal(toMs("1767225600", "s"), NEW_YEAR);
assert.equal(toMs("1767225600000", "ms"), NEW_YEAR);
assert.equal(toMs("1767225600000000", "us"), NEW_YEAR);
assert.equal(toMs("1767225600000000000", "ns"), NEW_YEAR);
assert.equal(toMs("1767225600.25", "s"), NEW_YEAR + 250);
assert.equal(toMs("1,767,225,600", "s"), NEW_YEAR);
assert.equal(toMs("-86400", "s"), -86_400_000);
assert.equal(toMs("0", "s"), 0);

assert.throws(() => toMs("abc", "s"), /in digits/);
assert.throws(() => toMs("12.5", "ns"), /whole numbers/);
assert.throws(() => toMs("99999999999999999", "s"), /outside the range/);

// Date input round trips, read as UTC
assert.equal(dateInputToMs("2026-01-01T00:00:00", "utc"), NEW_YEAR);
assert.equal(msToDateInput(NEW_YEAR, "utc"), "2026-01-01T00:00:00");
const local = dateInputToMs("2026-06-15T09:30:00", "local");
assert.equal(msToDateInput(local, "local"), "2026-06-15T09:30:00");
assert.throws(() => dateInputToMs("", "utc"), /full date/);

// Relative time and seconds display
assert.equal(relativeTime(NEW_YEAR + 3 * 86_400_000, NEW_YEAR), "in 3 days");
assert.equal(relativeTime(NEW_YEAR - 2 * 3_600_000, NEW_YEAR), "2 hours ago");
assert.equal(relativeTime(NEW_YEAR, NEW_YEAR), "now");
assert.equal(msToSeconds(NEW_YEAR), "1767225600");
assert.equal(msToSeconds(NEW_YEAR + 250), "1767225600.250");

console.log("timestamp ok");
