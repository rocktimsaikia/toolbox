"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";

export default function FindReplace() {
  const [inputString, setInputString] = useState(
    "Hello World! Welcome to the world of programming.\nThis is a simple find and replace tool.",
  );
  const [findText, setFindText] = useState("world");
  const [replaceText, setReplaceText] = useState("universe");
  const [outputString, setOutputString] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  const findAndReplace = (
    text: string,
    find: string,
    replace: string,
    matchCase: boolean,
    matchWholeWord: boolean,
  ) => {
    if (!text || !find) return text;

    try {
      let pattern = find;

      // Escape special regex characters
      pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Add word boundary if whole word matching is enabled
      if (matchWholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const flags = matchCase ? "g" : "gi";
      const regex = new RegExp(pattern, flags);

      return text.replace(regex, replace);
    } catch (error) {
      return text;
    }
  };

  useEffect(() => {
    setOutputString(
      findAndReplace(inputString, findText, replaceText, caseSensitive, wholeWord),
    );
  }, [inputString, findText, replaceText, caseSensitive, wholeWord]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["find-replace"]} />
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-2 lg:text-lg font-semibold">Input Text</h2>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            value={inputString}
            spellCheck={false}
            placeholder="Enter your text here..."
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
          <div className="mt-4 w-full space-y-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Find:</label>
              <input
                type="text"
                className="w-full lg:w-[530px] border border-gray-300 rounded outline-none p-2 font-mono text-sm"
                value={findText}
                placeholder="Text to find..."
                onChange={(e) => setFindText(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Replace with:</label>
              <input
                type="text"
                className="w-full lg:w-[530px] border border-gray-300 rounded outline-none p-2 font-mono text-sm"
                value={replaceText}
                placeholder="Replacement text..."
                onChange={(e) => setReplaceText(e.target.value)}
              />
            </div>
          </div>
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
            placeholder="Your replaced text will appear here..."
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-y-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 mr-2 cursor-pointer"
          />
          <span className="text-sm font-medium">Case sensitive</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={wholeWord}
            onChange={(e) => setWholeWord(e.target.checked)}
            className="w-4 h-4 mr-2 cursor-pointer"
          />
          <span className="text-sm font-medium">Match whole word only</span>
        </label>
      </div>
    </div>
  );
}
