// Self-check for json-tools.ts. Run: node src/lib/json-tools.check.mjs
import assert from "node:assert/strict";
import {
  byteSize,
  describeJson,
  formatJson,
  minifyJson,
  parseJson,
} from "./json-tools.ts";

const err = (text) => parseJson(text).error;

// Plain-language messages at the right place
assert.match(err('{"a": 1,}').message, /Remove this comma/);
assert.equal(err('{"a": 1,}').column, 8);
assert.match(err("[1, 2,]").message, /comma before \]/);
assert.match(err("{'a': 1}").message, /double quotes/);
assert.match(err("{\"a\": 'x'}").message, /double quotes/);
assert.match(err("{a: 1}").message, /Put the key in double quotes, like "a"/);
assert.match(err('{"a": 1 // note\n}').message, /comments/);
assert.match(err('{"a": 1 "b": 2}').message, /comma is missing/);
assert.match(err('{"a": [1, 2').message, /ends early/);
assert.match(err("").message, /ends early/);
assert.match(err('{"a": 007}').message, /leading zeros/);
assert.match(err('{"a": undefined}').message, /"undefined" isn't a JSON value/);
assert.match(err('{"a": 1}x').message, /extra text/);
assert.match(err('"line\nbreak"').message, /span lines/);
assert.match(err('"\\x"').message, /isn't a valid escape/);

// Line, column, and caret excerpt
const multi = err('{\n  "a": 1,\n  "b": 2,\n}');
assert.equal(multi.line, 3);
assert.equal(multi.column, 9);
assert.equal(multi.excerpt, '  "b": 2,\n        ^');

// The scanner must agree with JSON.parse on what is valid
const samples = [
  "{}",
  "[]",
  '""',
  "0",
  "-0",
  "1.5e-3",
  "true",
  "null",
  ' { "a" : [ 1 , { "b" : null } ] } ',
  '"\\u00e9\\n\\"q\\""',
  '{"a":{"b":{"c":[[[]]]}}}',
  "1e",
  "01",
  "-",
  ".5",
  "[1,,2]",
  "{,}",
  '{"a" 1}',
  "tru",
  "nul",
  '"\\u12"',
  "[1 2]",
  '{"a":1,,"b":2}',
  '"tab\there"',
  "1.",
  "--1",
];
for (const text of samples) {
  let valid = true;
  try {
    JSON.parse(text);
  } catch {
    valid = false;
  }
  assert.equal(
    parseJson(text).error === undefined,
    valid,
    `disagrees with JSON.parse on ${text}`,
  );
}

// Formatting, sorting, minifying, sizes
const { value } = parseJson('{"b": 1, "a": {"d": [2, 1], "c": true}}');
assert.equal(
  formatJson(value, "2"),
  '{\n  "b": 1,\n  "a": {\n    "d": [\n      2,\n      1\n    ],\n    "c": true\n  }\n}',
);
assert.equal(formatJson(value, "tab").split("\n")[1], '\t"b": 1,');
assert.deepEqual(Object.keys(JSON.parse(formatJson(value, "4", true))), ["a", "b"]);
assert.deepEqual(Object.keys(JSON.parse(formatJson(value, "4", true)).a), ["c", "d"]);
assert.equal(minifyJson(value), '{"b":1,"a":{"d":[2,1],"c":true}}');
assert.equal(byteSize("é"), 2);
assert.equal(describeJson(value), "object with 2 keys");
assert.equal(describeJson([1]), "array of 1 item");

// Valid JSON that changes when parsed is flagged, not silently rewritten
assert.match(
  parseJson('{"id": 12345678901234567890}').warnings[0],
  /becomes 12345678901234567000/,
);
assert.match(parseJson('{"a": 1, "a": 2}').warnings[0], /"a" appears twice/);
assert.deepEqual(parseJson('{"a": {"a": 1}, "n": 9007199254740991}').warnings, []);

console.log("json-tools ok");
