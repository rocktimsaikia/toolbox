import { TOOLS } from "@/constants/tools";
import type { Metadata } from "next";

const tool = TOOLS["numbers-to-words"];

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
