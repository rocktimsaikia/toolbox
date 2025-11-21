"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";

type CaseType =
  | "camelCase"
  | "PascalCase"
  | "snake_case"
  | "CONSTANT_CASE"
  | "kebab-case"
  | "Title Case"
  | "Sentence case"
  | "lower case"
  | "UPPER CASE";

export default function CaseConverter() {
  const [inputText, setInputText] = useState(
    "Hello World! This is a sample text for case conversion.",
  );
  const [outputText, setOutputText] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("camelCase");

  const splitIntoWords = (text: string): string[] => {
    // Split by spaces, hyphens, underscores, and camelCase/PascalCase boundaries
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camelCase
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Split PascalCase
      .replace(/[_-]/g, " ") // Replace underscores and hyphens with spaces
      .split(/\s+/) // Split by whitespace
      .filter((word) => word.length > 0); // Remove empty strings
  };

  const convertCase = (text: string, caseType: CaseType): string => {
    if (!text) return "";

    const words = splitIntoWords(text);

    switch (caseType) {
      case "camelCase":
        return words
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join("");

      case "PascalCase":
        return words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join("");

      case "snake_case":
        return words.map((word) => word.toLowerCase()).join("_");

      case "CONSTANT_CASE":
        return words.map((word) => word.toUpperCase()).join("_");

      case "kebab-case":
        return words.map((word) => word.toLowerCase()).join("-");

      case "Title Case":
        return words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

      case "Sentence case":
        const sentence = words.map((word) => word.toLowerCase()).join(" ");
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);

      case "lower case":
        return words.map((word) => word.toLowerCase()).join(" ");

      case "UPPER CASE":
        return words.map((word) => word.toUpperCase()).join(" ");

      default:
        return text;
    }
  };

  useEffect(() => {
    setOutputText(convertCase(inputText, selectedCase));
  }, [inputText, selectedCase]);

  const caseOptions: CaseType[] = [
    "camelCase",
    "PascalCase",
    "snake_case",
    "CONSTANT_CASE",
    "kebab-case",
    "Title Case",
    "Sentence case",
    "lower case",
    "UPPER CASE",
  ];

  return (
    <div>
      <ToolsHeader tool={TOOLS["case-converter"]} />
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-2 lg:text-lg font-semibold">Input</h2>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            value={inputText}
            spellCheck={false}
            placeholder="Enter your text here..."
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="lg:text-lg font-semibold">Output</h2>
            <Clipboard text={outputText} />
          </div>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={outputText}
            readOnly
            spellCheck={false}
            placeholder="Your converted text will appear here..."
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-y-4">
        <label className="text-sm font-medium">Select Case Format:</label>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          {caseOptions.map((caseType) => (
            <button
              key={caseType}
              onClick={() => setSelectedCase(caseType)}
              className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                selectedCase === caseType
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {caseType}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
