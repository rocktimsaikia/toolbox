import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="row-start-1 w-full flex items-center justify-center">
      <div className="max-w-6xl w-full flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/toolbox-v2.png"
            alt="Toolbelt Logo"
            width={60}
            height={60}
            className="inline-block"
          />
          <span className="ml-2 text-lg font-semibold hidden sm:inline-block">
            Toolbelt
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/support"
            className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
          >
            Support Us
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
