"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOOLS } from "@/constants/tools";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function JSONToJavascript() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(15);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  async function handleGeneratePassword() {
    const generator = (await import("generate-password-browser")).default;
    const generateConfig = {
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
    void handleGeneratePassword();
  }, []);

  return (
    <div>
      <ToolsHeader tool={TOOLS["password-generator"]} />
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <Clipboard text={password} />
          <textarea
            className="w-full lg:w-[572px] lg:h-[126px] border border-border rounded outline-none p-3 resize-none bg-muted text-foreground cursor-default font-mono text-sm"
            value={password}
            readOnly
            placeholder="Your password will appear here..."
          ></textarea>
          <div className="mt-1 flex lg:flex-row flex-col lg:space-y-0 space-y-2 items-start justify-center lg:gap-x-4">
            <div className="flex flex-col items-center max-w-[70px]">
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label htmlFor="length" className="text-muted-foreground">
                Length
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                id="uppercase"
                type="checkbox"
                checked={uppercase}
                onChange={(event) => setUppercase(event.target.checked)}
                className="cursor-pointer accent-primary"
              />
              <label htmlFor="uppercase">Uppercase</label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                id="lowercase"
                type="checkbox"
                checked={lowercase}
                onChange={(event) => setLowercase(event.target.checked)}
                className="cursor-pointer accent-primary"
              />
              <label htmlFor="lowercase">Lowercase</label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                id="numbers"
                type="checkbox"
                checked={numbers}
                onChange={(event) => setNumbers(event.target.checked)}
                className="cursor-pointer accent-primary"
              />
              <label htmlFor="numbers">Numbers</label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                id="symbols"
                type="checkbox"
                checked={symbols}
                onChange={(event) => setSymbols(event.target.checked)}
                className="cursor-pointer accent-primary"
              />
              <label htmlFor="symbols">Symbols</label>
            </div>
          </div>
          <Button
            className="mt-5 cursor-pointer mx-auto"
            onClick={() => void handleGeneratePassword()}
          >
            Generate Password <ReloadIcon className="inline-block" />
          </Button>
        </div>
      </div>
    </div>
  );
}
