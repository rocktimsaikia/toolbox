"use client";

import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import ToolsHeader from "@/components/tools-header";
import { TOOLS, type Tool } from "@/constants/tools";
import { ArrowLeftIcon, ArrowUpIcon } from "@radix-ui/react-icons";
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
import Link from "next/link";
import { useRef, useState } from "react";

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
  initialMode: TextUtilityMode;
  tool: Tool;
};

const CASE_GROUPS: { label: string; options: CaseType[] }[] = [
  {
    label: "Code",
    options: ["camelCase", "PascalCase", "snake_case", "CONSTANT_CASE", "kebab-case"],
  },
  { label: "Text", options: ["Title Case", "Sentence case", "lower case", "UPPER CASE"] },
];

const textUtilityModes: Record<
  TextUtilityMode,
  {
    label: string;
    defaultInput: string;
    inputLabel: string;
    inputPlaceholder: string;
    outputPlaceholder: string;
  }
> = {
  "case-converter": {
    label: "Case Converter",
    defaultInput: "Hello World! This is a sample text for case conversion.",
    inputLabel: "Input",
    inputPlaceholder: "Enter your text here…",
    outputPlaceholder: "Your converted text will appear here…",
  },
  "text-trimmer": {
    label: "Text Trimmer",
    defaultInput:
      "   This text has leading spaces\nThis text has trailing spaces   \n   And this has both   ",
    inputLabel: "Input",
    inputPlaceholder: "Enter your text here…",
    outputPlaceholder: "Your trimmed text will appear here…",
  },
  "line-break-remover": {
    label: "Line Break Remover",
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
    inputPlaceholder: "Paste your text with line breaks here…",
    outputPlaceholder: "Your text without line breaks will appear here…",
  },
  "find-replace": {
    label: "Find and Replace Text",
    defaultInput: "The colour of the Colour picker is a nice colour.",
    inputLabel: "Input",
    inputPlaceholder: "Enter your text here…",
    outputPlaceholder: "Your replaced text will appear here…",
  },
  "html-escape": {
    label: "HTML Escape",
    defaultInput: '<a href="/">Home</a> & more',
    inputLabel: "Input",
    inputPlaceholder: "Add your HTML here…",
    outputPlaceholder: "Your escaped HTML will appear here…",
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
  if (!text || !find) return { text, count: 0 };

  let pattern = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (matchWholeWord) {
    pattern = `\\b${pattern}\\b`;
  }

  let count = 0;
  // A replacer function keeps the replacement literal ($& etc. are not expanded)
  const result = text.replace(new RegExp(pattern, matchCase ? "g" : "gi"), () => {
    count += 1;
    return replace;
  });
  return { text: result, count };
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

// Text the user typed survives client-side navigation between the tool pages
let carriedInput: string | undefined;

const fieldClass =
  "w-full rounded border border-input p-3 font-mono text-sm dark:bg-input/30 lg:w-[530px]";

// Two-state choice as a real radio group: each option selects itself, and screen
// readers announce the chosen option (a checkbox between two labels did neither).
function SegmentedControl<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-3">
      <legend className="sr-only">{label}</legend>
      <div className="inline-flex rounded border border-input p-0.5">
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              "inline-flex h-10 cursor-pointer items-center rounded-sm px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foreground lg:h-8",
              value === option.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 py-2 text-sm font-medium lg:py-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 cursor-pointer accent-primary"
      />
      {children}
    </label>
  );
}

function plural(count: number, word: string, pluralWord = `${word}s`) {
  return `${count} ${count === 1 ? word : pluralWord}`;
}

export default function TextUtilities({ initialMode: mode, tool }: Props) {
  const modeConfig = textUtilityModes[mode];
  const [inputString, setInput] = useState(carriedInput ?? modeConfig.defaultInput);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [selectedCase, setSelectedCase] = useState<CaseType>("camelCase");
  const [removeLeading, setRemoveLeading] = useState(true);
  const [removeTrailing, setRemoveTrailing] = useState(false);
  const [preserveParagraphs, setPreserveParagraphs] = useState(true);
  // The sample search only makes sense against the sample text
  const [findText, setFindText] = useState(carriedInput === undefined ? "colour" : "");
  const [replaceText, setReplaceText] = useState(
    carriedInput === undefined ? "color" : "",
  );
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [shouldEscape, setShouldEscape] = useState(true);

  function setInputString(value: string) {
    carriedInput = value;
    setInput(value);
  }

  function handleApplyToInput() {
    const input = inputRef.current;
    if (input) {
      input.focus();
      input.select();
      // ponytail: execCommand is deprecated but is the only way to change a textarea
      // while keeping the browser's undo history, so Ctrl+Z restores the old input.
      // It fires a normal input event, which updates state through onChange.
      if (document.execCommand("insertText", false, outputString)) return;
    }
    setInputString(outputString);
  }

  // Derived during render (not in an effect) so the server HTML already contains the
  // output; otherwise the output box stays empty until hydration and delays LCP.
  let outputString = "";
  let status = "";
  let error = "";
  try {
    switch (mode) {
      case "case-converter":
        outputString = convertCase(inputString, selectedCase);
        status = selectedCase;
        break;
      case "text-trimmer": {
        outputString = trimText(inputString, removeLeading, removeTrailing);
        const before = inputString.split("\n");
        const after = outputString.split("\n");
        const changedLines = before.filter((line, index) => line !== after[index]).length;
        const removed = inputString.length - outputString.length;
        status = removed
          ? `Removed ${plural(removed, "character")} from ${plural(changedLines, "line")}`
          : "Nothing to trim";
        break;
      }
      case "line-break-remover": {
        outputString = removeLineBreaks(inputString, preserveParagraphs);
        const breaks = (text: string) => (text.match(/\r\n|\r|\n/g) ?? []).length;
        const removed = breaks(inputString) - breaks(outputString);
        status =
          removed > 0 ? `Removed ${plural(removed, "line break")}` : "No line breaks";
        break;
      }
      case "find-replace": {
        const result = findAndReplace(
          inputString,
          findText,
          replaceText,
          caseSensitive,
          wholeWord,
        );
        outputString = result.text;
        status = !findText
          ? "Enter text to find"
          : result.count
            ? `Replaced ${plural(result.count, "match", "matches")}`
            : "No matches";
        break;
      }
      case "html-escape":
        if (inputString) {
          outputString = shouldEscape
            ? escapeHtml(inputString)
            : unescapeHtml(inputString);
        }
        status = shouldEscape ? "Escaped" : "Unescaped";
        break;
    }
  } catch {
    error = `Invalid ${shouldEscape ? "text" : "HTML"} input`;
    outputString = "";
  }
  if (!inputString) status = "";

  return (
    <div className="w-full">
      <ToolsHeader tool={tool} />

      {/* inline-size containment stops the unwrapped mobile row from widening the page */}
      <nav
        aria-label="Text tools"
        className="mx-auto max-w-[1084px] [contain:inline-size]"
      >
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {(Object.keys(textUtilityModes) as TextUtilityMode[]).map((utilityMode) => (
            <li key={utilityMode} className="shrink-0">
              <Link
                href={`/${utilityMode}`}
                aria-current={mode === utilityMode ? "page" : undefined}
                className={clsx(
                  "inline-flex h-11 items-center whitespace-nowrap rounded border px-4 text-sm font-medium transition-colors lg:h-9",
                  mode === utilityMode
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {textUtilityModes[utilityMode].label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Options sit above the text so they are read, and tabbed to, before the result */}
      <div className="mx-auto mt-8 flex max-w-[1084px] flex-col gap-4">
        {mode === "case-converter" && (
          <div className="flex flex-col gap-2">
            {CASE_GROUPS.map((group) => (
              <fieldset key={group.label} className="flex flex-wrap items-center gap-2">
                <legend className="sr-only">{group.label} formats</legend>
                <span
                  aria-hidden="true"
                  className="w-10 text-xs font-medium text-muted-foreground"
                >
                  {group.label}
                </span>
                {group.options.map((caseType) => (
                  <button
                    key={caseType}
                    type="button"
                    aria-pressed={selectedCase === caseType}
                    onClick={() => setSelectedCase(caseType)}
                    className={clsx(
                      "h-10 rounded border px-3 font-mono text-sm transition-colors lg:h-8",
                      selectedCase === caseType
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-muted",
                    )}
                  >
                    {caseType}
                  </button>
                ))}
              </fieldset>
            ))}
          </div>
        )}

        {mode === "text-trimmer" && (
          <div className="flex flex-wrap gap-x-6">
            <Checkbox checked={removeLeading} onChange={setRemoveLeading}>
              Remove leading spaces (left trim)
            </Checkbox>
            <Checkbox checked={removeTrailing} onChange={setRemoveTrailing}>
              Remove trailing spaces (right trim)
            </Checkbox>
          </div>
        )}

        {mode === "line-break-remover" && (
          <SegmentedControl
            label="Line breaks"
            name="line-breaks"
            value={preserveParagraphs ? "keep" : "join"}
            options={[
              { value: "keep", label: "Keep paragraphs" },
              { value: "join", label: "Join everything" },
            ]}
            onChange={(value) => setPreserveParagraphs(value === "keep")}
          />
        )}

        {mode === "find-replace" && (
          <div className="flex flex-col gap-3">
            <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
              <div className="flex flex-col">
                <label htmlFor="find-text" className="mb-1 text-sm font-medium">
                  Find
                </label>
                <input
                  id="find-text"
                  type="text"
                  className={clsx(fieldClass, "h-11 lg:h-10")}
                  value={findText}
                  placeholder="Text to find…"
                  onChange={(e) => setFindText(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="replace-text" className="mb-1 text-sm font-medium">
                  Replace with
                </label>
                <input
                  id="replace-text"
                  type="text"
                  className={clsx(fieldClass, "h-11 lg:h-10")}
                  value={replaceText}
                  placeholder="Leave empty to delete matches"
                  onChange={(e) => setReplaceText(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6">
              <Checkbox checked={caseSensitive} onChange={setCaseSensitive}>
                Case sensitive
              </Checkbox>
              <Checkbox checked={wholeWord} onChange={setWholeWord}>
                Match whole word only
              </Checkbox>
            </div>
          </div>
        )}

        {mode === "html-escape" && (
          <SegmentedControl
            label="Direction"
            name="html-direction"
            value={shouldEscape ? "escape" : "unescape"}
            options={[
              { value: "escape", label: "Escape" },
              { value: "unescape", label: "Unescape" },
            ]}
            onChange={(value) => setShouldEscape(value === "escape")}
          />
        )}

        <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-6">
          <div className="flex w-full flex-col lg:w-auto">
            <PanelHeader htmlFor="text-input" label={modeConfig.inputLabel} />
            <textarea
              id="text-input"
              ref={inputRef}
              className={clsx(fieldClass, "h-32 resize-y lg:h-[160px]")}
              value={inputString}
              spellCheck={false}
              placeholder={
                mode === "html-escape"
                  ? `Add your${shouldEscape ? "" : " escaped"} HTML here…`
                  : modeConfig.inputPlaceholder
              }
              onChange={(e) => setInputString(e.target.value)}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>

          <div className="flex w-full flex-col lg:w-auto">
            <PanelHeader id="output-heading" label="Output">
              <button
                type="button"
                onClick={handleApplyToInput}
                disabled={!outputString || outputString === inputString}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded border border-border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent lg:h-9"
              >
                <ArrowUpIcon aria-hidden="true" className="lg:hidden" />
                <ArrowLeftIcon aria-hidden="true" className="hidden lg:block" />
                Apply to Input
              </button>
              <Clipboard text={outputString} />
            </PanelHeader>
            <textarea
              aria-labelledby="output-heading"
              className={clsx(
                fieldClass,
                "h-32 resize-y bg-muted text-foreground lg:h-[160px]",
              )}
              value={outputString}
              readOnly
              spellCheck={false}
              placeholder={
                mode === "html-escape"
                  ? `Your ${shouldEscape ? "escaped" : "unescaped"} HTML will appear here…`
                  : modeConfig.outputPlaceholder
              }
            />
            <p
              className="mt-2 min-h-5 text-sm text-muted-foreground"
              aria-live={mode === "find-replace" ? "polite" : undefined}
            >
              {status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
