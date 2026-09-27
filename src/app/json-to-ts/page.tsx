"use client";
import Clipboard from "@/components/clipboard";
import LazyCodeEditor from "@/components/lazy-code-editor";
import PanelHeader from "@/components/panel-header";
import ToolError from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
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
  const [error, setError] = useState<{ message: string; detail: string } | null>(null);

  useEffect(() => {
    let isCurrent = true;

    if (!inputString.trim()) {
      setOutputString("");
      setError(null);
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
          setError(null);
        })
        .catch((err) => {
          if (!isCurrent) return;
          setOutputString("");
          setError({
            message: "Couldn't build types from this value. Paste an object or array.",
            detail: String(err),
          });
        });
    } catch (err) {
      setOutputString("");
      setError({
        message:
          "This isn't a valid JavaScript object or JSON. Check for a missing comma or bracket.",
        detail: String(err),
      });
    }

    return () => {
      isCurrent = false;
    };
  }, [inputString]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["json-to-ts"]} />
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:gap-x-6 justify-center">
        {/* Fixed width: the editor fills its column, which would otherwise shrink to fit */}
        <div className="flex w-full flex-col lg:w-[529px] lg:items-start">
          <PanelHeader id="js-input" label="Input" format="JS object or JSON" />
          <LazyCodeEditor
            value={inputString}
            onChange={setInputString}
            language="javascript"
            placeholder="Paste your JavaScript object here…"
            labelledBy="js-input"
            errorId={error ? "js-error" : undefined}
          />
          {error && (
            <ToolError id="js-error" message={error.message} detail={error.detail} />
          )}
        </div>
        <div className="flex flex-col items-start">
          <PanelHeader id="ts-output" label="Output" format="TypeScript">
            <Clipboard text={outputString} />
          </PanelHeader>
          <textarea
            aria-labelledby="ts-output"
            className="border border-border p-3 bg-muted text-foreground cursor-default font-mono text-sm w-full h-[380px] lg:w-[529px] lg:h-[485px]"
            value={outputString}
            readOnly
            placeholder="TypeScript type will appear here…"
          />
        </div>
      </div>
    </div>
  );
}
