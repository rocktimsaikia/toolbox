import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-4">
        <Link
          href="/support"
          className="flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          <Coffee className="h-4 w-4 mr-1" />
          Support Us
        </Link>
      </div>
      <div>
        Built with &hearts; by{" "}
        <a
          className="bg-black/[.05] font-semibold"
          href="https://rocktim.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          @rocktimsaikia
        </a>
      </div>
    </footer>
  );
}
