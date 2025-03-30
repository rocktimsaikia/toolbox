import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Javascript Object to Typescript Types | Tools",
  description: "Convert Javascript object to Typescript types",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
