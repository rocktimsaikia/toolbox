"use client";
import TextAreaCodeEditor from "@/components/code-editor";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import jsonToTs from "json-to-ts";
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

export default function ObjectToTypescript() {
  const [jsObjectString, setJsObjectString] = useState(defaultObject);
  const [tsTypeString, setTsTypeString] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!jsObjectString.trim()) {
      setTsTypeString("");
      setError("");
      return;
    }

    try {
      // Extract variable name if it exists and clean the input
      let variableName = "Object";
      let cleanedInput = jsObjectString.trim();

      const variableMatch = jsObjectString.match(/^(const|var|let)\s+(\w+)\s*=/);
      if (variableMatch) {
        variableName = variableMatch[2];
        cleanedInput = jsObjectString
          .replace(/^(const|var|let)\s+\w+\s*=\s*/, "")
          .replace(/;$/, "")
          .trim();
      }

      // Evaluate the string to convert it to an actual JS object
      const jsObject = eval(`(${cleanedInput})`);

      // Convert to TypeScript types using variableName + "Type"
      const typeName = variableName;
      const tsTypes = jsonToTs(jsObject, {
        rootName: typeName,
      });

      setTsTypeString(tsTypes.join("\n\n"));
      setError("");
    } catch (err) {
      setTsTypeString(String(err));
      setError("Invalid JavaScript object syntax");
    }
  }, [jsObjectString]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["object-to-typescript"]} />
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start">
          <h2 className="mb-2 text-lg font-semibold">Object</h2>
          <TextAreaCodeEditor
            value={jsObjectString}
            onChange={setJsObjectString}
            language="javascript"
            placeholder="Paste your JavaScript object here..."
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold">Typescript</h2>
            <button
              onClick={() => {
                copyToClipboard(tsTypeString);
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
            rows={23}
            className="border border-gray-300 outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={tsTypeString}
            readOnly
            placeholder="TypeScript type will appear here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
