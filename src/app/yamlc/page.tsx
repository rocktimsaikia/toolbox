"use client"
import ToolsHeader from "@/components/tools-header";
import {TOOLS} from "@/constants/tools";
import {useEffect, useState} from "react";
import yaml from "js-yaml"
import TextAreaCodeEditor from "@/components/code-editor";
import {copyToClipboard} from "@/libs/common";
import {CheckIcon, CopyIcon} from "@radix-ui/react-icons";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {parse as tomlParse} from "toml"
import json2toml from "json2toml";
import {XMLParser} from "fast-xml-parser";
import {toXML} from "jstoxml";
const converters = [
  "json",
  "yaml",
  "toml",
  "xml",
] as const;

const defaultInput = `{
    "firstName": "John",
    "lastName": "Doe",
    "age": 26,
    "nationality": "Unknown",
    "gender": "Neither"
}
`

export default function Yamlc() {
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [inputFormat, setInputFormat] = useState<typeof converters[number]>("json");
  const [outputFormat, setOutputFormat] = useState<typeof converters[number]>("yaml");


  useEffect(() => {
    if (!input.trim()) {
      setError("");
      setInput("");
      return;
    }
    if (inputFormat === outputFormat) {
      setOutput(input);
      return;
    }
    let data: unknown;

    // input parser
    switch (inputFormat.toLowerCase()) {
      case "json": {
        try {
          data = JSON.parse(input);
        } catch(e: unknown) {
          console.error(e);
          // @ts-ignore
          setError(e.toString());

        }
        break;
      }
      case "yaml": {
        try {
          const converted = yaml.load(input);
          data = converted;
          console.log(converted);
        } catch (e) {
          console.log(e);
          // @ts-ignore
          setError(e.toString());
        }
        break;
      }

      case "toml": {
        try {
          const converted = tomlParse(input);
          data = converted;
          console.log(converted);
        } catch (e) {
          console.log(e);
          // @ts-ignore
          setError(e.toString());
        }
        break;
      }

      case "xml": {
        try {
          const parser = new XMLParser();
          const converted = parser.parse(input);
          console.log(converted);
          data = converted;
        } catch (e) {
          // @ts-expect-error its unknown and i dont care
          setError(e.toString());
          console.error(e);
        }
        break;
      }

    }


    switch (outputFormat.toLowerCase()) {
      case "yaml": {
        const converted = yaml.dump(data, {indent: 4});
        setOutput(converted);
        break;
      }

      case "json": {
        try {
          const converted = JSON.stringify(data, null, 2);
          // replace /n with \n
          const formatted = converted.replace(/\\n/g, "\r\n");
          console.log(formatted);
          console.log(converted);
          setOutput(formatted);
        } catch (e: unknown) {
          console.error(e);
          // @ts-ignore
          setError(e.toString());
        }
        break;

      }

      case "toml": {
        try {
          const converted = json2toml(data as object, {indent: 0});
          setOutput(converted);
          break;
        } catch (e) {
          console.error(e);
          // @ts-ignore
          setError(e.toString());
        }
        break;
      }

      case "xml": {
        try {
          // @ts-ignore
          const converted = toXML(data, {header: false, indent: "  "});
          setOutput(converted);
        } catch (e) {
          console.log(e)
          // @ts-ignore
          setError(e.toString());
        }

        break;
      }
    }
    setError("");
    return;

  }, [inputFormat, outputFormat, input]);


  return (
    <div className="flex flex-col space-y-10">
      <ToolsHeader tool={TOOLS.yamlc}/>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:gap-x-6 justify-center mt-20">
        <div className="flex flex-col lg:items-start">
          <div className="flex justify-between w-full">
            <h2 className="mb-2 text-lg font-semibold">Input</h2>

            { /* @ts-expect-error due to being lazy and whole lotta not my problem, we expect the user not to add their own values to the select */}
            <Select defaultValue={inputFormat} onValueChange={setInputFormat}>
              <SelectTrigger className={"rounded-none border-neutral-800"}>
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                {converters.map((item) => (
                  <SelectItem value={item} key={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TextAreaCodeEditor
            value={input}
            onChange={setInput}
            language="javascript"
            placeholder="Paste your JavaScript object here..."
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold">Output</h2>
          <div className="flex">
            { /* @ts-ignore */}
            <Select defaultValue={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger className={"rounded-none border-neutral-800"}>
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                {converters.map((item) => (
                  <SelectItem value={item} key={item}>{item}</SelectItem>
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
                  Copied <CheckIcon className="inline-block"/>
                </div>
              ) : (
                <>
                  Copy to clipboard <CopyIcon className="inline-block"/>
                </>
              )}
            </button>
          </div>
          </div>
          <textarea
            className="border border-gray-300 outline-none p-3 bg-[#eeeeee] cursor-default font-mono text-sm w-full h-[380px] lg:w-[529px] lg:h-[485px]"
            value={output}

            readOnly
            placeholder="TypeScript type will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
