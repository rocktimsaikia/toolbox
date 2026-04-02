"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";

type ReplacePair = { id: number; find: string; replace: string };

let nextId = 0;
const newPair = (): ReplacePair => ({ id: nextId++, find: "", replace: "" });

export default function FindReplace() {
  const [inputString, setInputString] = useState("");
  const [pairs, setPairs] = useState<ReplacePair[]>([newPair()]);
  const [outputString, setOutputString] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  const applyReplacements = (
    text: string,
    replacePairs: ReplacePair[],
    matchCase: boolean,
    matchWholeWord: boolean,
  ) => {
    if (!text) return text;

    let result = text;
    for (const { find, replace } of replacePairs) {
      if (!find) continue;
      try {
        let pattern = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (matchWholeWord) {
          pattern = `\\b${pattern}\\b`;
        }
        const flags = matchCase ? "g" : "gi";
        const regex = new RegExp(pattern, flags);
        result = result.replace(regex, replace);
      } catch {
        // skip invalid pattern
      }
    }
    return result;
  };

  useEffect(() => {
    setOutputString(applyReplacements(inputString, pairs, caseSensitive, wholeWord));
  }, [inputString, pairs, caseSensitive, wholeWord]);

  const updatePair = (id: number, field: keyof Omit<ReplacePair, "id">, value: string) => {
    setPairs((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addPair = () => {
    setPairs((prev) => [...prev, newPair()]);
  };

  const removePair = (id: number) => {
    setPairs((prev) => (prev.length > 1 ? prev.filter((p) => p.id !== id) : prev));
  };

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
            {pairs.map((pair) => (
              <div key={pair.id} className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                  <div className="flex flex-col flex-1">
                    <label className="text-sm font-medium mb-1">Find:</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded outline-none p-2 font-mono text-sm"
                      value={pair.find}
                      placeholder="Text to find..."
                      onChange={(e) => updatePair(pair.id, "find", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="text-sm font-medium mb-1">Replace with:</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded outline-none p-2 font-mono text-sm"
                      value={pair.replace}
                      placeholder="Replacement text..."
                      onChange={(e) => updatePair(pair.id, "replace", e.target.value)}
                    />
                  </div>
                  {pairs.length > 1 && (
                    <button
                      onClick={() => removePair(pair.id)}
                      className="mt-5 text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                      aria-label="Remove pair"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addPair}
              className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              + Add another replacement
            </button>
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
