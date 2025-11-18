---
description: Create a new tool page with layout, FAQ, and configuration
args:
  requirements:
    description: Tool requirements and specifications
---

Create a new tool page based on the following specifications: {{requirements}}

Follow these steps carefully:

1. **Parse the requirements** to extract:
   - Tool name (e.g., "Text Trimmer")
   - Tool slug (kebab-case, e.g., "text-trimmer")
   - Tool description (short, one-line)
   - Icon name from available icons: type, hash, key, arrowUpDown, link, wifi, code, alignLeft, fileText, copy, clock, scissors
   - Core functionality description
   - Input/output types
   - Any options or configuration toggles

2. **Create the tool directory** at `/src/app/{slug}/`

3. **Create the page component** (`page.tsx`) following this pattern:
   - Use "use client" directive
   - Import necessary components (ToolsHeader, Clipboard from appropriate paths)
   - Import TOOLS constant for tool metadata
   - Use useState for inputs, outputs, and options
   - Implement the core logic function
   - Use useEffect to process changes in real-time
   - Follow the layout pattern from text-trimmer with:
     - Input textarea on the left
     - Output textarea on the right (read-only with gray background)
     - Clipboard button in output header
     - Options/toggles below the input/output areas
   - Use the standard classes and styling patterns

4. **Create the layout component** (`layout.tsx`) following this pattern:
   - Import Faq, Utterances, Faqs, TOOLS, and generateSeo
   - Define slug constant
   - Generate metadata using generateSeo
   - Export default layout that renders children, Faq, and Utterances

5. **Add tool to constants** (`/src/constants/tools.ts`):
   - Add the new tool entry to the TOOLS object
   - Use appropriate icon from available icons
   - Follow the existing format

6. **Add FAQ entries** (`/src/constants/faq.ts`):
   - Create 3-4 relevant FAQ items in a constant array
   - Add the FAQ array to the Faqs record export
   - Questions should cover: what the tool does, how to use it, why use it, and common concerns

7. **Update icons if needed** (`/src/components/ui/icons.tsx`):
   - Only if a new icon is required and not available in the current set
   - Import from lucide-react
   - Add to Icons object with iconStyle
   - Make sure to also import the LucideIcon type if needed

**Important Guidelines:**
- Follow the exact patterns from existing tools like text-trimmer
- Use TypeScript with proper typing
- Implement client-side processing for privacy (no server calls)
- Use Tailwind CSS classes matching existing patterns
- Ensure responsive design with lg: breakpoints
- Add proper placeholder text
- Include copy-to-clipboard functionality
- Use the standard monospace font for code/text areas (font-mono)
- Follow Biome formatting (90 char line width, double quotes)
- Make the tool process input in real-time using useEffect

After creating all files, provide a summary of:
1. Files created
2. Tool slug and path
3. How to test the tool (visit /[slug] after running `pnpm dev`)
