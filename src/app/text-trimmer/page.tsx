"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";

export default function TextTrimmer() {
  const [inputString, setInputString] = useState(
    "   This text has leading spaces\nThis text has trailing spaces   \n   And this has both   "
  );
  const [outputString, setOutputString] = useState("");
  const [removeLeading, setRemoveLeading] = useState(true);
  const [removeTrailing, setRemoveTrailing] = useState(false);

  const trimText = (
    text: string,
    trimLeading: boolean,
    trimTrailing: boolean
  ) => {
    if (!text) return "";
    if (!trimLeading && !trimTrailing) return text;

    // Process line by line
    const lines = text.split("\n");
    const processedLines = lines.map((line) => {
      let result = line;
      if (trimLeading) {
        result = result.replace(/^\s+/, "");
      }
      if (trimTrailing) {
        result = result.replace(/\s+$/, "");
      }
      return result;
    });

    return processedLines.join("\n");
  };

  useEffect(() => {
    setOutputString(trimText(inputString, removeLeading, removeTrailing));
  }, [inputString, removeLeading, removeTrailing]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["text-trimmer"]} />
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-2 lg:text-lg font-semibold">Input</h2>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            value={inputString}
            spellCheck={false}
            placeholder="Enter your text here..."
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="lg:text-lg font-semibold">Output</h2>
            <Clipboard text={outputString} />
          </div>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={outputString}
            readOnly
            spellCheck={false}
            placeholder="Your trimmed text will appear here..."
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-y-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={removeLeading}
            onChange={(e) => setRemoveLeading(e.target.checked)}
            className="w-4 h-4 mr-2 cursor-pointer"
          />
          <span className="text-sm font-medium">
            Remove leading spaces (left trim)
          </span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={removeTrailing}
            onChange={(e) => setRemoveTrailing(e.target.checked)}
            className="w-4 h-4 mr-2 cursor-pointer"
          />
          <span className="text-sm font-medium">
            Remove trailing spaces (right trim)
          </span>
        </label>
      </div>
    </div>
  );
}
