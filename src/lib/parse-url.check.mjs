// Self-check for parse-url.ts. Run: node src/lib/parse-url.check.mjs
import assert from "node:assert/strict";
import { detectEncoded, parseUrl } from "./parse-url.ts";

const u = parseUrl(
  "https://user:p%40ss@shop.example.com:8443/en/search%20results/?q=red+shoes&tag=a&tag=b&redirect=https%3A%2F%2Fother.io%2Fcb%3Fx%3D1&bad=%E0%A4&empty=#/cart?step=2",
);
assert.equal(u.protocol, "https");
assert.equal(u.password, "p@ss");
assert.equal(u.port, "8443");
assert.equal(u.defaultPort, false);
assert.deepEqual(
  u.pathSegments.map((s) => s.value),
  ["en", "search results"],
);
assert.deepEqual(
  u.params.map((p) => [p.key, p.value]),
  [
    ["q", "red shoes"],
    ["tag", "a"],
    ["tag", "b"],
    ["redirect", "https://other.io/cb?x=1"],
    ["bad", "%E0%A4"],
    ["empty", ""],
  ],
);
assert.equal(u.params[3].isUrl, true);
assert.deepEqual(
  u.hashParams.map((p) => [p.key, p.value]),
  [["step", "2"]],
);

const bare = parseUrl("  example.com/a  ");
assert.equal(bare.schemeAdded, true);
assert.equal(bare.port, "443");
assert.equal(bare.defaultPort, true);
assert.deepEqual(parseUrl("https://x.io/#access_token=abc").hashParams[0].value, "abc");

assert.throws(() => parseUrl("http://"));
// Base64 / JWT detection
const b64 = (s) => Buffer.from(s).toString("base64");
const enc = parseUrl(
  `https://x.io/${b64("hello/world")}/a+b?state=${encodeURIComponent(b64('{"next":"/cart"}'))}` +
    `&back=${b64("https://x.io/cb")}&utm=newsletter&id=spring_sale_2026&bin=AAECAwQFBgc=` +
    `&id_token=${b64('{"alg":"HS256"}')}.${Buffer.from('{"sub":"42"}').toString("base64url")}.sig` +
    `#${b64("fragment text")}`,
);
const byKey = Object.fromEntries(enc.params.map((p) => [p.key, p.decoded]));
assert.equal(enc.pathSegments[0].decoded.text, "hello/world");
assert.equal(enc.pathSegments[1].value, "a+b", "plus in path stays a plus");
assert.equal(byKey.state.text, '{\n  "next": "/cart"\n}');
assert.equal(byKey.back.isUrl, true);
assert.equal(byKey.utm, undefined, "plain word is not base64");
assert.equal(byKey.id, undefined);
assert.equal(byKey.bin, undefined, "binary bytes are not shown");
assert.equal(byKey.id_token.kind, "jwt");
assert.match(byKey.id_token.text, /"sub": "42"/);
assert.equal(enc.hashDecoded.text, "fragment text");
assert.equal(detectEncoded("deadbeef"), undefined);
assert.equal(detectEncoded("abc"), undefined);

// Chrome escapes spaces into the host where Node rejects them; either way it is not a URL
assert.throws(() => parseUrl("not a url at all"));
assert.throws(() => parseUrl("https://intranet"), /isn't a valid host/);
assert.equal(parseUrl("http://localhost:3000/x").port, "3000");
assert.equal(parseUrl("http://127.0.0.1/").hostname, "127.0.0.1");
assert.equal(parseUrl("mailto:someone@example.com").protocol, "mailto");

console.log("parse-url: ok");
