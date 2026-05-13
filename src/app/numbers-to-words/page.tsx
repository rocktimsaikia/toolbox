"use client";
import ToolsHeader from "@/components/tools-header";
import { LANGUAGE_OPTIONS, TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
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
  const [words, setWords] = useState("");
  const [isCopied, setIsCopied] = useState(false);
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
      setError("Invalid characters in number");
      setWords("");
      return;
    }

    try {
      const valueAsNumber = Number.parseFloat(sanitized);

      if (Number.isNaN(valueAsNumber)) {
        setError("Invalid number");
        setWords("");
        return;
      }

      convertNumberToWords(valueAsNumber, localeCode, currency)
        .then((words) => {
          setWords(words);
          setError("");
        })
        .catch(() => {
          setError("Invalid number format");
          setWords("");
        });
      setError("");
    } catch (err) {
      setError("Invalid number format");
      setWords("");
    }
  }, [numbers, localeCode, currency]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

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
      setError("Invalid characters in number");
      setWords("");
      return;
    }

    try {
      const valueAsNumber = Number.parseFloat(sanitized);
      if (Number.isNaN(valueAsNumber)) {
        setError("Invalid number");
        setWords("");
        return;
      }

      convertNumberToWords(valueAsNumber, localeCode, currency)
        .then((words) => {
          setWords(words);
          setError("");
        })
        .catch(() => {
          setError("Invalid number format");
          setWords("");
        });
      setError("");
    } catch (err) {
      setError("Invalid number format");
      setWords("");
    }
  };

  return (
    <div>
      <ToolsHeader tool={TOOLS["numbers-to-words"]} />
      <div className="flex flex-col lg:flex-row gap-x-0 lg:gap-x-6 gap-y-5 justify-end items-end mt-20">
        <div className="flex flex-col items-start w-full">
          <h2 className="text-lg font-semibold">Numbers</h2>
          <textarea
            className="w-full lg:w-[614px] lg:h-[185px] border border-border rounded outline-none p-3 resize-none dark:bg-input/30 font-mono text-sm"
            onChange={handleOnChange}
            value={numbers}
            spellCheck={false}
            placeholder="Add numbers here..."
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <div className="flex flex-col lg:flex-row lg:gap-x-4">
              <div className="flex py-2 lg:py-0 items-center gap-x-2 text-sm border border-b-0 border-border rounded px-2 hover:bg-muted">
                <input
                  type="checkbox"
                  id="currency"
                  name="currency"
                  checked={currency}
                  onChange={() => setCurrency(!currency)}
                />
                <label htmlFor="currency">Show Currency</label>
              </div>
              <select
                value={localeCode}
                onChange={(event) => setLocaleCode(event.target.value)}
                className="w-[200px] border border-b-0 border-border rounded px-2 py-2 bg-background hover:bg-muted text-sm"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.locale} value={lang.locale}>
                    {lang.country} ({lang.language}, {lang.locale})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                copyToClipboard(words);
                setIsCopied(true);
              }}
              type="button"
              className="cursor-pointer border border-b-0 border-border rounded p-2 hover:bg-muted text-sm"
            >
              {isCopied ? (
                <div className="text-green-600">
                  Copied <CheckIcon className="inline-block" />
                </div>
              ) : (
                <>
                  Copy to clipboard <CopyIcon className="inline-block" />
                </>
              )}
            </button>
          </div>
          <textarea
            className="w-full lg:w-[614px] lg:h-[185px] border border-border rounded outline-none p-3 resize-none bg-muted text-foreground cursor-default font-mono text-sm"
            value={words}
            readOnly
            placeholder="Words will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
