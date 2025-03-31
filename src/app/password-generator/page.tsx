"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TOOLS } from "@/constants/tools";
import { ReloadIcon } from "@radix-ui/react-icons";
import generator, { type GenerateOptions } from "generate-password-browser";
import { useEffect, useState } from "react";

export default function JSONToJavascript() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(15);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

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

  return (
    <div>
      <ToolsHeader tool={TOOLS[3]} />
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start">
          <Clipboard text={password} />
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
