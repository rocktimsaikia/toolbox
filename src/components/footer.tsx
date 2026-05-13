import Link from "next/link";

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-4">
        <Link
          href="/support"
          className="flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          Support Us
        </Link>
        <span className="text-gray-400 dark:text-gray-600">•</span>
        <a
          href="https://github.com/rocktimsaikia/toolbox"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          Star on GitHub
        </a>
      </div>
      <div>
        Built with &hearts; by{" "}
        <a
          className="bg-black/[.05] dark:bg-white/[.08] font-semibold"
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
