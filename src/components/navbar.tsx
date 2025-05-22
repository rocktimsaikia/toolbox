import Image from "next/image";
import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="row-start-1 w-full flex items-center justify-center">
      <div className="max-w-6xl w-full flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/toolbox.png"
            alt="Tool Box Logo"
            width={60}
            height={60}
            className="inline-block"
          />
          <span className="ml-2 text-lg font-semibold hidden sm:inline-block">
            Tool Box
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/support"
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Coffee className="h-4 w-4 mr-2" />
            Support Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
