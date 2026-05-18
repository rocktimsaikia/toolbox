"use client";

import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS, type Tool } from "@/constants/tools";
import {
  camelCase,
  capitalCase,
  constantCase,
  kebabCase,
  pascalCase,
  sentenceCase,
  snakeCase,
} from "change-case";
import clsx from "clsx";
import { useEffect, useState } from "react";

export type TextUtilityMode =
  | "case-converter"
  | "text-trimmer"
  | "line-break-remover"
  | "find-replace"
  | "html-escape";

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

type Props = {
  initialMode?: TextUtilityMode;
  tool?: Tool;
};

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

const textUtilityModes: Record<
  TextUtilityMode,
  {
    label: string;
    description: string;
    defaultInput: string;
    inputLabel: string;
    inputPlaceholder: string;
    outputPlaceholder: string;
  }
> = {
  "case-converter": {
    label: "Case Converter",
    description: "Convert text between common casing formats.",
    defaultInput: "Hello World! This is a sample text for case conversion.",
    inputLabel: "Input",
    inputPlaceholder: "Enter your text here...",
    outputPlaceholder: "Your converted text will appear here...",
  },
  "text-trimmer": {
    label: "Text Trimmer",
    description: "Remove leading or trailing whitespace from each line.",
    defaultInput:
      "   This text has leading spaces\nThis text has trailing spaces   \n   And this has both   ",
    inputLabel: "Input",
    inputPlaceholder: "Enter your text here...",
    outputPlaceholder: "Your trimmed text will appear here...",
  },
  "line-break-remover": {
    label: "Line Break Remover",
    description: "Remove line breaks while optionally preserving paragraphs.",
    defaultInput: `If
you
are
reading
this

Then the tool
should remove
single line breaks
but keep this as
a separate paragraph.`,
    inputLabel: "Input",
    inputPlaceholder: "Paste your text with line breaks here...",
    outputPlaceholder: "Your text without line breaks will appear here...",
  },
  "find-replace": {
    label: "Find and Replace",
    description: "Find and replace text with matching options.",
    defaultInput: "",
    inputLabel: "Input Text",
    inputPlaceholder: "Enter your text here...",
    outputPlaceholder: "Your replaced text will appear here...",
  },
  "html-escape": {
    label: "HTML Escape",
    description: "Escape or unescape HTML entities.",
    defaultInput: "",
    inputLabel: "Input",
    inputPlaceholder: "Add your HTML here...",
    outputPlaceholder: "Your escaped HTML will appear here...",
  },
};

function convertCase(text: string, caseType: CaseType): string {
  if (!text) return "";

  switch (caseType) {
    case "camelCase":
      return camelCase(text);
    case "PascalCase":
      return pascalCase(text);
    case "snake_case":
      return snakeCase(text);
    case "CONSTANT_CASE":
      return constantCase(text);
    case "kebab-case":
      return kebabCase(text);
    case "Title Case":
      return capitalCase(text);
    case "Sentence case":
      return sentenceCase(text);
    case "lower case":
      return text.toLowerCase();
    case "UPPER CASE":
      return text.toUpperCase();
    default:
      return text;
  }
}

function trimText(text: string, trimLeading: boolean, trimTrailing: boolean) {
  if (!text) return "";
  if (!trimLeading && !trimTrailing) return text;

  return text
    .split("\n")
    .map((line) => {
      let result = line;

      if (trimLeading) {
        result = result.replace(/^\s+/, "");
      }

      if (trimTrailing) {
        result = result.replace(/\s+$/, "");
      }

      return result;
    })
    .join("\n");
}

function removeLineBreaks(text: string, keepParagraphs: boolean) {
  if (!text.trim()) return "";

  const normalizedText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  if (!keepParagraphs) {
    return normalizedText.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  }

  const paragraphs = normalizedText.split(/\n\s*\n+/);
  const processedParagraphs = paragraphs
    .map((paragraph) => paragraph.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 0);

  return processedParagraphs.join("\n\n");
}

function findAndReplace(
  text: string,
  find: string,
  replace: string,
  matchCase: boolean,
  matchWholeWord: boolean,
) {
  if (!text || !find) return text;

  try {
    let pattern = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (matchWholeWord) {
      pattern = `\\b${pattern}\\b`;
    }

    return text.replace(new RegExp(pattern, matchCase ? "g" : "gi"), replace);
  } catch {
    return text;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function unescapeHtml(value: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

export default function TextUtilities({
  initialMode = "case-converter",
  tool = TOOLS["text-tools"],
}: Props) {
  const [mode, setMode] = useState<TextUtilityMode>(initialMode);
  const [inputString, setInputString] = useState(
    textUtilityModes[initialMode].defaultInput,
  );
  const [outputString, setOutputString] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("camelCase");
  const [removeLeading, setRemoveLeading] = useState(true);
  const [removeTrailing, setRemoveTrailing] = useState(false);
  const [preserveParagraphs, setPreserveParagraphs] = useState(true);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [shouldEscape, setShouldEscape] = useState(true);
  const [error, setError] = useState("");

  const modeConfig = textUtilityModes[mode];

  function handleModeChange(nextMode: TextUtilityMode) {
    setMode(nextMode);
    setError("");
  }

  function handleConversionSwitch() {
    setShouldEscape(!shouldEscape);
  }

  function handleApplyToInput() {
    setInputString(outputString);
  }

  useEffect(() => {
    setError("");

    try {
      switch (mode) {
        case "case-converter":
          setOutputString(convertCase(inputString, selectedCase));
          return;
        case "text-trimmer":
          setOutputString(trimText(inputString, removeLeading, removeTrailing));
          return;
        case "line-break-remover":
          setOutputString(removeLineBreaks(inputString, preserveParagraphs));
          return;
        case "find-replace":
          setOutputString(
            findAndReplace(inputString, findText, replaceText, caseSensitive, wholeWord),
          );
          return;
        case "html-escape":
          if (!inputString) {
            setOutputString("");
            return;
          }

          setOutputString(
            shouldEscape ? escapeHtml(inputString) : unescapeHtml(inputString),
          );
          return;
      }
    } catch {
      setError(`Invalid ${shouldEscape ? "text" : "HTML"} input`);
      setOutputString("");
    }
  }, [
    mode,
    inputString,
    selectedCase,
    removeLeading,
    removeTrailing,
    preserveParagraphs,
    findText,
    replaceText,
    caseSensitive,
    wholeWord,
    shouldEscape,
  ]);

  return (
    <div>
      <ToolsHeader tool={tool} />

      <div className="mt-10 flex flex-col items-center gap-3">
        <div className="flex max-w-4xl flex-wrap justify-center gap-2">
          {(Object.keys(textUtilityModes) as TextUtilityMode[]).map((utilityMode) => (
            <button
              key={utilityMode}
              type="button"
              onClick={() => handleModeChange(utilityMode)}
              className={clsx(
                "rounded border px-4 py-2 text-sm font-medium transition-colors",
                mode === utilityMode
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {textUtilityModes[utilityMode].label}
            </button>
          ))}
        </div>
        <p className="max-w-2xl text-center text-sm text-muted-foreground">
          {modeConfig.description}
        </p>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-y-5 lg:flex-row lg:gap-x-6 lg:gap-y-0">
        <div className="flex w-full flex-col items-start">
          <h2 className="mb-2 font-semibold lg:text-lg">{modeConfig.inputLabel}</h2>
          <textarea
            className="h-20 w-full resize-none rounded border border-border p-3 font-mono text-sm outline-none dark:bg-input/30 lg:h-[125px] lg:w-[530px]"
            value={inputString}
            spellCheck={false}
            placeholder={
              mode === "html-escape"
                ? `Add your${shouldEscape ? "" : " escaped"} HTML here...`
                : modeConfig.inputPlaceholder
            }
            onChange={(e) => setInputString(e.target.value)}
          />
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {mode === "find-replace" && (
            <div className="mt-4 w-full space-y-3">
              <div className="flex flex-col">
                <label htmlFor="find-text" className="mb-1 text-sm font-medium">
                  Find:
                </label>
                <input
                  id="find-text"
                  type="text"
                  className="w-full rounded border border-border p-2 font-mono text-sm outline-none lg:w-[530px]"
                  value={findText}
                  placeholder="Text to find..."
                  onChange={(e) => setFindText(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="replace-text" className="mb-1 text-sm font-medium">
                  Replace with:
                </label>
                <input
                  id="replace-text"
                  type="text"
                  className="w-full rounded border border-border p-2 font-mono text-sm outline-none lg:w-[530px]"
                  value={replaceText}
                  placeholder="Replacement text..."
                  onChange={(e) => setReplaceText(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start">
          <div className="flex w-full justify-between gap-3">
            <h2 className="font-semibold lg:text-lg">
              <span>Output</span>
              {mode === "html-escape" && (
                <span className="text-muted-foreground">
                  {" "}
                  ({shouldEscape ? "Escaped" : "Unescaped"})
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleApplyToInput}
                disabled={!outputString}
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded border border-border px-3 py-1 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span aria-hidden="true">←</span>
                Apply to Input
              </button>
              <Clipboard text={outputString} />
            </div>
          </div>
          <textarea
            className="h-20 w-full cursor-default resize-none rounded border border-border bg-muted p-3 font-mono text-sm text-foreground outline-none lg:h-[125px] lg:w-[530px]"
            value={outputString}
            readOnly
            spellCheck={false}
            placeholder={
              mode === "html-escape"
                ? `Your ${shouldEscape ? "escaped" : "unescaped"} HTML will appear here...`
                : modeConfig.outputPlaceholder
            }
          />
        </div>
      </div>

      {mode === "case-converter" && (
        <div className="mt-6 flex flex-col items-center gap-y-4">
          <p className="text-sm font-medium">Select Case Format:</p>
          <div className="flex max-w-2xl flex-wrap justify-center gap-2">
            {caseOptions.map((caseType) => (
              <button
                key={caseType}
                type="button"
                onClick={() => setSelectedCase(caseType)}
                className={clsx(
                  "rounded border px-4 py-2 text-sm font-medium transition-colors",
                  selectedCase === caseType
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {caseType}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "text-trimmer" && (
        <div className="mt-6 flex flex-col items-center gap-y-3">
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={removeLeading}
              onChange={(e) => setRemoveLeading(e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span className="text-sm font-medium">Remove leading spaces (left trim)</span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={removeTrailing}
              onChange={(e) => setRemoveTrailing(e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span className="text-sm font-medium">
              Remove trailing spaces (right trim)
            </span>
          </label>
        </div>
      )}

      {mode === "line-break-remover" && (
        <div className="mt-4 flex items-center justify-center">
          <label
            htmlFor="preserve-paragraphs"
            className={clsx("mr-2 text-sm font-medium", {
              "text-muted-foreground": preserveParagraphs,
              "text-foreground": !preserveParagraphs,
            })}
          >
            Remove All
          </label>
          <input
            type="checkbox"
            id="preserve-paragraphs"
            checked={preserveParagraphs}
            onChange={(event) => setPreserveParagraphs(event.target.checked)}
            className="h-4 w-8 cursor-pointer accent-primary"
          />
          <label
            htmlFor="preserve-paragraphs"
            className={clsx("ml-2 text-sm font-medium", {
              "text-muted-foreground": !preserveParagraphs,
              "text-foreground": preserveParagraphs,
            })}
          >
            Preserve Paragraphs
          </label>
        </div>
      )}

      {mode === "find-replace" && (
        <div className="mt-6 flex flex-col items-center gap-y-3">
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span className="text-sm font-medium">Case sensitive</span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span className="text-sm font-medium">Match whole word only</span>
          </label>
        </div>
      )}

      {mode === "html-escape" && (
        <div className="mt-4 flex items-center justify-center">
          <label
            htmlFor="convert"
            className={clsx("mr-2 text-sm font-medium", {
              "text-muted-foreground": shouldEscape,
              "text-foreground": !shouldEscape,
            })}
          >
            Unescape
          </label>
          <input
            type="checkbox"
            id="convert"
            checked={shouldEscape}
            onChange={handleConversionSwitch}
            className="h-4 w-8 cursor-pointer accent-primary"
          />
          <label
            htmlFor="convert"
            className={clsx("ml-2 text-sm font-medium", {
              "text-muted-foreground": !shouldEscape,
              "text-foreground": shouldEscape,
            })}
          >
            Escape
          </label>
        </div>
      )}
    </div>
  );
}
