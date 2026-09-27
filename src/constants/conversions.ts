export const FORMATS = ["json", "yaml", "toml", "xml", "csv"] as const;
export type Format = (typeof FORMATS)[number];

export type Conversion = { from: Format; to: Format; sample: string };

// One landing page per conversion people search for. Every pair has its reverse, so
// each page can offer a swap link. Page copy lives in tools.ts, guides.ts, and faq.ts.
export const CONVERSIONS = {
  "json-to-yaml": {
    from: "json",
    to: "yaml",
    sample: `{
  "app": {
    "name": "web",
    "port": 8080,
    "hosts": ["a.local", "b.local"]
  }
}
`,
  },
  "yaml-to-json": {
    from: "yaml",
    to: "json",
    sample: `services:
  web:
    image: nginx:1.27
    ports:
      - "8080:80"
    environment:
      LOG_LEVEL: info
`,
  },
  "json-to-csv": {
    from: "json",
    to: "csv",
    sample: `[
  { "name": "Ann", "age": 31, "city": "Oslo" },
  { "name": "Raj", "age": 27, "city": "Pune" }
]
`,
  },
  "csv-to-json": {
    from: "csv",
    to: "json",
    sample: `name,age,city
Ann,31,Oslo
Raj,27,Pune
`,
  },
  "xml-to-json": {
    from: "xml",
    to: "json",
    sample: `<note>
  <to>Ann</to>
  <from>Raj</from>
  <tag>work</tag>
  <tag>urgent</tag>
</note>
`,
  },
  "json-to-xml": {
    from: "json",
    to: "xml",
    sample: `{
  "note": {
    "to": "Ann",
    "from": "Raj",
    "tags": ["work", "urgent"]
  }
}
`,
  },
  "toml-to-json": {
    from: "toml",
    to: "json",
    sample: `[project]
name = "my-app"
version = "0.1.0"
dependencies = ["requests", "rich"]

[tool.ruff]
line-length = 90
`,
  },
  "json-to-toml": {
    from: "json",
    to: "toml",
    sample: `{
  "title": "my-app",
  "server": { "host": "localhost", "port": 8080 },
  "owners": [{ "name": "Ann" }, { "name": "Raj" }]
}
`,
  },
  "yaml-to-toml": {
    from: "yaml",
    to: "toml",
    sample: `title: my-app
server:
  host: localhost
  port: 8080
features:
  - search
  - export
`,
  },
  "toml-to-yaml": {
    from: "toml",
    to: "yaml",
    sample: `[package]
name = "my-crate"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
`,
  },
} as const satisfies Record<string, Conversion>;

export type ConversionSlug = keyof typeof CONVERSIONS;

export const conversionSlugs = Object.keys(CONVERSIONS) as ConversionSlug[];
