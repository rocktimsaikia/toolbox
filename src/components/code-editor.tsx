"use client";

import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import type { Dispatch, SetStateAction } from "react";
import { useTheme } from "@/lib/theme";

// Define the supported languages
const LANGUAGE_ENTRIES = [
  ["javascript", javascript({ jsx: true })],
  ["json", json()],
] as const;

// Create a map of language extensions
const languageMap = new Map(LANGUAGE_ENTRIES);

// Extract the language keys as a union type
type Language = (typeof LANGUAGE_ENTRIES)[number][0];

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  language: Language;
  placeholder: string;
};
export default function TextAreaCodeEditor({
  value,
  onChange,
  language,
  placeholder,
}: Props) {
  const extension = languageMap.get(language);
  const theme = useTheme();
  return (
    <CodeMirror
      value={value}
      className="h-full w-full"
      extensions={[extension as any]}
      placeholder={placeholder}
      onChange={onChange}
      theme={theme}
    />
  );
}
