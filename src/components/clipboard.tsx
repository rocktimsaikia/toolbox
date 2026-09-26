"use client";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface Props {
  text: string;
}

export default function Clipboard({ text }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyPassword() {
    copyToClipboard(text);
    setIsCopied(true);
  }

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <div className="flex justify-end w-full">
      <button
        type="button"
        onClick={handleCopyPassword}
        aria-live="polite"
        className="cursor-pointer border border-b-0 border-border rounded p-2 hover:bg-muted text-sm min-w-[10.5rem]"
      >
        {isCopied ? (
          <span className="text-success">
            Copied <CheckIcon className="inline-block" />
          </span>
        ) : (
          <>
            Copy to clipboard <CopyIcon className="inline-block" />
          </>
        )}
      </button>
    </div>
  );
}
