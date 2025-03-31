"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Switch } from "@/components/ui/switch";
import { TOOLS } from "@/constants/tools";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function UrlEncoder() {
  const [inputString, setInputString] = useState("");
  const [outputString, setOutputString] = useState("");
  const [encode, setEncode] = useState(true);
  const [error, setError] = useState("");

  function handleConversion() {
    setError("");
    try {
      if (encode) {
        setOutputString(encodeURIComponent(inputString));
      } else {
        setOutputString(decodeURIComponent(inputString));
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
      <ToolsHeader tool={TOOLS[5]} />
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start">
          <h2 className="mb-2 text-lg font-semibold">Input</h2>
          <textarea
            cols={60}
            rows={5}
            className="border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            value={inputString}
            placeholder={`Add your${encode ? "" : " encoded"} URL here...`}
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold flex gap-x-1">
              <span>Output</span>
              <span className="text-gray-500">({encode ? "Encoded" : "Decoded"})</span>
            </h2>
            <Clipboard text={outputString} />
          </div>
          <textarea
            cols={60}
            rows={5}
            className="border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={outputString}
            readOnly
            placeholder={`Your ${encode ? "encoded" : "decoded"} URL will appear here...`}
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <label
          className={clsx("mr-2 text-sm font-medium", {
            "text-gray-400": encode,
            "text-gray-900": !encode,
          })}
        >
          Decode
        </label>
        <Switch
          id="convert"
          checked={encode}
          onCheckedChange={handleConversionSwitch}
        ></Switch>
        <label
          className={clsx("ml-2 text-sm font-medium", {
            "text-gray-400": !encode,
            "text-gray-900": encode,
          })}
        >
          Encode
        </label>
      </div>
    </div>
  );
}
