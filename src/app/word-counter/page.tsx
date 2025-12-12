"use client";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { useEffect, useState } from "react";

interface WordCountStats {
  words: number;
  sentences: number;
  charactersWithoutSpaces: number;
  charactersWithSpaces: number;
  paragraphs: number;
  readingTime: string;
}

export default function WordCounter() {
  const [inputText, setInputText] = useState("");
  const [stats, setStats] = useState<WordCountStats>({
    words: 0,
    sentences: 0,
    charactersWithoutSpaces: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    readingTime: "0m 0s",
  });

  const countWords = (text: string): number => {
    if (!text.trim()) return 0;
    // Split by whitespace and filter out empty strings
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const countSentences = (text: string): number => {
    if (!text.trim()) return 0;
    // Count sentences ending with . ! ?
    const sentences = text.match(/[.!?]+/g);
    return sentences ? sentences.length : 0;
  };

  const countParagraphs = (text: string): number => {
    if (!text.trim()) return 0;
    // Split by double newlines and count non-empty paragraphs
    const paragraphs = text.split(/\n\n+/).filter((para) => para.trim().length > 0);
    return paragraphs.length;
  };

  const calculateReadingTime = (wordCount: number): string => {
    // Average reading speed: 200 words per minute
    const minutes = Math.floor(wordCount / 200);
    const seconds = Math.round(((wordCount % 200) / 200) * 60);
    return `${minutes}m ${seconds}s`;
  };

  const analyzeText = (text: string): WordCountStats => {
    const words = countWords(text);
    const sentences = countSentences(text);
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;
    const paragraphs = countParagraphs(text);
    const readingTime = calculateReadingTime(words);

    return {
      words,
      sentences,
      charactersWithoutSpaces,
      charactersWithSpaces,
      paragraphs,
      readingTime,
    };
  };

  useEffect(() => {
    setStats(analyzeText(inputText));
  }, [inputText]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["word-counter"]} />
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-start w-full max-w-[1100px]">
          <h2 className="mb-2 lg:text-lg font-semibold">Text</h2>
          <textarea
            className="w-full h-40 lg:h-[200px] border border-gray-300 rounded outline-none p-3 resize-none font-mono text-sm"
            value={inputText}
            spellCheck={false}
            placeholder="Enter your text here to count words, characters, sentences, and more..."
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-8 w-full max-w-[1100px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start p-4 border border-gray-300 rounded">
              <span className="text-gray-600 text-sm lg:text-base">
                Characters without spaces
              </span>
              <span className="text-2xl lg:text-3xl font-bold text-green-600">
                {stats.charactersWithoutSpaces}
              </span>
            </div>
            <div className="flex flex-col items-start p-4 border border-gray-300 rounded">
              <span className="text-gray-600 text-sm lg:text-base">
                Characters with spaces
              </span>
              <span className="text-2xl lg:text-3xl font-bold text-green-600">
                {stats.charactersWithSpaces}
              </span>
            </div>
            <div className="flex flex-col items-start p-4 border border-gray-300 rounded">
              <span className="text-gray-600 text-sm lg:text-base">Words</span>
              <span className="text-2xl lg:text-3xl font-bold text-green-600">
                {stats.words}
              </span>
            </div>
            <div className="flex flex-col items-start p-4 border border-gray-300 rounded">
              <span className="text-gray-600 text-sm lg:text-base">Sentences</span>
              <span className="text-2xl lg:text-3xl font-bold text-green-600">
                {stats.sentences}
              </span>
            </div>
            <div className="flex flex-col items-start p-4 border border-gray-300 rounded">
              <span className="text-gray-600 text-sm lg:text-base">Paragraphs</span>
              <span className="text-2xl lg:text-3xl font-bold text-green-600">
                {stats.paragraphs}
              </span>
            </div>
            <div className="flex flex-col items-start p-4 border border-gray-300 rounded">
              <span className="text-gray-600 text-sm lg:text-base">Reading Time</span>
              <span className="text-2xl lg:text-3xl font-bold text-green-600">
                {stats.readingTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
