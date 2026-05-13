"use client";

import dynamic from "next/dynamic";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

const CodeEditor = dynamic(() => import("@/components/code-editor"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[380px] lg:h-[485px] w-full lg:w-[529px] bg-muted animate-pulse"
      role="status"
      aria-label="Loading editor"
    />
  ),
});

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  language: "javascript" | "json";
  placeholder: string;
};

export default function LazyCodeEditor({
  value,
  onChange,
  language,
  placeholder,
}: Props) {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  if (isEditorLoaded) {
    return (
      <CodeEditor
        value={value}
        onChange={onChange}
        language={language}
        placeholder={placeholder}
      />
    );
  }

  return (
    <textarea
      className="border border-border outline-none p-3 bg-background text-foreground font-mono text-sm w-full h-[380px] lg:w-[529px] lg:h-[485px]"
      value={value}
      spellCheck={false}
      placeholder={placeholder}
      onFocus={() => setIsEditorLoaded(true)}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
