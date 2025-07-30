"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Switch } from "@/components/ui/switch";
import { TOOLS } from "@/constants/tools";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function LineBreakRemover() {
  const [inputString, setInputString] = useState(`If
you
are
reading
this

Then the tool
should remove
single line breaks
but keep this as
a separate paragraph.`);
  const [outputString, setOutputString] = useState("");
  const [preserveParagraphs, setPreserveParagraphs] = useState(true);

  const removeLineBreaks = (text: string, keepParagraphs: boolean) => {
    if (!text.trim()) return "";

    // Handle different line ending types (Windows \r\n, Unix \n, old Mac \r)
    const normalizedText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    if (!keepParagraphs) {
      // Remove ALL line breaks - just replace everything with spaces
      return normalizedText.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    }

    // Split text into paragraphs (look for double line breaks or more)
    const paragraphs = normalizedText.split(/\n\s*\n+/);

    // Process each paragraph
    const processedParagraphs = paragraphs
      .map((paragraph) => {
        // Replace all single line breaks with spaces
        return paragraph.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
      })
      .filter((paragraph) => paragraph.length > 0);

    // If no paragraphs were found (no double line breaks), treat entire text as one paragraph
    if (processedParagraphs.length === 1) {
      return processedParagraphs[0];
    }

    // Join paragraphs back with double line breaks
    return processedParagraphs.join("\n\n");
  };

  useEffect(() => {
    setOutputString(removeLineBreaks(inputString, preserveParagraphs));
  }, [inputString, preserveParagraphs]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["line-break-remover"]} />
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-2 lg:text-lg font-semibold">Input</h2>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            value={inputString}
            spellCheck={false}
            placeholder="Paste your text with line breaks here..."
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
            placeholder="Your text without line breaks will appear here..."
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <label
          className={clsx("mr-2 text-sm font-medium", {
            "text-gray-400": preserveParagraphs,
            "text-gray-900": !preserveParagraphs,
          })}
        >
          Remove All
        </label>
        <Switch
          id="preserve-paragraphs"
          checked={preserveParagraphs}
          onCheckedChange={setPreserveParagraphs}
        ></Switch>
        <label
          className={clsx("ml-2 text-sm font-medium", {
            "text-gray-400": !preserveParagraphs,
            "text-gray-900": preserveParagraphs,
          })}
        >
          Preserve Paragraphs
        </label>
      </div>
    </div>
  );
}
