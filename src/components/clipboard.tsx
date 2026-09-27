"use client";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  // Icon-only for dense rows; label names what is copied, such as "redirect_uri value"
  label?: string;
}

type Status = "idle" | "copied" | "failed";

const STATUS_MESSAGE: Record<Status, string> = {
  idle: "",
  copied: "Copied to clipboard",
  failed: "Copy failed. Select the text and press Ctrl+C.",
};

export default function Clipboard({ text, label }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleCopy() {
    setStatus((await copyToClipboard(text)) ? "copied" : "failed");
  }

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), status === "failed" ? 4000 : 2000);
    return () => clearTimeout(timer);
  }, [status]);

  const icon =
    status === "copied" ? (
      <CheckIcon aria-hidden="true" className="text-success" />
    ) : status === "failed" ? (
      <CrossCircledIcon aria-hidden="true" className="text-destructive" />
    ) : (
      <CopyIcon aria-hidden="true" />
    );

  return (
    <span className="inline-flex shrink-0">
      {label ? (
        <button
          type="button"
          onClick={handleCopy}
          disabled={!text}
          aria-label={`Copy ${label}`}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 lg:h-8 lg:w-8"
        >
          {icon}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleCopy}
          disabled={!text}
          className="inline-flex h-11 min-w-[9.5rem] cursor-pointer items-center justify-center gap-1.5 rounded border border-border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent lg:h-9"
        >
          {status === "copied" ? (
            <span className="inline-flex items-center gap-1.5 text-success">
              Copied {icon}
            </span>
          ) : status === "failed" ? (
            <span className="inline-flex items-center gap-1.5 text-destructive">
              Copy failed {icon}
            </span>
          ) : (
            <>Copy {icon}</>
          )}
        </button>
      )}
      {/* Separate live region: announcements on the button itself are unreliable */}
      <output className="sr-only">{STATUS_MESSAGE[status]}</output>
    </span>
  );
}
