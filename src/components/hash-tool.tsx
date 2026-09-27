"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import ToolsHeader from "@/components/tools-header";
import type { Tool } from "@/constants/tools";
import {
  ALGORITHMS,
  type Algorithm,
  type Hashes,
  hashBytes,
  hashText,
} from "@/lib/hash.ts";
import { CheckCircledIcon, Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type Props = {
  tool: Tool;
  sample: string;
  // Hashes of the sample, computed on the server so the prerendered page shows results
  initialHashes: Hashes;
  // The algorithm the page is about; listed first
  primary?: Algorithm;
};

type Source = { kind: "text" } | { kind: "file"; name: string; size: number };

const size = (bytes: number) =>
  bytes < 1024
    ? `${bytes} bytes`
    : bytes < 1024 ** 2
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / 1024 ** 2).toFixed(1)} MB`;

export default function HashTool({ tool, sample, initialHashes, primary }: Props) {
  const [text, setText] = useState(sample);
  const [source, setSource] = useState<Source>({ kind: "text" });
  const [hashes, setHashes] = useState<Hashes | null>(initialHashes);
  const [uppercase, setUppercase] = useState(false);
  const [expected, setExpected] = useState("");

  useEffect(() => {
    if (source.kind !== "text") return;
    let isCurrent = true;
    // The sample's hashes arrived with the page; only recompute once the text changes
    if (text === sample) {
      setHashes(initialHashes);
      return;
    }
    hashText(text).then((result) => {
      if (isCurrent) setHashes(result);
    });
    return () => {
      isCurrent = false;
    };
  }, [text, source, sample, initialHashes]);

  const hashFile = async (file: File) => {
    setSource({ kind: "file", name: file.name, size: file.size });
    setHashes(null);
    setHashes(await hashBytes(new Uint8Array(await file.arrayBuffer())));
  };

  const order = primary
    ? [primary, ...ALGORITHMS.filter((a) => a !== primary)]
    : ALGORITHMS;
  const show = (hex: string) => (uppercase ? hex.toUpperCase() : hex);
  const wanted = expected.trim().toLowerCase().replace(/\s/g, "");
  const match = wanted && hashes ? order.find((a) => hashes[a] === wanted) : undefined;

  return (
    <div className="max-w-3xl">
      <ToolsHeader tool={tool} />

      {source.kind === "text" ? (
        <>
          <PanelHeader htmlFor="hash-input" label="Text">
            <label className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded border border-border px-3 text-sm font-medium transition-colors hover:bg-muted has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand lg:h-9">
              <UploadIcon aria-hidden="true" />
              Hash a file
              <input
                type="file"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) hashFile(file);
                  e.target.value = "";
                }}
              />
            </label>
          </PanelHeader>
          <textarea
            id="hash-input"
            className="h-32 w-full resize-y rounded border border-border p-3 font-mono text-sm dark:bg-input/30"
            value={text}
            spellCheck={false}
            placeholder="Type or paste text to hash…"
            onChange={(e) => setText(e.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Hashed as UTF-8, exactly as typed, including spaces and line breaks.
          </p>
        </>
      ) : (
        <>
          <PanelHeader label="File">
            <button
              type="button"
              onClick={() => setSource({ kind: "text" })}
              className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded border border-border px-3 text-sm font-medium transition-colors hover:bg-muted lg:h-9"
            >
              <Cross2Icon aria-hidden="true" />
              Back to text
            </button>
          </PanelHeader>
          <p className="rounded border border-border p-3 font-mono text-sm break-all">
            {source.name}{" "}
            <span className="text-muted-foreground">({size(source.size)})</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Read and hashed on your device. The file is never uploaded.
          </p>
        </>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <p className="text-base font-semibold lg:text-lg">Hashes</p>
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium lg:min-h-9">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="h-4 w-4 cursor-pointer"
          />
          Uppercase
        </label>
      </div>
      <dl
        className="mt-2 divide-y divide-border rounded border border-border"
        aria-live="polite"
      >
        {order.map((algorithm) => {
          const hex = hashes?.[algorithm] ?? "";
          const isMatch = match === algorithm;
          return (
            <div
              key={algorithm}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-3 py-2 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:gap-x-4 ${isMatch ? "bg-success/10" : ""}`}
            >
              <dt
                className={`order-1 text-sm sm:order-none ${algorithm === primary ? "font-semibold" : "font-medium"}`}
              >
                {algorithm}
              </dt>
              {/* Mobile: name and copy share a line, the hash runs full width below */}
              <dd className="order-3 col-span-2 min-w-0 break-all font-mono text-sm sm:order-none sm:col-span-1">
                {hex ? (
                  show(hex)
                ) : (
                  <span className="text-muted-foreground">Hashing…</span>
                )}
                {isMatch && (
                  <span className="ml-2 inline-flex items-center gap-1 font-sans text-xs font-medium text-success">
                    <CheckCircledIcon aria-hidden="true" /> Matches
                  </span>
                )}
              </dd>
              <dd className="order-2 justify-self-end sm:order-none">
                <Clipboard text={show(hex)} label={`${algorithm} hash`} />
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-6">
        <PanelHeader htmlFor="hash-expected" label="Check against a hash" />
        <input
          id="hash-expected"
          type="text"
          value={expected}
          onChange={(e) => setExpected(e.target.value)}
          placeholder="Paste the checksum you expect, from any algorithm above"
          spellCheck={false}
          autoComplete="off"
          className="h-11 w-full rounded border border-border px-3 font-mono text-sm dark:bg-input/30 lg:h-9"
        />
        {wanted && hashes && (
          <p
            aria-live="polite"
            className={`mt-2 text-sm ${match ? "text-success" : "text-destructive"}`}
          >
            {match
              ? `Match: this is the ${match} hash of your ${source.kind === "file" ? "file" : "text"}.`
              : "No match. The input differs, or the checksum is from an algorithm not listed here."}
          </p>
        )}
      </div>
    </div>
  );
}
