"use client";
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
  const [numbers, setNumbers] = useState<string | number>(12345);
  const [words, setWords] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");
  const [localeCode, setLocaleCode] = useState("en-US");
  const [currency, setCurrency] = useState(false);

  useEffect(() => {
    // Reset all states when number is empty
    if (!numbers && numbers !== 0) {
      setWords("");
      setError("");
      return;
    }

    try {
      const toWords = new ToWords({
        localeCode,
        converterOptions: { currency, doNotAddOnly: true },
      });
      const words = toWords.convert(numbers as number);
      setWords(words);
    } catch (err) {
      setError("Invalid number syntax");
    }
  }, [numbers, localeCode, currency]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value === "") {
      setError("");
      setNumbers("");
      return;
    }

    // Check for NaN value and show error
    const valueAsNumber = Number.parseInt(value);
    if (Number.isNaN(valueAsNumber)) {
      return;
    }

    // Else reset error and set number
    setError("");
    setNumbers(valueAsNumber);
  };

  return (
    <div>
      <h1 className="text-center text-3xl">{TOOLS[2].name}</h1>
      <h2 className="text-center text-lg mt-2">{TOOLS[2].description}</h2>
      <div className="flex gap-x-6 justify-end items-end mt-20">
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">Numbers</h2>
          <textarea
            cols={60}
            rows={8}
            className="border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            onChange={handleOnChange}
            value={numbers}
            spellCheck={false}
            placeholder="Add numbers here..."
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-x-2 text-sm border border-b-0 border-gray-300 rounded px-2 hover:bg-gray-100">
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

            <button
              onClick={() => {
                copyToClipboard(words);
                setIsCopied(true);
              }}
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
            cols={70}
            rows={8}
            className="border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={words}
            readOnly
            placeholder="Words will appear here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
