import { TOOLS } from "@/constants/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: TOOLS[4].name,
  description: TOOLS[4].description,
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
