"use client";
import ToolsHeader from "@/components/tools-header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_OPTIONS, TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ToWords } from "to-words";

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

      const toWords = new ToWords({
        localeCode,
        converterOptions: { currency, doNotAddOnly: true },
      });
      const words = toWords.convert(valueAsNumber);
      setWords(words);
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

      const toWords = new ToWords({
        localeCode,
        converterOptions: { currency, doNotAddOnly: true },
      });
      const words = toWords.convert(valueAsNumber);
      setWords(words);
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
            className="w-full lg:w-[614px] lg:h-[185px] border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
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
              <div className="flex py-2 lg:py-0 items-center gap-x-2 text-sm border border-b-0 border-gray-300 rounded px-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  id="currency"
                  name="currency"
                  checked={currency}
                  onChange={() => setCurrency(!currency)}
                />
                <label htmlFor="currency">Show Currency</label>
              </div>
              <Select onValueChange={setLocaleCode} value={localeCode}>
                <SelectTrigger className="w-[200px] border border-b-0 border-gray-300 rounded px-2 hover:bg-gray-100 text-sm">
                  <SelectValue placeholder="Select Locale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="font-[family-name:var(--font-geist-sans)]">
                    <SelectLabel className="text-sm">Select a Locale</SelectLabel>
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <SelectItem key={lang.locale} value={lang.locale}>
                        {lang.country}{" "}
                        <span className="text-gray-600">
                          ({lang.language}, {lang.locale})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={() => {
                copyToClipboard(words);
                setIsCopied(true);
              }}
              type="button"
              className="cursor-pointer border border-b-0 border-gray-300 rounded p-2 hover:bg-gray-100 text-sm"
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
            className="w-full lg:w-[614px] lg:h-[185px] border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={words}
            readOnly
            placeholder="Words will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
