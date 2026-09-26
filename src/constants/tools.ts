import type { Icons } from "@/components/ui/icons";

export type Slug = keyof typeof TOOLS;

export interface Tool {
  name: string;
  description: string;
  // Longer copy for the meta description (aim for 120-155 characters)
  seoDescription: string;
  slug: Slug;
  hide?: boolean;
  icon: keyof typeof Icons;
}

export const TOOLS = {
  "json-to-ts": {
    name: "JavaScript/JSON to TypeScript Types",
    description: "Convert JavaScript/JSON to TypeScript types",
    seoDescription:
      "Paste a JavaScript object or JSON and get TypeScript types instantly. A free online JSON to TypeScript converter that runs entirely in your browser.",
    slug: "json-to-ts",
    icon: "json",
  },
  "numbers-to-words": {
    name: "Numbers to Words",
    description: "Convert numbers to words",
    seoDescription:
      "Convert numbers to words online, with optional currency and locale formats for cheques, invoices, and legal documents. Free, fast, and instant.",
    slug: "numbers-to-words",
    icon: "hash",
  },
  "password-generator": {
    name: "Password Generator",
    description: "Generate secure passwords",
    seoDescription:
      "Generate strong random passwords in your browser. Pick the length and mix of uppercase, lowercase, numbers, and symbols. Nothing leaves your device.",
    slug: "password-generator",
    icon: "key",
  },
  "base64-converter": {
    name: "Base64 Converter",
    description: "Encode and decode Base64 strings",
    seoDescription:
      "Encode text to Base64 or decode Base64 back to readable text, instantly and in your browser. A free online Base64 encoder and decoder with no sign-up.",
    slug: "base64-converter",
    icon: "arrowUpDown",
  },
  "url-encoder-decoder": {
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs",
    seoDescription:
      "Percent-encode text for safe use in URLs, or decode encoded URL strings back to readable text. A free online URL encoder and decoder with no sign-up.",
    slug: "url-encoder-decoder",
    icon: "link",
  },
  "url-parser": {
    name: "URL Parser",
    description:
      "Break a messy URL into readable parts: host, path, and every query param",
    seoDescription:
      "Paste a long or messy URL to see its protocol, host, path segments, and every query parameter decoded, including Base64 and JWT values. Free and private.",
    slug: "url-parser",
    icon: "listTree",
  },
  "whats-my-ip": {
    name: "What's My IP",
    description: "Get your public IP address",
    seoDescription:
      "See your public IP address instantly, the same address websites see when you connect. Free, fast, and no sign-up required. Copy it in one click.",
    slug: "whats-my-ip",
    icon: "wifi",
  },
  "html-escape": {
    name: "HTML Escape",
    description: "Escape HTML entities",
    seoDescription:
      "Escape special characters like <, >, &, and quotes into HTML entities, or unescape entities back to plain text. A free online HTML escape tool.",
    slug: "html-escape",
    icon: "code",
  },
  "line-break-remover": {
    name: "Line Break Remover",
    description: "Remove line breaks from text",
    seoDescription:
      "Remove line breaks from text pasted from PDFs, emails, or docs, with an option to keep paragraph breaks. A free online line break remover.",
    slug: "line-break-remover",
    icon: "alignLeft",
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum Generator",
    description: "Generate Lorem Ipsum placeholder text",
    seoDescription:
      "Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words for mockups and layouts. Copy it in one click. Free and instant.",
    slug: "lorem-ipsum",
    icon: "fileText",
  },
  "blank-character": {
    name: "Blank Character Copy",
    description: "Copy invisible blank characters",
    seoDescription:
      "Copy invisible blank characters for empty names, messages, and text fields in games and apps. One click to copy, free and instant, no sign-up needed.",
    slug: "blank-character",
    icon: "copy",
  },
  "cron-expression-generator": {
    name: "Cron Expression Generator",
    description: "Generate and understand cron expressions (the human way)",
    seoDescription:
      "Build cron expressions and read any cron schedule in plain English. A free online cron expression generator and explainer for developers.",
    slug: "cron-expression-generator",
    icon: "clock",
  },
  yamlc: {
    name: "Data Format Converter",
    description:
      "Convert data between different formats including JSON, YAML, TOML, XML, and CSV",
    seoDescription:
      "Convert data between JSON, YAML, TOML, XML, and CSV in your browser. Paste one format and pick another to convert instantly. Free and private.",
    slug: "yamlc",
    icon: "arrowUpDown",
  },
  "text-trimmer": {
    name: "Text Trimmer",
    description: "Remove leading and trailing whitespace from text",
    seoDescription:
      "Remove leading and trailing whitespace from every line of text, or from just one side. A free online text trimmer for cleaning pasted text and code.",
    slug: "text-trimmer",
    icon: "scissors",
  },
  "find-replace": {
    name: "Find and Replace Text",
    description: "Find and replace text with case sensitivity and whole word options",
    seoDescription:
      "Find and replace text online with case-sensitive and whole-word matching. Paste your text, set the search and replacement, and copy the result.",
    slug: "find-replace",
    icon: "search",
  },
  "case-converter": {
    name: "Case Converter",
    description: "Convert text between different casing formats",
    seoDescription:
      "Convert text to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case, UPPER or lower case. Free and instant.",
    slug: "case-converter",
    icon: "type",
  },
  "color-converter": {
    name: "Color Code Converter",
    description: "Convert colors between HEX, RGB, HSL, and RGBA formats",
    seoDescription:
      "Convert colors between HEX, RGB, RGBA, and HSL with a live preview. A free online color code converter for designers and developers.",
    slug: "color-converter",
    icon: "palette",
  },
  "word-counter": {
    name: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and reading time",
    seoDescription:
      "Count words, characters, sentences, and paragraphs, and estimate reading time as you type. A free online word counter that runs in your browser.",
    slug: "word-counter",
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
