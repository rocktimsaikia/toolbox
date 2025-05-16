"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Switch } from "@/components/ui/switch";
import { TOOLS } from "@/constants/tools";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { encode, decode } from "html-entities";

export default function HtmlEscape() {
  const [inputString, setInputString] = useState("");
  const [outputString, setOutputString] = useState("");
  const [escape, setEscape] = useState(true);
  const [error, setError] = useState("");

  function handleConversion() {
    setError("");
    try {
      if (escape) {
        setOutputString(
          encode(inputString, { level: "html5", mode: "specialChars" }),
        );
      } else {
        setOutputString(decode(inputString));
      }
    } catch (err) {
      setError(`Invalid ${escape ? "text" : "HTML"} input`);
      setOutputString("");
    }
  }

  function handleConversionSwitch() {
    setInputString(outputString);
    setEscape(!escape);
  }

  useEffect(() => {
    // Handle conversion when the input changes
    handleConversion();
  }, [inputString, escape]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["html-escape"]} />
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-2 lg:text-lg font-semibold">Input</h2>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            spellCheck={false}
            value={inputString}
            placeholder={`Add your${escape ? "" : " escaped"} HTML here...`}
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="lg:text-lg font-semibold flex gap-x-1">
              <span>Output</span>
              <span className="text-gray-500">
                ({escape ? "Escaped" : "Unescaped"})
              </span>
            </h2>
            <Clipboard text={outputString} />
          </div>
          <textarea
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={outputString}
            readOnly
            spellCheck={false}
            placeholder={`Your ${escape ? "escaped" : "unescaped"} HTML will appear here...`}
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <label
          className={clsx("mr-2 text-sm font-medium", {
            "text-gray-400": escape,
            "text-gray-900": !escape,
          })}
        >
          Unescape
        </label>
        <Switch
          id="convert"
          checked={escape}
          onCheckedChange={handleConversionSwitch}
        ></Switch>
        <label
          className={clsx("ml-2 text-sm font-medium", {
            "text-gray-400": !escape,
            "text-gray-900": escape,
          })}
        >
          Escape
        </label>
      </div>
    </div>
  );
}

