// Self-check for jwt.ts. Run: node src/lib/jwt.check.mjs
import assert from "node:assert/strict";
import { decodeJwt, expiryStatus } from "./jwt.ts";

const b64url = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const token = `${b64url({ alg: "HS256", typ: "JWT" })}.${b64url({ sub: "42", name: "Zoë", exp: 2000 })}.sig-_x`;

const decoded = decodeJwt(`Bearer ${token}\n`);
assert.deepEqual(decoded.header, { alg: "HS256", typ: "JWT" });
assert.equal(decoded.payload.name, "Zoë");
assert.equal(decoded.signature, "sig-_x");

// Unsigned tokens (alg none) have an empty signature
assert.equal(decodeJwt(`${b64url({ alg: "none" })}.${b64url({ a: 1 })}.`).signature, "");

assert.throws(() => decodeJwt("a.b"), /three parts/);
assert.throws(() => decodeJwt("a.b.c.d.e"), /encrypted JWT/);
assert.throws(
  () => decodeJwt(`${b64url({ alg: "HS256" })}.not+base64.x`),
  /payload is not valid base64url/,
);
assert.throws(
  () => decodeJwt(`${b64url([1])}.${b64url({})}.x`),
  /header decodes, but it is not a JSON object/,
);

assert.equal(expiryStatus({ exp: 2000 }, 1_000_000), "valid");
assert.equal(expiryStatus({ exp: 2000 }, 3_000_000), "expired");
assert.equal(expiryStatus({ nbf: 5000, exp: 9000 }, 1_000_000), "not-yet-valid");
assert.equal(expiryStatus({}), "no-expiry");

console.log("jwt ok");
