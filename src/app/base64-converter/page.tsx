"use client";
import Clipboard from "@/components/clipboard";
import PanelHeader from "@/components/panel-header";
import SegmentedControl from "@/components/segmented-control";
import ToolError, { errorProps } from "@/components/tool-error";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";

// btoa/atob only handle Latin-1, so go through UTF-8 bytes to support emoji and any script
function encodeBase64(text: string) {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function decodeBase64(base64: string) {
  // Accept the URL-safe alphabet (- and _), line breaks, and missing padding too
  const normalized = base64.replace(/\s/g, "").replace(/-/g, "+").replace(/_/g, "/");
  const bad = normalized.match(/[^A-Za-z0-9+/=]/)?.[0];
  if (bad) throw new Error(`Contains "${bad}", which isn't a Base64 character.`);
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  let binary: string;
  try {
    binary = atob(padded);
  } catch {
    throw new Error(
      "This isn't complete Base64. It may be cut off or have a stray = in the middle.",
    );
  }
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(
      "This decodes to binary data, such as an image or file, not readable text.",
    );
  }
}

// Prefilled so the page opens on a working result; the emoji shows UTF-8 support
const SAMPLE = "Hello, Toolbelt! 👋";

export default function Base64Converter() {
  const [inputString, setInputString] = useState(SAMPLE);
  // Computed up front so the server HTML already has the output
  const [outputString, setOutputString] = useState(() => encodeBase64(SAMPLE));
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
      setError(err instanceof Error ? err.message : String(err));
      setOutputString("");
    }
  }

  function handleConversionSwitch() {
    // Keep the input when there is no output to carry over, such as after an error
    if (outputString) setInputString(outputString);
    setEncode(!encode);
  }

  useEffect(() => {
    // Handle conversion when the input changes
    handleConversion();
  }, [inputString, encode]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["base64-converter"]} />
      <div className="mb-6">
        <SegmentedControl
          label="Direction"
          name="base64-direction"
          value={encode ? "encode" : "decode"}
          options={[
            { value: "encode", label: "Encode" },
            { value: "decode", label: "Decode" },
          ]}
          onChange={(value) => {
            if ((value === "encode") !== encode) handleConversionSwitch();
          }}
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center">
        <div className="flex flex-col items-start w-full">
          <PanelHeader
            htmlFor="base64-input"
            label="Input"
            format={encode ? "Text" : "Base64"}
          />
          <textarea
            id="base64-input"
            {...errorProps("base64-error", !!error)}
            className="w-full h-20 lg:w-[530px] lg:h-[125px] border border-border rounded p-3 resize-none dark:bg-input/30 font-mono text-sm"
            value={inputString}
            spellCheck={false}
            placeholder="Type your text here…"
            onChange={(e) => setInputString(e.target.value)}
          ></textarea>
          {error && <ToolError id="base64-error" message={error} />}
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
    </div>
  );
}
