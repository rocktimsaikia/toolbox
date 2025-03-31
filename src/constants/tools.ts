export type Tool = {
  name: string;
  description: string;
  path: string;
};
export const TOOLS: Tool[] = [
  {
    name: "Javascript Object to Typescript Types",
    description: "Extract typescript types from a javascript object",
    path: "/object-to-typescript",
  },
  {
    name: "JSON to Javascript Object",
    description: "Convert JSON to javascript object",
    path: "/json-to-javascript",
  },
  {
    name: "Numbers to Words",
    description: "Convert numbers to human readable words (Currency supported)",
    path: "/numbers-to-words",
  },
  {
    name: "Password Generator",
    description: "Generate a random password",
    path: "/password-generator",
  },
  {
    name: "Base64 Converter",
    description: "Encode and Decode base64 strings",
    path: "/base64-converter",
  },
];

export const LANGUAGE_OPTIONS = [
  { country: "Estonia", language: "Estonian", locale: "ee-EE" },
  { country: "UAE", language: "English", locale: "en-AE" },
  { country: "Bangladesh", language: "English", locale: "en-BD" },
  { country: "UK", language: "English", locale: "en-GB" },
  { country: "Ghana", language: "English", locale: "en-GH" },
  { country: "Ireland", language: "English", locale: "en-IE" },
  { country: "India", language: "English", locale: "en-IN" }, // (default)
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
