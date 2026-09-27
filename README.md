# 🧰 Toolbelt

Free, fast developer tools at **[toolbelt.fyi](https://toolbelt.fyi)**. No sign-up, and anything you paste is processed in your browser, never sent to a server.

## Tools

| Tool | What it does |
|------|--------------|
| [Case Converter](https://toolbelt.fyi/case-converter) | Convert text between camelCase, snake_case, Title Case, and more |
| [Text Trimmer](https://toolbelt.fyi/text-trimmer) | Remove leading and trailing whitespace from text |
| [Find and Replace Text](https://toolbelt.fyi/find-replace) | Find and replace with case sensitivity and whole word options |
| [Line Break Remover](https://toolbelt.fyi/line-break-remover) | Remove line breaks, optionally keeping paragraphs |
| [HTML Escape](https://toolbelt.fyi/html-escape) | Escape and unescape HTML entities |
| [URL Parser](https://toolbelt.fyi/url-parser) | Break a messy URL into host, path segments, and every query param, with base64 and JWT values decoded |
| [JSON to TypeScript Types](https://toolbelt.fyi/json-to-ts) | Generate TypeScript types from a JavaScript object or JSON |
| [JSON to YAML](https://toolbelt.fyi/json-to-yaml) | Convert JSON to YAML |
| [YAML to JSON](https://toolbelt.fyi/yaml-to-json) | Convert YAML to JSON |
| [JSON to CSV](https://toolbelt.fyi/json-to-csv) | Turn a JSON array of records into CSV |
| [CSV to JSON](https://toolbelt.fyi/csv-to-json) | Turn CSV rows into a JSON array |
| [XML to JSON](https://toolbelt.fyi/xml-to-json) | Convert XML to JSON |
| [JSON to XML](https://toolbelt.fyi/json-to-xml) | Convert JSON to XML |
| [TOML to JSON](https://toolbelt.fyi/toml-to-json) | Convert TOML to JSON |
| [JSON to TOML](https://toolbelt.fyi/json-to-toml) | Convert JSON to TOML |
| [YAML to TOML](https://toolbelt.fyi/yaml-to-toml) | Convert YAML to TOML |
| [TOML to YAML](https://toolbelt.fyi/toml-to-yaml) | Convert TOML to YAML |
| [Base64 Converter](https://toolbelt.fyi/base64-converter) | Encode and decode Base64 strings |
| [URL Encoder/Decoder](https://toolbelt.fyi/url-encoder-decoder) | Percent-encode and decode URL components |
| [Cron Expression Generator](https://toolbelt.fyi/cron-expression-generator) | Build cron expressions and read them in plain English |
| [Color Code Converter](https://toolbelt.fyi/color-converter) | Convert colors between HEX, RGB, HSL, and RGBA |
| [Password Generator](https://toolbelt.fyi/password-generator) | Create strong random passwords |
| [Word Counter](https://toolbelt.fyi/word-counter) | Count words, characters, sentences, paragraphs, and reading time |
| [Numbers to Words](https://toolbelt.fyi/numbers-to-words) | Spell out numbers in words, with optional currency and locale |
| [Lorem Ipsum Generator](https://toolbelt.fyi/lorem-ipsum) | Generate placeholder text |
| [Blank Character Copy](https://toolbelt.fyi/blank-character) | Copy invisible blank characters |
| [What's My IP](https://toolbelt.fyi/whats-my-ip) | Show your public IP address |

## Development

Requires Node.js and pnpm.

```sh
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm lint
pnpm format       # Biome
```

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Radix UI. Tools live in `src/app/<slug>/` and are registered in `src/constants/tools.ts`.

### Deployment

The site runs on Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare):

```sh
pnpm preview      # build and run locally in the Workers runtime
pnpm deploy       # build and deploy
```

Analytics is off unless `NEXT_PUBLIC_GA_ID` is set at build time.

## Contributing

Bug reports and pull requests are welcome. By submitting a contribution, you agree that it may be used, modified, and relicensed by the maintainer, including as part of toolbelt.fyi.

## License

[PolyForm Noncommercial 1.0.0](LICENSE). You are free to read, run, modify, and share this code for any noncommercial purpose. Commercial use, including running an ad-supported or paid copy of the site, is not permitted without permission.
