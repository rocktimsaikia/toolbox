"use client";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ToWords } from "to-words";

export default function NumbersToWords() {
  const [numbers, setNumbers] = useState(12345);
  const [words, setWords] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const toWords = new ToWords();
      const words = toWords.convert(numbers);
      setWords(words);
    } catch (err) {
      setError("Invalid number syntax");
    }
  }, [numbers]);

  return (
    <div>
      <h1 className="text-center text-3xl">{TOOLS[2].name}</h1>
      <h2 className="text-center text-lg mt-2">{TOOLS[2].description}</h2>
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start">
          <h2 className="mb-2 text-lg font-semibold">Numbers</h2>
          <textarea
            cols={60}
            rows={10}
            className="border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            onChange={(e) => setNumbers(Number.parseInt(e.target.value))}
            value={numbers}
            spellCheck={false}
            placeholder="Paste your JavaScript object here..."
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold">Words</h2>
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
            cols={60}
            rows={10}
            className="border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={words}
            readOnly
            placeholder="TypeScript type will appear here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
