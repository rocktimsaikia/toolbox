import HashTool from "@/components/hash-tool";
import { TOOLS } from "@/constants/tools";
import { HASH_SAMPLE, hashText } from "@/lib/hash.ts";

// Server component: the sample's hashes are computed at build time and shipped in the HTML
export default async function Page() {
  return (
    <HashTool
      tool={TOOLS["sha256-generator"]}
      sample={HASH_SAMPLE}
      initialHashes={await hashText(HASH_SAMPLE)}
      primary="SHA-256"
    />
  );
}
