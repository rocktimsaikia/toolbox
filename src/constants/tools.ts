import type { Icons } from "@/components/ui/icons";

export type Slug = keyof typeof TOOLS;

// Homepage groups, in display order
export const CATEGORIES = [
  "Convert",
  "Encode & decode",
  "Text",
  "Generate",
  "Web",
] as const;

export interface Tool {
  name: string;
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
    description: "Paste JSON or a JS object, get TypeScript types",
    seoDescription:
      "Paste a JavaScript object or JSON and get TypeScript types instantly. A free online JSON to TypeScript converter that runs entirely in your browser.",
    slug: "json-to-ts",
    category: "Convert",
    icon: "json",
  },
  "numbers-to-words": {
    name: "Numbers to Words",
    description: "Spell out numbers, with currency mode and 23 locales",
    seoDescription:
      "Convert numbers to words online, with optional currency and locale formats for cheques, invoices, and legal documents. Free, fast, and instant.",
    slug: "numbers-to-words",
    category: "Convert",
    icon: "hash",
  },
  "password-generator": {
    name: "Password Generator",
    description: "Pick length and character sets, generated on your device",
    seoDescription:
      "Generate strong random passwords in your browser. Pick the length and mix of uppercase, lowercase, numbers, and symbols. Nothing leaves your device.",
    slug: "password-generator",
    category: "Generate",
    icon: "key",
  },
  "base64-converter": {
    name: "Base64 Converter",
    description: "Text to Base64 and back, with UTF-8 and URL-safe input",
    seoDescription:
      "Encode text to Base64 or decode Base64 back to readable text, instantly and in your browser. A free online Base64 encoder and decoder with no sign-up.",
    slug: "base64-converter",
    category: "Encode & decode",
    icon: "arrowUpDown",
  },
  "url-encoder-decoder": {
    name: "URL Encoder/Decoder",
    description: "Percent-encode text for URLs, or decode it back",
    seoDescription:
      "Percent-encode text for safe use in URLs, or decode encoded URL strings back to readable text. A free online URL encoder and decoder with no sign-up.",
    slug: "url-encoder-decoder",
    category: "Encode & decode",
    icon: "link",
  },
  "url-parser": {
    name: "URL Parser",
    description:
      "Break a messy URL into readable parts: host, path, and every query param",
    seoDescription:
      "Paste a long or messy URL to see its protocol, host, path segments, and every query parameter decoded, including Base64 and JWT values. Free and private.",
    slug: "url-parser",
    category: "Web",
    icon: "listTree",
  },
  "whats-my-ip": {
    name: "What's My IP",
    description: "The public address websites see, copied in one click",
    seoDescription:
      "See your public IP address instantly, the same address websites see when you connect. Free, fast, and no sign-up required. Copy it in one click.",
    slug: "whats-my-ip",
    category: "Web",
    icon: "wifi",
  },
  "html-escape": {
    name: "HTML Escape",
    description: "Turn <, >, & and quotes into entities, or back",
    seoDescription:
      "Escape special characters like <, >, &, and quotes into HTML entities, or unescape entities back to plain text. A free online HTML escape tool.",
    slug: "html-escape",
    category: "Encode & decode",
    icon: "code",
  },
  "line-break-remover": {
    name: "Line Break Remover",
    description: "Unwrap text from PDFs and emails, keep paragraphs",
    seoDescription:
      "Remove line breaks from text pasted from PDFs, emails, or docs, with an option to keep paragraph breaks. A free online line break remover.",
    slug: "line-break-remover",
    category: "Text",
    icon: "alignLeft",
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum Generator",
    description: "Set paragraphs, sentences, and words per sentence",
    seoDescription:
      "Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words for mockups and layouts. Copy it in one click. Free and instant.",
    slug: "lorem-ipsum",
    category: "Generate",
    icon: "fileText",
  },
  "blank-character": {
    name: "Blank Character Copy",
    description: "Invisible characters for empty names in games and apps",
    seoDescription:
      "Copy invisible blank characters for empty names, messages, and text fields in games and apps. One click to copy, free and instant, no sign-up needed.",
    slug: "blank-character",
    category: "Text",
    icon: "copy",
  },
  "cron-expression-generator": {
    name: "Cron Expression Generator",
    description: "Build a cron schedule or read one in plain English",
    seoDescription:
      "Build cron expressions and read any cron schedule in plain English. A free online cron expression generator and explainer for developers.",
    slug: "cron-expression-generator",
    category: "Generate",
    icon: "clock",
  },
  yamlc: {
    name: "Data Format Converter",
    description: "Convert between JSON, YAML, TOML, XML, and CSV",
    seoDescription:
      "Convert data between JSON, YAML, TOML, XML, and CSV in your browser. Paste one format and pick another to convert instantly. Free and private.",
    slug: "yamlc",
    category: "Convert",
    icon: "arrowUpDown",
  },
  "text-trimmer": {
    name: "Text Trimmer",
    description: "Strip leading and trailing whitespace from every line",
    seoDescription:
      "Remove leading and trailing whitespace from every line of text, or from just one side. A free online text trimmer for cleaning pasted text and code.",
    slug: "text-trimmer",
    category: "Text",
    icon: "scissors",
  },
  "find-replace": {
    name: "Find and Replace Text",
    description: "Case-sensitive and whole-word matching",
    seoDescription:
      "Find and replace text online with case-sensitive and whole-word matching. Paste your text, set the search and replacement, and copy the result.",
    slug: "find-replace",
    category: "Text",
    icon: "search",
  },
  "case-converter": {
    name: "Case Converter",
    description: "camelCase, snake_case, kebab-case, and 6 more",
    seoDescription:
      "Convert text to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case, UPPER or lower case. Free and instant.",
    slug: "case-converter",
    category: "Text",
    icon: "type",
  },
  "color-converter": {
    name: "Color Code Converter",
    description: "HEX, RGB, RGBA, and HSL, with a live preview",
    seoDescription:
      "Convert colors between HEX, RGB, RGBA, and HSL with a live preview. A free online color code converter for designers and developers.",
    slug: "color-converter",
    category: "Convert",
    icon: "palette",
  },
  "word-counter": {
    name: "Word Counter",
    description: "Words, characters, sentences, paragraphs, and reading time",
    seoDescription:
      "Count words, characters, sentences, and paragraphs, and estimate reading time as you type. A free online word counter that runs in your browser.",
    slug: "word-counter",
    category: "Text",
    icon: "fileText",
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
