// Self-check for uuid.ts. Run: node src/lib/uuid.check.mjs
import assert from "node:assert/strict";
import { formatUuid, uuidv4, uuidv7 } from "./uuid.ts";

const V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

assert.match(uuidv4(), V4);

// Version and variant bits, and the timestamp reads back
const at = Date.UTC(2026, 8, 27, 12, 0, 0, 123);
const id = uuidv7(at);
assert.match(id, V7);
assert.equal(Number.parseInt(id.replaceAll("-", "").slice(0, 12), 16), at);

// A batch in the same millisecond still sorts in creation order, and never repeats
const fixed = Date.UTC(2030, 0, 1);
const batch = Array.from({ length: 5000 }, () => uuidv7(fixed));
assert.deepEqual([...batch].sort(), batch);
assert.equal(new Set(batch).size, batch.length);
for (const u of batch) assert.match(u, V7);

// A clock that steps backwards does not break the order either
const after = uuidv7(fixed - 10_000);
assert.ok(after > batch.at(-1));

// Formatting options
const sample = "0192f0c1-7b3a-7cde-8f00-123456789abc";
assert.equal(
  formatUuid(sample, { uppercase: true, hyphens: true, braces: false }),
  "0192F0C1-7B3A-7CDE-8F00-123456789ABC",
);
assert.equal(
  formatUuid(sample, { uppercase: false, hyphens: false, braces: false }),
  "0192f0c17b3a7cde8f00123456789abc",
);
assert.equal(
  formatUuid(sample, { uppercase: false, hyphens: true, braces: true }),
  `{${sample}}`,
);

const many = Array.from({ length: 1000 }, uuidv4);
assert.equal(new Set(many).size, 1000);

console.log("uuid ok");
