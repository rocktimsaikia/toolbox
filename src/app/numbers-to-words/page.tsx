"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import ToolError, { errorProps } from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import { LANGUAGE_OPTIONS, TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";

async function convertNumberToWords(
  value: number,
  localeCode: string,
  currency: boolean,
) {
  const { ToWords } = await import("to-words");
  const toWords = new ToWords({
    localeCode,
    converterOptions: { currency, doNotAddOnly: true },
  });
  return toWords.convert(value);
}

export default function NumbersToWords() {
  const [numbers, setNumbers] = useState<string>("12345");
  // Precomputed for the default input so the server HTML has the output (faster LCP);
  // the effect recomputes the same value after hydration. Update both together.
  const [words, setWords] = useState("Twelve Thousand Three Hundred Forty Five");
  const [error, setError] = useState("");
  const [localeCode, setLocaleCode] = useState("en-US");
  const [currency, setCurrency] = useState(false);

  useEffect(() => {
    if (!numbers) {
      setWords("");
      return;
    }

    const { sanitized, hasInvalidChars } = sanitizeNumber(numbers);

    if (hasInvalidChars) {
      setError(
        "Use digits only, with commas, one decimal point, and a minus sign at the start if needed.",
      );
      setWords("");
      return;
    }

    try {
      const valueAsNumber = Number.parseFloat(sanitized);

      if (Number.isNaN(valueAsNumber)) {
        setError("Enter a number, such as 12345 or 99.5.");
        setWords("");
        return;
      }

      convertNumberToWords(valueAsNumber, localeCode, currency)
        .then((words) => {
          setWords(words);
          setError("");
        })
        .catch(() => {
          setError("This number can't be spelled out. Try a smaller number.");
          setWords("");
        });
      setError("");
    } catch (err) {
      setError("This number can't be spelled out. Try a smaller number.");
      setWords("");
    }
  }, [numbers, localeCode, currency]);

  const sanitizeNumber = (
    input: string,
  ): { sanitized: string; hasInvalidChars: boolean } => {
    // Check if input contains any non-numeric characters except for one decimal point and minus sign
    const hasInvalidChars =
      /[^0-9.,-]/.test(input) || // Any character that's not a digit, comma, dot, or minus
      (input.match(/\./g) || []).length > 1 || // More than one decimal point
      (input.match(/-/g) || []).length > 1 || // More than one minus
      (input.includes("-") && !input.startsWith("-")); // Minus not at the start

    // Allow numbers, one decimal point, and negative sign at the start
    const sanitized = input
      .replace(/[^0-9.-]/g, "") // Remove all non-numeric characters except . and -
      .replace(/(\..*)\./g, "$1") // Remove all but the first decimal point
      .replace(/(?!^)-/g, ""); // Remove all hyphens that are not at the start

    // If there's a negative sign not at the start, remove it
    if (sanitized.indexOf("-") > 0) {
      return { sanitized: sanitized.replace(/-/g, ""), hasInvalidChars };
    }
    return { sanitized, hasInvalidChars };
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNumbers(value);

    if (value === "") {
      setError("");
      setWords("");
      return;
    }

    const { sanitized, hasInvalidChars } = sanitizeNumber(value);

    if (hasInvalidChars) {
      setError(
        "Use digits only, with commas, one decimal point, and a minus sign at the start if needed.",
      );
      setWords("");
      return;
    }

    try {
      const valueAsNumber = Number.parseFloat(sanitized);
      if (Number.isNaN(valueAsNumber)) {
        setError("Enter a number, such as 12345 or 99.5.");
        setWords("");
        return;
      }

      convertNumberToWords(valueAsNumber, localeCode, currency)
        .then((words) => {
          setWords(words);
          setError("");
        })
        .catch(() => {
          setError("This number can't be spelled out. Try a smaller number.");
          setWords("");
        });
      setError("");
    } catch (err) {
      setError("This number can't be spelled out. Try a smaller number.");
      setWords("");
    }
  };

  return (
    <div>
      <ToolsHeader tool={TOOLS["numbers-to-words"]} />
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 lg:min-h-9">
          <input
            type="checkbox"
            name="currency"
            checked={currency}
            onChange={() => setCurrency(!currency)}
            className="h-4 w-4"
          />
          Show currency
        </label>
        <div className="flex items-center gap-2">
          <label htmlFor="locale" className="text-muted-foreground">
            Locale
          </label>
          <select
            id="locale"
            value={localeCode}
            onChange={(event) => setLocaleCode(event.target.value)}
            className="h-11 rounded border border-border bg-background px-2 text-sm hover:bg-muted lg:h-9"
          >
            {LANGUAGE_OPTIONS.map((lang) => (
              <option key={lang.locale} value={lang.locale}>
                {lang.country} ({lang.language}, {lang.locale})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-6">
        <div className="flex w-full flex-col items-start lg:w-auto">
          <PanelHeader htmlFor="numbers-input" label="Number" />
          <textarea
            id="numbers-input"
            {...errorProps("numbers-error", !!error)}
            className="w-full lg:w-[530px] lg:h-[185px] border border-border rounded p-3 resize-none dark:bg-input/30 font-mono text-sm"
            onChange={handleOnChange}
            value={numbers}
            spellCheck={false}
            placeholder="Add numbers here…"
          />
          {error && <ToolError id="numbers-error" message={error} />}
        </div>
        <div className="flex w-full flex-col items-start lg:w-auto">
          <PanelHeader id="words-output" label="In words">
            <Clipboard text={words} />
          </PanelHeader>
          <textarea
            aria-labelledby="words-output"
            className="w-full lg:w-[530px] lg:h-[185px] border border-border rounded p-3 resize-none bg-muted text-foreground cursor-default font-mono text-sm"
            value={words}
            readOnly
            placeholder="Words will appear here…"
          />
        </div>
      </div>
    </div>
  );
}
