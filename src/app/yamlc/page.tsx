"use client";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";
import yaml from "js-yaml";
import TextAreaCodeEditor from "@/components/code-editor";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parse as tomlParse } from "toml";
import json2toml from "json2toml";
import { XMLParser } from "fast-xml-parser";
import { toXML } from "jstoxml";
import { parse as csvParse, stringify as csvStringify } from "csv/sync";

const converters = ["json", "yaml", "toml", "xml", "csv"] as const;

const defaultInput = `{
    "firstName": "John",
    "lastName": "Doe",
    "age": 26,
    "nationality": "Unknown",
    "gender": "Neither"
}
`;

export default function Yamlc() {
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [inputFormat, setInputFormat] = useState<(typeof converters)[number]>("json");
  const [outputFormat, setOutputFormat] = useState<(typeof converters)[number]>("yaml");

  useEffect(() => {
    if (!input.trim()) {
      setError("");
      if (input !== "") {
        setInput("");
      }
      return;
    }
    if (inputFormat === outputFormat) {
      setOutput(input);
      setError("");
      return;
    }
    
    // Clear any previous errors at the start of conversion
    setError("");
    let data: unknown;

    // input parser
    switch (inputFormat.toLowerCase()) {
      case "json": {
        try {
          data = JSON.parse(input);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }
      case "yaml": {
        try {
          data = yaml.load(input);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }

      case "toml": {
        try {
          data = tomlParse(input);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }

      case "xml": {
        try {
          const parser = new XMLParser();
          data = parser.parse(input);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }

      case "csv": {
        try {
          const converted = csvParse(input, {
            columns: true,
            skip_empty_lines: true,
          });
          data = converted;
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }
    }

    switch (outputFormat.toLowerCase()) {
      case "yaml": {
        const converted = yaml.dump(data, { indent: 4 });
        setOutput(converted);
        break;
      }

      case "json": {
        try {
          const converted = JSON.stringify(data, null, 2);
          setOutput(converted);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }

      case "toml": {
        try {
          const converted = json2toml(data as object, { indent: 0 });
          setOutput(converted);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }

      case "xml": {
        try {
          const converted = toXML(data as object, { header: false, indent: "  " });
          setOutput(converted);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }

      case "csv": {
        try {
          if (Array.isArray(data)) {
            const converted = csvStringify(data, { header: true });
            setOutput(converted);
          } else {
            setError(
              "CSV output requires array data. Please convert from a format that produces arrays.",
            );
          }
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : String(e));
        }
        break;
      }
    }
  }, [inputFormat, outputFormat, input]);

  return (
    <div className="flex flex-col space-y-10">
      <ToolsHeader tool={TOOLS.yamlc} />
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col lg:items-start">
          <div className="flex justify-between w-full">
            <h2 className="mb-2 text-lg font-semibold">Input</h2>

            <Select
              defaultValue={inputFormat}
              onValueChange={(value) => setInputFormat(value as typeof inputFormat)}
            >
              <SelectTrigger className={"rounded-none border-neutral-800"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {converters.map((item) => (
                  <SelectItem value={item} key={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TextAreaCodeEditor
            value={input}
            onChange={setInput}
            language={inputFormat === "json" ? "javascript" : inputFormat}
            placeholder={`Paste your ${inputFormat.toUpperCase()} here...`}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold">Output</h2>
            <div className="flex">
              <Select
                defaultValue={outputFormat}
                onValueChange={(value) => setOutputFormat(value as typeof outputFormat)}
              >
                <SelectTrigger className={"rounded-none border-neutral-800"}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {converters.map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type={"button"}
                onClick={() => {
                  copyToClipboard(output);
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
          </div>
          <textarea
            className="border border-gray-300 outline-none p-3 bg-[#eeeeee] cursor-default font-mono text-sm w-full h-[380px] lg:w-[529px] lg:h-[485px]"
            value={output}
            readOnly
            placeholder="Converted data will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
