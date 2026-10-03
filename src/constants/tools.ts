import type { Icons } from "@/components/ui/icons";

export type Slug = keyof typeof TOOLS;

// Homepage groups, in display order
export const CATEGORIES = [
  "Convert",
  "Data formats",
  "Encode & decode",
  "Text",
  "Generate",
  "Web",
] as const;

export interface Tool {
  name: string;
  // Keyword-first <title>, 50-60 characters once " | Toolbelt" is appended
  seoTitle: string;
  description: string;
  // Longer copy for the meta description (aim for 120-155 characters)
  seoDescription: string;
  slug: Slug;
  category: (typeof CATEGORIES)[number];
  hide?: boolean;
  icon: keyof typeof Icons;
}

export const TOOLS = {
  "json-to-ts": {
    name: "JavaScript/JSON to TypeScript Types",
    seoTitle: "JSON to TypeScript Interface Generator Online",
    description: "Paste JSON or a JS object, get TypeScript types",
    seoDescription:
      "Paste a JavaScript object or JSON and get TypeScript types instantly. A free online JSON to TypeScript converter that runs entirely in your browser.",
    slug: "json-to-ts",
    category: "Convert",
    icon: "json",
  },
  "numbers-to-words": {
    name: "Numbers to Words",
    seoTitle: "Numbers to Words Converter, Amount in Words",
    description: "Spell out numbers, with currency mode and 23 locales",
    seoDescription:
      "Convert numbers to words online, with optional currency and locale formats for cheques, invoices, and legal documents. Free, fast, and instant.",
    slug: "numbers-to-words",
    category: "Convert",
    icon: "hash",
  },
  "rupees-in-words": {
    name: "Rupees in Words",
    seoTitle: "Rupees in Words: Amount in Words for Cheques",
    description: "Write a rupee amount in words, cheque style",
    seoDescription:
      "Convert an amount in Indian rupees to words for cheques, invoices, and forms, with lakh and crore, paise, and cheque-style wording. Free and instant.",
    slug: "rupees-in-words",
    category: "Convert",
    icon: "rupee",
  },
  "password-generator": {
    name: "Password Generator",
    seoTitle: "Strong Random Password Generator",
    description: "Pick length and character sets, generated on your device",
    seoDescription:
      "Generate strong random passwords in your browser. Pick the length and mix of uppercase, lowercase, numbers, and symbols. Nothing leaves your device.",
    slug: "password-generator",
    category: "Generate",
    icon: "key",
  },
  "base64-converter": {
    name: "Base64 Converter",
    seoTitle: "Base64 Encode and Decode Online, UTF-8 Safe",
    description: "Text to Base64 and back, with UTF-8 and URL-safe input",
    seoDescription:
      "Encode text to Base64 or decode Base64 back to readable text, instantly and in your browser. A free online Base64 encoder and decoder with no sign-up.",
    slug: "base64-converter",
    category: "Encode & decode",
    icon: "arrowUpDown",
  },
  "url-encoder-decoder": {
    name: "URL Encoder/Decoder",
    seoTitle: "URL Encode and Decode Online, Percent Encoding",
    description: "Percent-encode text for URLs, or decode it back",
    seoDescription:
      "Percent-encode text for safe use in URLs, or decode encoded URL strings back to readable text. A free online URL encoder and decoder with no sign-up.",
    slug: "url-encoder-decoder",
    category: "Encode & decode",
    icon: "link",
  },
  "url-parser": {
    name: "URL Parser",
    seoTitle: "URL Parser: Split URLs and Decode Query Params",
    description:
      "Break a messy URL into readable parts: host, path, and every query param",
    seoDescription:
      "Paste a long or messy URL to see its protocol, host, path segments, and every query parameter decoded, including Base64 and JWT values. Free and private.",
    slug: "url-parser",
    category: "Web",
    icon: "listTree",
  },
  "database-url-parser": {
    name: "Database URL Parser",
    seoTitle: "Database URL Parser: Read Any Connection String",
    description: "See what every part of a database connection string means",
    seoDescription:
      "Paste a Postgres, MySQL, MongoDB, Redis, or SQLite connection URL to see its user, host, port, database, and options, each explained. Runs in your browser.",
    slug: "database-url-parser",
    category: "Web",
    icon: "database",
  },
  "whats-my-ip": {
    name: "What's My IP",
    seoTitle: "What's My IP Address? See Your Public IP",
    description: "The public address websites see, copied in one click",
    seoDescription:
      "See your public IP address instantly, the same address websites see when you connect. Free, fast, and no sign-up required. Copy it in one click.",
    slug: "whats-my-ip",
    category: "Web",
    icon: "wifi",
  },
  "jwt-decoder": {
    name: "JWT Decoder",
    seoTitle: "JWT Decoder: Decode JSON Web Tokens Online",
    description: "Read a token's header, claims, and expiry",
    seoDescription:
      "Decode a JWT to read its header, payload claims, and expiry date. Paste a token and see it decoded instantly. Runs in your browser, nothing is sent.",
    slug: "jwt-decoder",
    category: "Encode & decode",
    icon: "braces",
  },
  "hash-generator": {
    name: "Hash Generator",
    seoTitle: "Hash Generator: MD5, SHA-1, SHA-256, SHA-512 Online",
    description: "MD5, SHA-1, SHA-256, and SHA-512 of text or files",
    seoDescription:
      "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes of text or files at once, and check a download against its checksum. Runs in your browser.",
    slug: "hash-generator",
    category: "Encode & decode",
    icon: "shield",
  },
  "md5-generator": {
    name: "MD5 Generator",
    seoTitle: "MD5 Hash Generator Online, Text and Files",
    description: "The MD5 hash of any text or file",
    seoDescription:
      "Generate the MD5 hash of text or a file online and verify MD5 checksums of downloads. Free, instant, and private: nothing leaves your browser.",
    slug: "md5-generator",
    category: "Encode & decode",
    icon: "shield",
  },
  "sha1-generator": {
    name: "SHA-1 Generator",
    seoTitle: "SHA-1 Hash Generator Online, Text and Files",
    description: "The SHA-1 hash of any text or file",
    seoDescription:
      "Generate the SHA-1 hash of text or a file online and verify SHA-1 checksums. Free, instant, and private: files are hashed in your browser, never uploaded.",
    slug: "sha1-generator",
    category: "Encode & decode",
    icon: "shield",
  },
  "sha256-generator": {
    name: "SHA-256 Generator",
    seoTitle: "SHA-256 Hash Generator Online, Text and Files",
    description: "The SHA-256 hash of any text or file",
    seoDescription:
      "Generate the SHA-256 hash of text or a file online and verify SHA-256 checksums of downloads. Free, instant, and private: nothing leaves your browser.",
    slug: "sha256-generator",
    category: "Encode & decode",
    icon: "shield",
  },
  "sha512-generator": {
    name: "SHA-512 Generator",
    seoTitle: "SHA-512 Hash Generator Online, Text and Files",
    description: "The SHA-512 hash of any text or file",
    seoDescription:
      "Generate the SHA-512 hash of text or a file online and verify SHA-512 checksums. Free, instant, and private: files are hashed in your browser, never uploaded.",
    slug: "sha512-generator",
    category: "Encode & decode",
    icon: "shield",
  },
  "html-escape": {
    name: "HTML Escape",
    seoTitle: "HTML Escape and Unescape, HTML Entity Encoder",
    description: "Turn <, >, & and quotes into entities, or back",
    seoDescription:
      "Escape special characters like <, >, &, and quotes into HTML entities, or unescape entities back to plain text. A free online HTML escape tool.",
    slug: "html-escape",
    category: "Encode & decode",
    icon: "code",
  },
  "line-break-remover": {
    name: "Line Break Remover",
    seoTitle: "Remove Line Breaks from Text Online",
    description: "Unwrap text from PDFs and emails, keep paragraphs",
    seoDescription:
      "Remove line breaks from text pasted from PDFs, emails, or docs, with an option to keep paragraph breaks. A free online line break remover.",
    slug: "line-break-remover",
    category: "Text",
    icon: "alignLeft",
  },
  "uuid-generator": {
    name: "UUID Generator",
    seoTitle: "UUID Generator: Random v4 and v7 UUIDs Online",
    description: "Random v4 or time-ordered v7, one or a thousand",
    seoDescription:
      "Generate UUIDs online: random v4 or time-ordered v7, one or up to 1,000 at once, uppercase or without hyphens. Created in your browser, free and instant.",
    slug: "uuid-generator",
    category: "Generate",
    icon: "fingerprint",
  },
  "guid-generator": {
    name: "GUID Generator",
    seoTitle: "GUID Generator: Create GUIDs Online for .NET",
    description: "Random GUIDs for .NET and SQL Server, in bulk",
    seoDescription:
      "Generate GUIDs online for C#, .NET, and SQL Server. Create one or up to 1,000 at once, with braces or uppercase if you need them. Free and in your browser.",
    slug: "guid-generator",
    category: "Generate",
    icon: "fingerprint",
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum Generator",
    seoTitle: "Lorem Ipsum Generator, Placeholder Text",
    description: "Set paragraphs, sentences, and words per sentence",
    seoDescription:
      "Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words for mockups and layouts. Copy it in one click. Free and instant.",
    slug: "lorem-ipsum",
    category: "Generate",
    icon: "fileText",
  },
  "blank-character": {
    name: "Blank Character Copy",
    seoTitle: "Invisible Character (ㅤ) Copy and Paste, Blank Text",
    description: "Invisible characters for empty names in games and apps",
    seoDescription:
      "Copy invisible blank characters for empty names, messages, and text fields in games and apps. One click to copy, free and instant, no sign-up needed.",
    slug: "blank-character",
    category: "Text",
    icon: "copy",
  },
  "cron-expression-generator": {
    name: "Cron Expression Generator",
    seoTitle: "Cron Expression Generator and Explainer",
    description: "Build a cron schedule or read one in plain English",
    seoDescription:
      "Build cron expressions and read any cron schedule in plain English. A free online cron expression generator and explainer for developers.",
    slug: "cron-expression-generator",
    category: "Generate",
    icon: "clock",
  },
  "text-trimmer": {
    name: "Text Trimmer",
    seoTitle: "Trim Whitespace from Text Online",
    description: "Strip leading and trailing whitespace from every line",
    seoDescription:
      "Remove leading and trailing whitespace from every line of text, or from just one side. A free online text trimmer for cleaning pasted text and code.",
    slug: "text-trimmer",
    category: "Text",
    icon: "scissors",
  },
  "find-replace": {
    name: "Find and Replace Text",
    seoTitle: "Find and Replace Text Online, Case Sensitive",
    description: "Case-sensitive and whole-word matching",
    seoDescription:
      "Find and replace text online with case-sensitive and whole-word matching. Paste your text, set the search and replacement, and copy the result.",
    slug: "find-replace",
    category: "Text",
    icon: "search",
  },
  "case-converter": {
    name: "Case Converter",
    seoTitle: "Case Converter: camelCase, snake_case, Title Case",
    description: "camelCase, snake_case, kebab-case, and 6 more",
    seoDescription:
      "Convert text to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case, UPPER or lower case. Free and instant.",
    slug: "case-converter",
    category: "Text",
    icon: "type",
  },
  "unix-timestamp-converter": {
    name: "Timestamp to Date Converter",
    seoTitle: "Timestamp to Date Converter: Seconds, ms, µs, ns and Back",
    description: "Timestamps to dates and back, in any unit",
    seoDescription:
      "Convert a Unix timestamp to a date in UTC and your time zone, or a date to a timestamp. Reads seconds, milliseconds, microseconds, and nanoseconds.",
    slug: "unix-timestamp-converter",
    category: "Convert",
    icon: "calendar",
  },
  "epoch-converter": {
    name: "Epoch Converter",
    seoTitle: "Epoch Converter: Epoch Time to Human Date Online",
    description: "Epoch time to a readable date, and back",
    seoDescription:
      "Convert epoch time to a human-readable date and back. See the current epoch time live, in seconds or milliseconds, with UTC and local time side by side.",
    slug: "epoch-converter",
    category: "Convert",
    icon: "calendar",
  },
  "color-converter": {
    name: "Color Code Converter",
    seoTitle: "Color Converter: HEX to RGB, RGBA and HSL",
    description: "HEX, RGB, RGBA, and HSL, with a live preview",
    seoDescription:
      "Convert colors between HEX, RGB, RGBA, and HSL with a live preview. A free online color code converter for designers and developers.",
    slug: "color-converter",
    category: "Convert",
    icon: "palette",
  },
  "word-counter": {
    name: "Word Counter",
    seoTitle: "Word Counter and Character Counter Online",
    description: "Words, characters, sentences, paragraphs, and reading time",
    seoDescription:
      "Count words, characters, sentences, and paragraphs, and estimate reading time as you type. A free online word counter that runs in your browser.",
    slug: "word-counter",
    category: "Text",
    icon: "fileText",
  },
  "json-formatter": {
    name: "Online JSON Formatter",
    seoTitle: "Online JSON Formatter and Beautifier",
    description: "Pretty print JSON with the indentation you want",
    seoDescription:
      "Format and beautify JSON online. Paste minified or messy JSON and get readable, indented output, with any error pointed out by line. Free and private.",
    slug: "json-formatter",
    category: "Data formats",
    icon: "braces",
  },
  "json-validator": {
    name: "JSON Validator",
    seoTitle: "JSON Validator: Check JSON and Find Errors Online",
    description: "Check JSON and see exactly where it breaks",
    seoDescription:
      "Validate JSON online and find errors fast. See the exact line and column of the problem, with a plain explanation of how to fix it. Free and private.",
    slug: "json-validator",
    category: "Data formats",
    icon: "braces",
  },
  "json-minifier": {
    name: "JSON Minifier",
    seoTitle: "JSON Minifier: Compress and Minify JSON Online",
    description: "Strip whitespace and see how many bytes you save",
    seoDescription:
      "Minify JSON online by removing spaces and line breaks. See the size before and after, then copy compact JSON for APIs and configs. Free and private.",
    slug: "json-minifier",
    category: "Data formats",
    icon: "braces",
  },
  "json-to-yaml": {
    name: "JSON to YAML Converter",
    seoTitle: "JSON to YAML Converter Online, Free and Private",
    description: "Paste JSON, get clean YAML",
    seoDescription:
      "Convert JSON to YAML online. Paste an object or API response and get readable YAML for Kubernetes, Docker Compose, or CI config. Runs in your browser.",
    slug: "json-to-yaml",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "yaml-to-json": {
    name: "YAML to JSON Converter",
    seoTitle: "YAML to JSON Converter Online, Free and Private",
    description: "Paste YAML, get formatted JSON",
    seoDescription:
      "Convert YAML to JSON online. Paste a Kubernetes manifest, Compose file, or config and get formatted JSON, with anchors resolved. Runs in your browser.",
    slug: "yaml-to-json",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "json-to-csv": {
    name: "JSON to CSV Converter",
    seoTitle: "JSON to CSV Converter Online, Open in Excel",
    description: "Turn a JSON array of records into CSV",
    seoDescription:
      "Convert a JSON array to CSV online. Each object becomes a row and each key a column, ready for Excel or Google Sheets. Free, private, and instant.",
    slug: "json-to-csv",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "csv-to-json": {
    name: "CSV to JSON Converter",
    seoTitle: "CSV to JSON Converter Online, Free and Private",
    description: "Turn CSV rows into a JSON array",
    seoDescription:
      "Convert CSV to JSON online. The header row becomes the keys and each row becomes an object in a JSON array. Free, private, and runs in your browser.",
    slug: "csv-to-json",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "xml-to-json": {
    name: "XML to JSON Converter",
    seoTitle: "XML to JSON Converter Online, Free and Private",
    description: "Paste XML, get formatted JSON",
    seoDescription:
      "Convert XML to JSON online. Elements become keys and repeated elements become arrays, so you can work with XML feeds and SOAP responses as JSON.",
    slug: "xml-to-json",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "json-to-xml": {
    name: "JSON to XML Converter",
    seoTitle: "JSON to XML Converter Online, Free and Private",
    description: "Paste JSON, get indented XML",
    seoDescription:
      "Convert JSON to XML online. Keys become elements and arrays become repeated elements, with readable indentation. Free, private, and in your browser.",
    slug: "json-to-xml",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "toml-to-json": {
    name: "TOML to JSON Converter",
    seoTitle: "TOML to JSON Converter Online, Free and Private",
    description: "Paste TOML, get formatted JSON",
    seoDescription:
      "Convert TOML to JSON online. Paste pyproject.toml, Cargo.toml, or any TOML config and get formatted JSON with tables as nested objects. Runs in your browser.",
    slug: "toml-to-json",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "json-to-toml": {
    name: "JSON to TOML Converter",
    seoTitle: "JSON to TOML Converter Online, Free and Private",
    description: "Paste JSON, get a TOML config",
    seoDescription:
      "Convert JSON to TOML online. Nested objects become [tables] and lists of objects become [[arrays of tables]]. Free, private, and runs in your browser.",
    slug: "json-to-toml",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "yaml-to-toml": {
    name: "YAML to TOML Converter",
    seoTitle: "YAML to TOML Converter Online, Free and Private",
    description: "Paste YAML, get a TOML config",
    seoDescription:
      "Convert YAML to TOML online. Move a YAML config to TOML for Python, Rust, or Hugo projects, with nested maps turned into [tables]. Free and private.",
    slug: "yaml-to-toml",
    category: "Data formats",
    icon: "arrowUpDown",
  },
  "toml-to-yaml": {
    name: "TOML to YAML Converter",
    seoTitle: "TOML to YAML Converter Online, Free and Private",
    description: "Paste TOML, get readable YAML",
    seoDescription:
      "Convert TOML to YAML online. Paste a Cargo.toml, pyproject.toml, or other TOML config and get indented YAML back. Free, private, and in your browser.",
    slug: "toml-to-yaml",
    category: "Data formats",
    icon: "arrowUpDown",
  },
} as const;

export const tools = Object.values(TOOLS);

export const LANGUAGE_OPTIONS = [
  { country: "Estonia", language: "Estonian", locale: "ee-EE" },
  { country: "UAE", language: "English", locale: "en-AE" },
  { country: "Bangladesh", language: "English", locale: "en-BD" },
  { country: "UK", language: "English", locale: "en-GB" },
  { country: "Ghana", language: "English", locale: "en-GH" },
  { country: "Ireland", language: "English", locale: "en-IE" },
  { country: "India", language: "English", locale: "en-IN" },
  { country: "Myanmar", language: "English", locale: "en-MM" },
  { country: "Mauritius", language: "English", locale: "en-MU" },
  { country: "Nigeria", language: "English", locale: "en-NG" },
  { country: "Nepal", language: "English", locale: "en-NP" },
  { country: "USA", language: "English", locale: "en-US" },
  { country: "Philippines", language: "English", locale: "en-PH" },
  { country: "Argentina", language: "Spanish", locale: "es-AR" },
  { country: "España", language: "Spanish", locale: "es-ES" },
  { country: "Mexico", language: "Spanish", locale: "es-MX" },
  { country: "Iran", language: "Persian", locale: "fa-IR" },
  { country: "Belgium", language: "French", locale: "fr-BE" },
  { country: "France", language: "French", locale: "fr-FR" },
  { country: "Korean, Republic of India", language: "Hangul", locale: "ko-KR" },
  { country: "Brazil", language: "Portuguese", locale: "pt-BR" },
  { country: "Turkey", language: "Turkish", locale: "tr-TR" },
  { country: "Pakistan", language: "Urdu", locale: "ur-PK" },
];
