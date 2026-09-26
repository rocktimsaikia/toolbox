// Self-check for parse-url.ts. Run: node src/lib/parse-url.check.mjs
import assert from "node:assert/strict";
import { parseUrl } from "./parse-url.ts";

const u = parseUrl(
  "https://user:p%40ss@shop.example.com:8443/en/search%20results/?q=red+shoes&tag=a&tag=b&redirect=https%3A%2F%2Fother.io%2Fcb%3Fx%3D1&bad=%E0%A4&empty=#/cart?step=2",
);
assert.equal(u.protocol, "https");
assert.equal(u.password, "p@ss");
assert.equal(u.port, "8443");
assert.equal(u.defaultPort, false);
assert.deepEqual(u.pathSegments, ["en", "search results"]);
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
console.log("parse-url: ok");
