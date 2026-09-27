"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { type RupeeAmount, rupeesInWords } from "@/lib/rupees.ts";
import { useState } from "react";

const ROWS: { key: keyof RupeeAmount; label: string }[] = [
  { key: "words", label: "In words" },
  { key: "figures", label: "In figures" },
];

function convert(input: string): { amount?: RupeeAmount; error?: string } {
  if (!input.trim()) return {};
  try {
    return { amount: rupeesInWords(input) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

export default function RupeesInWords() {
  const [input, setInput] = useState("12,50,000.75");
  // Synchronous, so the prerendered HTML already has the result for the default amount
  const { amount, error } = convert(input);

  return (
    <div className="w-full max-w-3xl">
      <ToolsHeader tool={TOOLS["rupees-in-words"]} />
      <div className="mt-20">
        <label htmlFor="amount" className="mb-2 block text-lg font-semibold">
          Amount in rupees
        </label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          className="w-full rounded border border-border p-3 font-mono text-lg dark:bg-input/30"
          value={input}
          placeholder="12,50,000.75"
          onChange={(e) => setInput(e.target.value)}
        />
        {error && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      {amount && (
        <dl className="mt-8 flex flex-col gap-6">
          {ROWS.map(({ key, label }) => (
            <div key={key}>
              <div className="mb-2 flex items-center justify-between">
                <dt className="shrink-0 text-lg font-semibold">{label}</dt>
                <Clipboard text={amount[key]} />
              </div>
              <dd className="rounded border border-border bg-muted p-3 font-mono text-sm text-foreground">
                {amount[key]}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
