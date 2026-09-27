// Self-check for hash.ts against Node's own crypto. Run: node src/lib/hash.check.mjs
import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { hashBytes, hashText, md5 } from "./hash.ts";

const node = (algorithm, bytes) =>
  createHash(algorithm.replace("-", "").toLowerCase()).update(bytes).digest("hex");

// RFC 1321 test vectors
assert.equal(md5(new TextEncoder().encode("")), "d41d8cd98f00b204e9800998ecf8427e");
assert.equal(md5(new TextEncoder().encode("abc")), "900150983cd24fb0d6963f7d28e17f72");

// Every length around the 55/56/64-byte padding boundaries, plus random sizes up to 5 KB
const lengths = [...Array.from({ length: 200 }, (_, i) => i), 1023, 1024, 4097, 5000];
for (const length of lengths) {
  const bytes = new Uint8Array(randomBytes(length));
  const hashes = await hashBytes(bytes);
  for (const [algorithm, hex] of Object.entries(hashes)) {
    assert.equal(hex, node(algorithm, bytes), `${algorithm} at ${length} bytes`);
  }
}

// Text is hashed as UTF-8
const text = "Hello, Toolbelt! 👋 é";
const fromText = await hashText(text);
assert.equal(fromText["SHA-256"], node("SHA-256", Buffer.from(text, "utf8")));
assert.equal(fromText.MD5, node("MD5", Buffer.from(text, "utf8")));

console.log("hash ok");
