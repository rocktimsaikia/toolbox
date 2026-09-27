"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import ToolsHeader from "@/components/tools-header";
import { Switch } from "@/components/ui/switch";
import { TOOLS } from "@/constants/tools";
import clsx from "clsx";
import { useEffect, useState } from "react";

// btoa/atob only handle Latin-1, so go through UTF-8 bytes to support emoji and any script
function encodeBase64(text: string) {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function decodeBase64(base64: string) {
  // Accept the URL-safe alphabet (- and _) and missing padding too
  const normalized = base64.trim().replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export default function Base64Converter() {
  const [inputString, setInputString] = useState("");
  const [outputString, setOutputString] = useState("");
  const [encode, setEncode] = useState(true);
  const [error, setError] = useState("");

  function handleConversion() {
    setError("");
    try {
      if (encode) {
        setOutputString(encodeBase64(inputString));
      } else {
        setOutputString(decodeBase64(inputString));
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
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center">
        <div className="flex flex-col items-start w-full">
          <PanelHeader
            htmlFor="base64-input"
            label="Input"
            format={encode ? "Text" : "Base64"}
          />
          <textarea
            id="base64-input"
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-border rounded p-3 resize-none dark:bg-input/30 font-mono text-sm"
            value={inputString}
            spellCheck={false}
            placeholder="Type your text here…"
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
          {error && <p className="text-destructive mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <PanelHeader
            id="base64-output"
            label="Output"
            format={encode ? "Base64" : "Text"}
          >
            <Clipboard text={outputString} />
          </PanelHeader>
          <textarea
            aria-labelledby="base64-output"
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-border rounded p-3 resize-none bg-muted text-foreground cursor-default font-mono text-sm"
            value={outputString}
            spellCheck={false}
            readOnly
            placeholder="Output will appear here…"
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
