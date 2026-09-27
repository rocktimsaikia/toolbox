import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page except whats-my-ip is prerendered and never revalidates, so serve the build
// output from Workers static assets instead of re-rendering on each request.
// ponytail: read-only cache, switch to the R2 cache if a page ever needs ISR/revalidate
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
