import { TOOLS } from "@/constants/tools";
import { Link1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Tools",
  description: "Some essential tools to make our life easier",
};

export default function Home() {
  return (
    <div>
      <div className="text-center mb-8">
        <Image
          src="/toolbox.png"
          alt="Logo"
          width={150}
          height={150}
          className="inline-block"
        />
        <h1 className="text-xl">
          A Collection of essential tools to make our life easier.
        </h1>
      </div>
      <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {TOOLS.map((tool) => (
          <li className="mb-3 tracking-[-.01em]" key={tool.name}>
            <Link href={tool.path}>
              <code className="bg-black/[.05] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold text-base">
                {tool.name} <Link1Icon className="inline-block" />
              </code>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
