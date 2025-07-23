"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TOOLS } from "@/constants/tools";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "at",
  "vero",
  "eos",
  "accusamus",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "et",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "sunt",
  "explicabo",
  "nemo",
  "ipsam",
  "voluptatem",
  "quia",
  "voluptas",
  "aspernatur",
  "aut",
  "odit",
  "fugit",
  "sed",
  "quia",
  "consequuntur",
  "magni",
  "dolores",
  "ratione",
  "sequi",
  "neque",
  "porro",
  "quisquam",
  "dolorem",
  "adipisci",
  "numquam",
  "eius",
  "modi",
  "tempora",
  "incidunt",
  "magnam",
  "quaerat",
  "voluptatem",
];

function generateLoremIpsum(
  paragraphs: number,
  sentencesPerParagraph: number,
  wordsPerSentence: number,
  startWithLorem: boolean,
): string {
  const result: string[] = [];

  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];

    for (let s = 0; s < sentencesPerParagraph; s++) {
      const words: string[] = [];

      for (let w = 0; w < wordsPerSentence; w++) {
        if (p === 0 && s === 0 && w === 0 && startWithLorem) {
          words.push("Lorem");
        } else if (p === 0 && s === 0 && w === 1 && startWithLorem) {
          words.push("ipsum");
        } else {
          const randomWord = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
          words.push(
            w === 0
              ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1)
              : randomWord,
          );
        }
      }

      sentences.push(words.join(" ") + ".");
    }

    result.push(sentences.join(" "));
  }

  return result.join("\n\n");
}

export default function LoremIpsumGenerator() {
  const [loremText, setLoremText] = useState("");
  const [paragraphs, setParagraphs] = useState(3);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(4);
  const [wordsPerSentence, setWordsPerSentence] = useState(8);
  const [startWithLorem, setStartWithLorem] = useState(true);

  function handleGenerateText() {
    const generated = generateLoremIpsum(
      paragraphs,
      sentencesPerParagraph,
      wordsPerSentence,
      startWithLorem,
    );
    setLoremText(generated);
  }

  useEffect(() => {
    handleGenerateText();
  }, [paragraphs, sentencesPerParagraph, wordsPerSentence, startWithLorem]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["lorem-ipsum"]} />
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full">
          <Clipboard text={loremText} />
          <textarea
            className="w-full lg:w-[572px] lg:h-[300px] border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default font-mono text-sm"
            value={loremText}
            readOnly
            placeholder="Your Lorem Ipsum text will appear here..."
          ></textarea>
          <div className="mt-4 flex lg:flex-row flex-col lg:space-y-0 space-y-4 items-start justify-center lg:gap-x-6 gap-y-2">
            <div className="flex flex-col items-center max-w-[100px]">
              <Input
                id="paragraphs"
                type="number"
                min="1"
                max="20"
                value={paragraphs}
                onChange={(e) => setParagraphs(Math.max(1, Number(e.target.value)))}
              />
              <label htmlFor="paragraphs" className="text-gray-600 text-sm mt-1">
                Paragraphs
              </label>
            </div>
            <div className="flex flex-col items-center max-w-[100px]">
              <Input
                id="sentences"
                type="number"
                min="1"
                max="20"
                value={sentencesPerParagraph}
                onChange={(e) =>
                  setSentencesPerParagraph(Math.max(1, Number(e.target.value)))
                }
              />
              <label htmlFor="sentences" className="text-gray-600 text-sm mt-1">
                Sentences
              </label>
            </div>
            <div className="flex flex-col items-center max-w-[100px]">
              <Input
                id="words"
                type="number"
                min="3"
                max="30"
                value={wordsPerSentence}
                onChange={(e) => setWordsPerSentence(Math.max(3, Number(e.target.value)))}
              />
              <label htmlFor="words" className="text-gray-600 text-sm mt-1">
                Words/Sentence
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="startWithLorem"
                checked={startWithLorem}
                onCheckedChange={setStartWithLorem}
              />
              <label htmlFor="startWithLorem" className="text-sm">
                Start with "Lorem ipsum"
              </label>
            </div>
          </div>
          <Button className="mt-6 cursor-pointer mx-auto" onClick={handleGenerateText}>
            Generate New Text <ReloadIcon className="inline-block ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
