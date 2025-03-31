"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TOOLS } from "@/constants/tools";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon, ReloadIcon } from "@radix-ui/react-icons";
import generator, { type GenerateOptions } from "generate-password-browser";
import { useEffect, useState } from "react";

export default function JSONToJavascript() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(15);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  function handleGeneratePassword() {
    const generateConfig: GenerateOptions = {
      length,
      numbers,
      symbols,
      uppercase,
      lowercase,
    };

    const generatedPassword = generator.generate(generateConfig);
    setPassword(generatedPassword);
  }

  useEffect(() => {
    // Generate a password when the component mounts
    handleGeneratePassword();
  }, []);

  function handleCopyPassword() {
    copyToClipboard(password);
    setIsCopied(true);
  }

  return (
    <div>
      <h1 className="text-center text-3xl">{TOOLS[3].name}</h1>
      <h2 className="text-center text-lg mt-2">{TOOLS[3].description}</h2>
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start">
          <div className="flex justify-end w-full">
            <button
              onClick={handleCopyPassword}
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
            cols={65}
            rows={5}
            className="border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={password}
            readOnly
            placeholder="Your password will appear here..."
          ></textarea>
          <div className="mt-1 flex items-start justify-center gap-x-4">
            <div className="flex flex-col items-center max-w-[70px]">
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label htmlFor="length" className="text-gray-600">
                Length
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
              <label htmlFor="uppercase">Uppercase</label>
            </div>
            <div className="flex items-center space-x-1">
              <Switch id="lowercase" checked={lowercase} onCheckedChange={setLowercase} />
              <label htmlFor="lowercase">Lowercase</label>
            </div>
            <div className="flex items-center space-x-1">
              <Switch id="numbers" checked={numbers} onCheckedChange={setNumbers} />
              <label htmlFor="numbers">Numbers</label>
            </div>
            <div className="flex items-center space-x-1">
              <Switch id="symbols" checked={symbols} onCheckedChange={setSymbols} />
              <label htmlFor="symbols">Symbols</label>
            </div>
          </div>
          <Button
            className="mt-5 cursor-pointer mx-auto"
            onClick={handleGeneratePassword}
          >
            Generate Password <ReloadIcon className="inline-block" />
          </Button>
        </div>
      </div>
    </div>
  );
}
