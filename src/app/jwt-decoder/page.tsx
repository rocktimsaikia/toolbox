"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { type DecodedJwt, TIME_CLAIMS, decodeJwt, expiryStatus } from "@/lib/jwt.ts";
import clsx from "clsx";
import { useState } from "react";

// Sample claims only; the signature is made up, which is fine since nothing is verified
const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFubiBFeGFtcGxlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY3MjI1NjAwLCJleHAiOjE5MjQ5OTIwMDB9.Tq1Qh7s3kz0Jm8cV4yEwXn2pR6fLbA9dGuHiK5oMtZE";

// UTC keeps the prerendered HTML and the browser in agreement
const formatTime = (seconds: number) =>
  `${new Date(seconds * 1000).toISOString().replace("T", " ").slice(0, 19)} UTC`;

const STATUS = {
  valid: { label: "Not expired", className: "border-success/40 text-success" },
  expired: { label: "Expired", className: "border-destructive/40 text-destructive" },
  "not-yet-valid": {
    label: "Not valid yet",
    className: "border-destructive/40 text-destructive",
  },
  "no-expiry": {
    label: "No expiry set",
    className: "border-border text-muted-foreground",
  },
} as const;

function decode(input: string): { jwt?: DecodedJwt; error?: string } {
  if (!input.trim()) return {};
  try {
    return { jwt: decodeJwt(input) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

function JsonBlock({ title, value }: { title: string; value: object }) {
  const text = JSON.stringify(value, null, 2);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-lg font-semibold">{title}</p>
        <Clipboard text={text} />
      </div>
      <pre className="overflow-x-auto rounded border border-border bg-muted p-3 font-mono text-sm text-foreground">
        {text}
      </pre>
    </div>
  );
}

export default function JwtDecoder() {
  const [input, setInput] = useState(SAMPLE);
  // Decoding is cheap and synchronous, so derive it instead of syncing state in an effect
  const { jwt, error } = decode(input);
  const times = jwt
    ? (Object.keys(TIME_CLAIMS) as (keyof typeof TIME_CLAIMS)[]).filter(
        (claim) => typeof jwt.payload[claim] === "number",
      )
    : [];
  const status = jwt ? STATUS[expiryStatus(jwt.payload)] : null;

  return (
    <div className="w-full max-w-4xl">
      <ToolsHeader tool={TOOLS["jwt-decoder"]} />
      <div className="mt-20">
        <label htmlFor="jwt-input" className="mb-2 block text-lg font-semibold">
          Token
        </label>
        <textarea
          id="jwt-input"
          className="h-32 w-full resize-y break-all rounded border border-border p-3 font-mono text-sm dark:bg-input/30"
          value={input}
          spellCheck={false}
          placeholder="Paste a JWT (eyJ…), with or without the Bearer prefix"
          onChange={(e) => setInput(e.target.value)}
        />
        {error && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      {jwt && status && (
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span
              className={clsx("rounded border px-2 py-0.5 font-medium", status.className)}
            >
              {status.label}
            </span>
            {times.map((claim) => (
              <span key={claim} className="text-muted-foreground">
                {TIME_CLAIMS[claim]}{" "}
                <span className="font-mono text-foreground">
                  {formatTime(jwt.payload[claim] as number)}
                </span>
              </span>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <JsonBlock title="Header" value={jwt.header} />
            <JsonBlock title="Payload" value={jwt.payload} />
          </div>
          <div>
            <p className="mb-2 text-lg font-semibold">Signature</p>
            <p className="break-all rounded border border-border bg-muted p-3 font-mono text-sm text-foreground">
              {jwt.signature || "(empty: this token is unsigned)"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Not verified. Decoding only reads the token, so anyone could have edited
              these claims. Your server must check the signature before trusting them.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
