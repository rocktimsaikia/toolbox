export type Decoded = {
  kind: "base64" | "jwt";
  text: string;
  isUrl: boolean;
};

export type QueryParam = {
  key: string;
  value: string;
  raw: string;
  isUrl: boolean;
  decoded?: Decoded;
};

export type PathSegment = {
  value: string;
  decoded?: Decoded;
};

export type ParsedUrl = {
  href: string;
  schemeAdded: boolean;
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  defaultPort: boolean;
  origin: string;
  pathname: string;
  pathSegments: PathSegment[];
  params: QueryParam[];
  hash: string;
  hashParams: QueryParam[];
  hashDecoded?: Decoded;
};

const DEFAULT_PORTS: Record<string, string> = {
  "http:": "80",
  "https:": "443",
  "ws:": "80",
  "wss:": "443",
  "ftp:": "21",
};

// Query strings treat "+" as a space; paths and raw base64 do not.
function safeDecode(value: string, plusAsSpace = true) {
  try {
    return decodeURIComponent(plusAsSpace ? value.replace(/\+/g, " ") : value);
  } catch {
    return value;
  }
}

const isUrl = (value: string) => /^https?:\/\/\S+$/i.test(value);

export function base64ToText(value: string) {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  try {
    const bytes = Uint8Array.from(
      atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4)),
      (c) => c.charCodeAt(0),
    );
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    // Control characters mean binary data, not text
    // biome-ignore lint/suspicious/noControlCharactersInRegex: that is the point
    return /[\x00-\x08\x0e-\x1f\x7f]/.test(text) ? null : text;
  } catch {
    return null;
  }
}

function prettyJson(text: string) {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return null;
  }
}

// ponytail: heuristic, not proof. Plain words like "newsletter" are valid base64 alphabet,
// so we require 8+ chars and a decode to printable UTF-8; random bytes almost never pass.
export function detectEncoded(value: string): Decoded | undefined {
  const jwt = value.match(/^([\w-]+)\.([\w-]+)\.[\w-]*$/);
  if (jwt) {
    const header = prettyJson(base64ToText(jwt[1]) ?? "");
    const payload = prettyJson(base64ToText(jwt[2]) ?? "");
    if (header && payload) {
      return { kind: "jwt", text: `${header}\n${payload}`, isUrl: false };
    }
  }
  if (value.length < 8 || value.length % 4 === 1) return undefined;
  if (!/^[A-Za-z0-9+/_-]+={0,2}$/.test(value)) return undefined;
  const text = base64ToText(value);
  if (!text?.trim()) return undefined;
  return { kind: "base64", text: prettyJson(text) ?? text, isUrl: isUrl(text) };
}

function parseQuery(query: string): QueryParam[] {
  return query
    .replace(/^[?#]/, "")
    .split("&")
    .filter(Boolean)
    .map((pair) => {
      const [rawKey, ...rest] = pair.split("=");
      const rawValue = rest.join("=");
      const value = safeDecode(rawValue);
      return {
        key: safeDecode(rawKey),
        value,
        raw: pair,
        isUrl: isUrl(value),
        decoded: detectEncoded(safeDecode(rawValue, false)),
      };
    });
}

export function parseUrl(input: string): ParsedUrl {
  const trimmed = input.trim();
  // ponytail: bare "example.com/x" gets https://, anything with a scheme is taken as-is
  const schemeAdded = !/^[a-z][a-z\d+.-]*:/i.test(trimmed);
  const url = new URL(schemeAdded ? `https://${trimmed}` : trimmed);
  const hash = url.hash.replace(/^#/, "");
  // Hash routers (#/page?x=1) and OAuth fragments (#access_token=...) carry params too
  const hashQuery = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : hash;
  // "=" that is only base64 padding does not make key=value pairs
  const hashHasParams =
    hashQuery.includes("=") && !/^[A-Za-z0-9+/_-]+={1,2}$/.test(hashQuery);

  return {
    href: url.href,
    schemeAdded,
    protocol: url.protocol.replace(/:$/, ""),
    username: safeDecode(url.username),
    password: safeDecode(url.password),
    hostname: url.hostname,
    port: url.port || DEFAULT_PORTS[url.protocol] || "",
    defaultPort: !url.port,
    origin: url.origin === "null" ? "" : url.origin,
    pathname: safeDecode(url.pathname, false),
    pathSegments: url.pathname
      .split("/")
      .filter(Boolean)
      .map((segment) => {
        const value = safeDecode(segment, false);
        return { value, decoded: detectEncoded(value) };
      }),
    params: parseQuery(url.search),
    hash: safeDecode(hash),
    hashParams: hashHasParams ? parseQuery(hashQuery) : [],
    hashDecoded: hashHasParams ? undefined : detectEncoded(safeDecode(hash, false)),
  };
}
