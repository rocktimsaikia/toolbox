"use client";
import LazyCodeEditor from "@/components/lazy-code-editor";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const converters = ["json", "yaml", "toml", "xml", "csv"] as const;
type Converter = (typeof converters)[number];

const defaultInput = `{
    "firstName": "John",
    "lastName": "Doe",
    "age": 26,
    "nationality": "Unknown",
    "gender": "Neither"
}
`;

async function parseInput(input: string, inputFormat: Converter) {
  switch (inputFormat) {
    case "json":
      return JSON.parse(input);
    case "yaml": {
      const yaml = await import("js-yaml");
      return yaml.load(input);
    }
    case "toml": {
      const toml = await import("toml");
      return toml.parse(input);
    }
    case "xml": {
      const { XMLParser } = await import("fast-xml-parser");
      return new XMLParser().parse(input);
    }
    case "csv": {
      const { parse } = await import("csv/sync");
      return parse(input, { columns: true, skip_empty_lines: true });
    }
  }
}

async function stringifyOutput(data: unknown, outputFormat: Converter) {
  switch (outputFormat) {
    case "json":
      return JSON.stringify(data, null, 2);
    case "yaml": {
      const yaml = await import("js-yaml");
      return yaml.dump(data, { indent: 4 });
    }
    case "toml": {
      const json2toml = (await import("json2toml")).default;
      return json2toml(data as object, { indent: 0 });
    }
    case "xml": {
      const { toXML } = await import("jstoxml");
      return toXML(data as never, { header: false, indent: "  " });
    }
    case "csv": {
      if (!Array.isArray(data)) {
        throw new Error(
          "CSV output requires array data. Please convert from a format that produces arrays.",
        );
      }
      const { stringify } = await import("csv/sync");
      return stringify(data, { header: true });
    }
  }
}

export default function Yamlc() {
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [inputFormat, setInputFormat] = useState<Converter>("json");
  const [outputFormat, setOutputFormat] = useState<Converter>("yaml");

  useEffect(() => {
    let isCurrent = true;

    if (!input.trim()) {
      setError("");
      setOutput("");
      if (input !== "") {
        setInput("");
      }
      return () => {
        isCurrent = false;
      };
    }
    if (inputFormat === outputFormat) {
      setOutput(input);
      setError("");
      return () => {
        isCurrent = false;
      };
    }

    setError("");

    parseInput(input, inputFormat)
      .then((data) => stringifyOutput(data, outputFormat))
      .then((converted) => {
        if (!isCurrent) return;
        setOutput(converted);
        setError("");
      })
      .catch((e: unknown) => {
        if (!isCurrent) return;
        setOutput("");
        setError(e instanceof Error ? e.message : String(e));
      });

    return () => {
      isCurrent = false;
    };
  }, [inputFormat, outputFormat, input]);

  return (
    <div className="flex flex-col space-y-10">
      <ToolsHeader tool={TOOLS.yamlc} />
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col lg:items-start">
          <div className="flex justify-between w-full">
            <h2 className="mb-2 text-lg font-semibold">Input</h2>

            <select
              value={inputFormat}
              onChange={(event) => setInputFormat(event.target.value as Converter)}
              className="border border-b-0 border-border rounded bg-background px-3 py-2 hover:bg-muted"
            >
              {converters.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <LazyCodeEditor
            value={input}
            onChange={setInput}
            language={inputFormat === "json" ? "javascript" : "json"}
            placeholder={`Paste your ${inputFormat.toUpperCase()} here...`}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold">Output</h2>
            <div className="flex gap-2">
              <select
                value={outputFormat}
                onChange={(event) => setOutputFormat(event.target.value as Converter)}
                className="border border-b-0 border-border rounded bg-background px-3 py-2 hover:bg-muted"
              >
                {converters.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                type={"button"}
                onClick={() => {
                  copyToClipboard(output);
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
          </div>
          <textarea
            className="border border-border outline-none p-3 bg-muted text-foreground cursor-default font-mono text-sm w-full h-[380px] lg:w-[529px] lg:h-[485px]"
            value={output}
            readOnly
            placeholder="Converted data will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
