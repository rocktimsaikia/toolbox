import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="row-start-1 flex items-center justify-center">
      <Link href="/">
        <Image
          src="/toolbox.png"
          alt="Logo"
          width={60}
          height={60}
          className="inline-block"
        />
      </Link>
    </nav>
  );
}
