"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
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
      setError(`Invalid ${encode ? "text" : "encoded URL"} input`);
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
      <ToolsHeader tool={TOOLS["url-encoder-decoder"]} />
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center">
        <div className="flex flex-col items-start w-full">
          <PanelHeader
            htmlFor="url-input"
            label="Input"
            format={encode ? "Text" : "Encoded"}
          />
          <textarea
            id="url-input"
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-border rounded p-3 resize-none dark:bg-input/30 font-mono text-sm"
            spellCheck={false}
            value={inputString}
            placeholder={`Add your${encode ? "" : " encoded"} URL here...`}
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
          {error && <p className="text-destructive mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <PanelHeader
            id="url-output"
            label="Output"
            format={encode ? "Encoded" : "Decoded"}
          >
            <Clipboard text={outputString} />
          </PanelHeader>
          <textarea
            aria-labelledby="url-output"
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-border rounded p-3 resize-none bg-muted text-foreground cursor-default font-mono text-sm"
            value={outputString}
            readOnly
            spellCheck={false}
            placeholder={`Your ${encode ? "encoded" : "decoded"} URL will appear here...`}
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
        <Switch id="convert" checked={encode} onCheckedChange={handleConversionSwitch} />
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
