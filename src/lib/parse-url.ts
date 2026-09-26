export type QueryParam = {
  key: string;
  value: string;
  raw: string;
  isUrl: boolean;
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
  pathSegments: string[];
  params: QueryParam[];
  hash: string;
  hashParams: QueryParam[];
};

const DEFAULT_PORTS: Record<string, string> = {
  "http:": "80",
  "https:": "443",
  "ws:": "80",
  "wss:": "443",
  "ftp:": "21",
};

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

function parseQuery(query: string): QueryParam[] {
  return query
    .replace(/^[?#]/, "")
    .split("&")
    .filter(Boolean)
    .map((pair) => {
      const [rawKey, ...rest] = pair.split("=");
      const value = safeDecode(rest.join("="));
      return {
        key: safeDecode(rawKey),
        value,
        raw: pair,
        isUrl: /^https?:\/\/\S+$/i.test(value),
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
    pathname: safeDecode(url.pathname),
    pathSegments: url.pathname.split("/").filter(Boolean).map(safeDecode),
    params: parseQuery(url.search),
    hash: safeDecode(hash),
    hashParams: hashQuery.includes("=") ? parseQuery(hashQuery) : [],
  };
}
