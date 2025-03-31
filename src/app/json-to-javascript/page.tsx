"use client";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { formatJSObject } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

// The default demo object as a string
const defaultObject = JSON.stringify(
  {
    id: 12345,
    name: "Example Product",
    price: 29.99,
    inStock: true,
    tags: ["electronics", "sale", "new"],
    dimensions: {
      length: 15,
      width: 10,
      height: 5,
    },
    description: "A sample product for demonstration purposes",
    rating: 4.5,
  },
  null,
  2,
);

export default function JSONToJavascript() {
  const [jsonString, setJsonString] = useState(defaultObject);
  const [javascriptObject, setJavascriptObject] = useState(
    formatJSObject(JSON.parse(defaultObject)),
  );
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!jsonString.trim()) {
      setError("");
      setJavascriptObject("");
      return;
    }

    try {
      // Extract variable name if it exists and clean the input
      const cleanedInput = JSON.parse(jsonString.trim());
      setJsonString(JSON.stringify(cleanedInput, null, 2));
      setJavascriptObject(formatJSObject(cleanedInput));
      setError("");
    } catch (err) {
      // log the eror string to the console
      setJavascriptObject(String(err));
      setError("Invalid JSON syntax");
    }
  }, [jsonString]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <div>
      <h1 className="text-center text-3xl">{TOOLS[1].name}</h1>
      <h2 className="text-center text-lg mt-2">{TOOLS[1].description}</h2>
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start">
          <h2 className="mb-2 text-lg font-semibold">JSON</h2>
          <textarea
            cols={60}
            rows={23}
            className="border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            onChange={(e) => setJsonString(e.target.value)}
            value={jsonString}
            spellCheck={false}
            placeholder="Paste your JSON data here..."
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold">JavaScript</h2>
            <button
              onClick={() => {
                copyToClipboard(javascriptObject);
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
            className="border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={javascriptObject}
            readOnly
            placeholder="Javascript object will appear here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
