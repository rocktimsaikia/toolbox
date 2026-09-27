export type JsonError = {
  message: string;
  line: number;
  column: number;
  // The offending line with a caret under the column, for a monospace detail block
  excerpt: string;
};

export type JsonResult =
  // warnings: valid JSON that still changes when parsed, such as a lost large number
  | { value: unknown; warnings: string[]; error?: undefined }
  | { value?: undefined; warnings?: undefined; error: JsonError };

class ScanError extends Error {
  pos: number;
  constructor(message: string, pos: number) {
    super(message);
    this.pos = pos;
  }
}

const QUOTES = "Use double quotes. JSON strings and keys need \" instead of '.";
const COMMENT = "JSON doesn't allow comments. Remove the // or /* */ part.";

// A small scanner for the JSON grammar. Browsers word JSON.parse errors differently and
// some leave out the position, so this finds the first problem itself and says what is
// wrong in plain words. JSON.parse still does the real parsing once this passes.
function scan(text: string): string[] {
  let i = 0;
  const warnings: string[] = [];
  const ws = () => {
    while (i < text.length && " \t\n\r".includes(text[i])) i++;
  };
  const fail = (message: string, at = i): never => {
    throw new ScanError(message, at);
  };
  const end = () =>
    fail("The JSON ends early. Check for a missing }, ], or closing quote.");

  const string = () => {
    i++;
    while (i < text.length) {
      const c = text[i];
      if (c === '"') {
        i++;
        return;
      }
      if (c === "\\") {
        const next = text[i + 1];
        if (next === "u") {
          if (!/^[0-9a-fA-F]{4}$/.test(text.slice(i + 2, i + 6))) {
            fail("A \\u escape needs four hex digits, like \\u00e9.");
          }
          i += 6;
          continue;
        }
        if (next === undefined) end();
        if (!'"\\/bfnrt'.includes(next))
          fail(`"\\${next}" isn't a valid escape in a JSON string.`);
        i += 2;
        continue;
      }
      if (c < " ") {
        fail(
          c === "\n"
            ? "A string can't span lines. Use \\n for a line break."
            : "Strings can't hold raw control characters. Escape them, as in \\t.",
        );
      }
      i++;
    }
    end();
  };

  const number = () => {
    const match = /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/y;
    match.lastIndex = i;
    const found = match.exec(text);
    if (!found)
      fail("This number isn't valid JSON. Use digits, such as 42, -1.5, or 2e10.");
    else {
      i += found[0].length;
      const n = Number(found[0]);
      if (/^-?\d+$/.test(found[0]) && !Number.isSafeInteger(n)) {
        warnings.push(
          `${found[0]} is too large to keep exactly and becomes ${n}. Quote it as a string to keep every digit.`,
        );
      }
    }
    if (/[0-9]/.test(text[i] ?? "") && text[i - 1] === "0" && found?.[1] === "0") {
      fail(
        "Numbers can't have leading zeros, as in 007. Write 7, or quote it as a string.",
        i - 1,
      );
    }
    if (/[.eE]/.test(text[i] ?? ""))
      fail("This number is cut short, as in 1. or 2e. Add the missing digits.");
  };

  const value = (): void => {
    ws();
    const c = text[i];
    if (c === undefined) end();
    if (c === "{") {
      object();
      return;
    }
    if (c === "[") {
      array();
      return;
    }
    if (c === '"') {
      string();
      return;
    }
    if (c === "-" || (c >= "0" && c <= "9")) {
      number();
      return;
    }
    for (const word of ["true", "false", "null"]) {
      if (text.startsWith(word, i)) {
        i += word.length;
        return;
      }
    }
    if (c === "'") fail(QUOTES);
    if (c === "/") fail(COMMENT);
    const word = text.slice(i).match(/^[A-Za-z_$][\w$]*/)?.[0];
    if (word) {
      fail(
        `"${word}" isn't a JSON value. Use true, false, null, a number, or a quoted string.`,
      );
    }
    fail(
      `Unexpected "${c}". A value (object, array, string, number, true, false, or null) should go here.`,
    );
  };

  const object = () => {
    i++;
    const keys = new Set<string>();
    ws();
    if (text[i] === "}") {
      i++;
      return;
    }
    for (;;) {
      ws();
      const c = text[i];
      if (c === undefined) end();
      if (c !== '"') {
        if (c === "'") fail(QUOTES);
        if (c === "/") fail(COMMENT);
        if (/[A-Za-z_$]/.test(c))
          fail(
            `Put the key in double quotes, like "${text.slice(i).match(/^[\w$]+/)?.[0]}".`,
          );
        fail(`Expected a key in double quotes, but found "${c}".`);
      }
      const keyStart = i;
      string();
      const key = JSON.parse(text.slice(keyStart, i)) as string;
      if (keys.has(key)) {
        warnings.push(
          `The key "${key}" appears twice in one object. Only the last value is kept.`,
        );
      }
      keys.add(key);
      ws();
      if (text[i] === undefined) end();
      if (text[i] !== ":") fail("Expected a colon (:) between the key and its value.");
      i++;
      value();
      ws();
      const after = text[i];
      if (after === undefined) end();
      if (after === "}") {
        i++;
        return;
      }
      if (after !== ",") {
        if (after === "/") fail(COMMENT);
        if (after === '"') fail("A comma is missing between these two properties.");
        fail(`Expected a comma or } after this value, but found "${after}".`);
      }
      const comma = i;
      i++;
      ws();
      if (text[i] === "}")
        fail("Remove this comma. JSON doesn't allow a comma before }.", comma);
    }
  };

  const array = () => {
    i++;
    ws();
    if (text[i] === "]") {
      i++;
      return;
    }
    for (;;) {
      value();
      ws();
      const after = text[i];
      if (after === undefined) end();
      if (after === "]") {
        i++;
        return;
      }
      if (after !== ",") {
        if (after === "/") fail(COMMENT);
        fail(`Expected a comma or ] after this item, but found "${after}".`);
      }
      const comma = i;
      i++;
      ws();
      if (text[i] === "]")
        fail("Remove this comma. JSON doesn't allow a comma before ].", comma);
    }
  };

  value();
  ws();
  if (i < text.length) {
    fail(
      text[i] === "/"
        ? COMMENT
        : "There is extra text after the JSON. Only one value is allowed; wrap several in [ ].",
    );
  }
  return warnings;
}

function locate(text: string, pos: number): Omit<JsonError, "message"> {
  const before = text.slice(0, pos);
  const line = before.split("\n").length;
  const lineStart = before.lastIndexOf("\n") + 1;
  const lineEnd = text.indexOf("\n", pos);
  const source = text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
  const column = pos - lineStart + 1;
  // Long minified lines: show a window around the problem instead of the whole line
  const from = Math.max(0, column - 40);
  const shown = (from > 0 ? "…" : "") + source.slice(from, from + 80);
  const caretAt = column - 1 - from + (from > 0 ? 1 : 0);
  return { line, column, excerpt: `${shown}\n${" ".repeat(caretAt)}^` };
}

export function parseJson(text: string): JsonResult {
  let warnings: string[];
  try {
    warnings = scan(text);
  } catch (e) {
    if (e instanceof ScanError) {
      return { error: { message: e.message, ...locate(text, e.pos) } };
    }
    throw e;
  }
  // The scanner and JSON.parse follow the same grammar, so this only guards against a gap
  try {
    return { value: JSON.parse(text), warnings };
  } catch (e) {
    return { error: { message: String(e), ...locate(text, 0) } };
  }
}

const sortKeys = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(sortKeys)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [key, sortKeys((value as Record<string, unknown>)[key])]),
        )
      : value;

export type Indent = "2" | "4" | "tab";

export function formatJson(value: unknown, indent: Indent, sort = false) {
  return JSON.stringify(
    sort ? sortKeys(value) : value,
    null,
    indent === "tab" ? "\t" : Number(indent),
  );
}

export const minifyJson = (value: unknown) => JSON.stringify(value);

// Byte size as sent over the wire, not string length (emoji and accents take more)
export const byteSize = (text: string) => new TextEncoder().encode(text).length;

// "object with 5 keys", "array of 3 items", or the value's type
export function describeJson(value: unknown) {
  if (Array.isArray(value))
    return `array of ${value.length} ${value.length === 1 ? "item" : "items"}`;
  if (value && typeof value === "object") {
    const n = Object.keys(value).length;
    return `object with ${n} ${n === 1 ? "key" : "keys"}`;
  }
  return value === null ? "null" : typeof value;
}
