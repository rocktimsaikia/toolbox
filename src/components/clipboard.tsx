"use client";
import { copyToClipboard } from "@/libs/common";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface Props {
  text: string;
}

export default function Clipboard({ text }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyPassword() {
    copyToClipboard(text);
    setIsCopied(true);
  }

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
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
  );
}
