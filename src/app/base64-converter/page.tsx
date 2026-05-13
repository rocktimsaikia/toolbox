"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Base64Converter() {
  const [inputString, setInputString] = useState("");
  const [outputString, setOutputString] = useState("");
  const [encode, setEncode] = useState(true);
  const [error, setError] = useState("");

  function handleConversion() {
    setError("");
    try {
      if (encode) {
        setOutputString(btoa(inputString));
      } else {
        setOutputString(atob(inputString));
      }
    } catch (err) {
      setError(`Invalid ${encode ? "text" : "base64"} input`);
      setOutputString("");
    }
  }

  function handleConversionSwitch() {
    setInputString(outputString);
    setEncode(!encode);
  }

  useEffect(() => {
    // Handle conversion when the input changes
    handleConversion();
  }, [inputString, encode]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["base64-converter"]} />
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-2 lg:text-lg font-semibold">
            Input{" "}
            <span className="text-muted-foreground">({encode ? "Text" : "Base64"})</span>
          </h2>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-border rounded outline-none p-3 resize-none dark:bg-input/30 font-mono text-sm"
            value={inputString}
            spellCheck={false}
            placeholder="Type your text here..."
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold flex gap-x-1">
              <span>Output</span>
              <span className="text-muted-foreground">
                ({encode ? "Base64" : "Text"})
              </span>
            </h2>
            <Clipboard text={outputString} />
          </div>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-border rounded outline-none p-3 resize-none bg-muted text-foreground cursor-default font-mono text-sm"
            value={outputString}
            spellCheck={false}
            readOnly
            placeholder="Output will appear here..."
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <label
          htmlFor="convert"
          className={clsx("mr-2 text-sm font-medium", {
            "text-muted-foreground": encode,
            "text-foreground": !encode,
          })}
        >
          Decode
        </label>
        <input
          type="checkbox"
          id="convert"
          checked={encode}
          onChange={handleConversionSwitch}
          className="h-4 w-8 cursor-pointer accent-primary"
        />
        <label
          htmlFor="convert"
          className={clsx("ml-2 text-sm font-medium", {
            "text-muted-foreground": !encode,
            "text-foreground": encode,
          })}
        >
          Encode
        </label>
      </div>
    </div>
  );
}
