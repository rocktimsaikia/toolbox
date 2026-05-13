"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOOLS } from "@/constants/tools";
import { useState } from "react";

const BLANK_CHARACTERS = [
  {
    name: "Blank Character",
    character: "\u200B",
    unicode: "U+200B",
    description: "Invisible character for spacing and formatting",
  },
];

export default function BlankCharacterTool() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testInput, setTestInput] = useState("");

  const copyToClipboard = async (character: string, id: string) => {
    try {
      await navigator.clipboard.writeText(character);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <ToolsHeader tool={TOOLS["blank-character"]} />
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-md">
          {BLANK_CHARACTERS.map((blank, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-6 bg-card hover:bg-muted transition-colors"
            >
              <div className="text-center mb-4">
                <h3 className="font-semibold text-xl mb-2">{blank.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{blank.unicode}</p>
                <p className="text-sm text-muted-foreground">{blank.description}</p>
              </div>

              <div className="mb-4 p-3 bg-muted rounded border border-border min-h-[50px] font-mono text-sm flex items-center justify-center">
                <span className="text-muted-foreground">[Invisible]</span>
              </div>

              <Button
                onClick={() => copyToClipboard(blank.character, blank.unicode)}
                className="w-full"
                size="lg"
              >
                {copiedId === blank.unicode ? "Copied!" : "Copy Blank Character"}
              </Button>
            </div>
          ))}

          <div className="mt-6 p-4 border border-border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-3">Test Field</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Paste the blank character here to verify it was copied:
            </p>
            <Input
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Paste here to test..."
              className={`w-full ${testInput.includes("\u200B") ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}`}
            />
            {testInput && (
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Character count: {testInput.length}
                </p>
                {testInput.includes("\u200B") && (
                  <p className="text-xs text-green-600 font-semibold">
                    ✓ Blank character detected!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
