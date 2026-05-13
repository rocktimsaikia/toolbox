"use client";
import LazyCodeEditor from "@/components/lazy-code-editor";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

// The default demo object as a string
const defaultObject = `const User = {
    id: 12345,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    isActive: true,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "90210"
    },
    hobbies: ["reading", "hiking", "photography"],
    joinDate: new Date("2020-01-15"),
    lastLogin: null
  };`;

export default function JsonToTypes() {
  const [inputString, setInputString] = useState(defaultObject);
  const [outputString, setOutputString] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    if (!inputString.trim()) {
      setOutputString("");
      setError("");
      return () => {
        isCurrent = false;
      };
    }

    try {
      // Extract variable name if it exists and clean the input
      let variableName = "Object";
      let cleanedInput = inputString.trim();

      const variableMatch = inputString.match(/^(const|var|let)\s+(\w+)\s*=/);
      if (variableMatch) {
        variableName = variableMatch[2];
        cleanedInput = inputString
          .replace(/^(const|var|let)\s+\w+\s*=\s*/, "")
          .replace(/;$/, "")
          .trim();
      }

      // Evaluate the string to convert it to an actual JS object
      // biome-ignore lint/security/noGlobalEval: <explanation>
      const jsObject = eval(`(${cleanedInput})`);

      import("json-to-ts")
        .then((module) => {
          if (!isCurrent) return;
          const tsTypes = module.default(jsObject, {
            rootName: variableName,
          });
          setOutputString(tsTypes.join("\n\n"));
          setError("");
        })
        .catch((err) => {
          if (!isCurrent) return;
          setOutputString(String(err));
          setError("Invalid JavaScript object syntax");
        });
    } catch (err) {
      setOutputString(String(err));
      setError("Invalid JavaScript object syntax");
    }

    return () => {
      isCurrent = false;
    };
  }, [inputString]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["json-to-ts"]} />
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col lg:items-start">
          <h2 className="mb-2 text-lg font-semibold">Object</h2>
          <LazyCodeEditor
            value={inputString}
            onChange={setInputString}
            language="javascript"
            placeholder="Paste your JavaScript object here..."
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold">Typescript</h2>
            <button
              type="button"
              onClick={() => {
                copyToClipboard(outputString);
                setIsCopied(true);
              }}
              className="cursor-pointer border border-b-0 border-border rounded p-2 hover:bg-muted text-sm"
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
            className="border border-border outline-none p-3 bg-muted text-foreground cursor-default font-mono text-sm w-full h-[380px] lg:w-[529px] lg:h-[485px]"
            value={outputString}
            readOnly
            placeholder="TypeScript type will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
