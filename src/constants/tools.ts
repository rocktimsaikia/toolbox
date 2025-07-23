import type { Icons } from "@/components/ui/icons";

export type Slug = keyof typeof TOOLS;

export interface Tool {
  name: string;
  description: string;
  slug: Slug;
  hide?: boolean;
  icon: keyof typeof Icons;
}

export const TOOLS = {
  "json-to-ts": {
    name: "JavaScript/JSON to TypeScript Types",
    description: "Convert JavaScript/JSON to TypeScript types",
    slug: "json-to-ts",
    icon: "type",
  },
  "numbers-to-words": {
    name: "Numbers to Words",
    description: "Convert numbers to words",
    slug: "numbers-to-words",
    icon: "hash",
  },
  "password-generator": {
    name: "Password Generator",
    description: "Generate secure passwords",
    slug: "password-generator",
    icon: "key",
  },
  "base64-converter": {
    name: "Base64 Converter",
    description: "Encode and decode Base64 strings",
    slug: "base64-converter",
    icon: "arrowUpDown",
  },
  "url-encoder-decoder": {
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs",
    slug: "url-encoder-decoder",
    icon: "link",
  },
  "whats-my-ip": {
    name: "What's My IP",
    description: "Get your public IP address",
    slug: "whats-my-ip",
    icon: "wifi",
  },
  "html-escape": {
    name: "HTML Escape",
    description: "Escape HTML entities",
    slug: "html-escape",
    icon: "code",
  },
  "line-break-remover": {
    name: "Line Break Remover",
    description: "Remove line breaks from text",
    slug: "line-break-remover",
    icon: "alignLeft",
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum Generator",
    description: "Generate Lorem Ipsum placeholder text",
    slug: "lorem-ipsum",
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
