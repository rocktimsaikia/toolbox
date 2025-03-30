import { BackpackIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const metadata = {
  title: "Tools",
  description: "Some essential tools to make our life easier",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-center sm:text-left">
            Tools <BackpackIcon className="inline-block h-5 w-5 mb-0" />
          </h1>
          <h2 className="text-xl text-center sm:text-left mt-2">
            Some essential tools to make our life easier
          </h2>
        </div>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            <Link href="/object-to-typescript" className="underline">
              <code className="bg-black/[.05] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Javascript Object to Typescript Types
              </code>
            </Link>
          </li>
        </ol>
      </main>
      <footer className="row-start-3 flex items-center justify-center">
        <div>
          Built with &hearts; by{" "}
          <a
            className="bg-black/[.05] font-semibold"
            href="https://rocktimsaikia.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            @rocktimsaikia
          </a>
        </div>
      </footer>
    </div>
  );
}
