# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build for production 
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linting
- `pnpm format` - Format code using Biome

## Project Architecture

This is a Next.js 15 application providing developer tools, built with TypeScript, Tailwind CSS, and Radix UI components.

### Key Architecture Patterns

**App Router Structure**: Each tool follows the pattern `/src/app/{tool-slug}/page.tsx` with dedicated layouts. Tools are self-contained pages with their own routing.

**Tool Configuration**: All tools are centrally configured in `/src/constants/tools.ts` with the `TOOLS` object defining metadata, slugs, and icons. This drives both navigation and SEO generation.

**Component Organization**:
- `/src/components/ui/` - Radix UI-based design system components (ignored by Biome linting)
- `/src/components/` - Application-specific components like `tools-header.tsx`, `code-editor.tsx`
- Reusable `ToolsHeader` component standardizes tool page headers

**SEO System**: Centralized SEO generation in `/src/lib/seo.ts` with `generateSeo()` function. Structured data is handled by `StructuredData` component in root layout.

**Client-Side Processing**: Tools use "use client" directive and process data entirely in the browser for privacy. Common patterns include real-time input processing with `useEffect` hooks.

### Tool Implementation Pattern

Each tool page typically follows this structure:
1. Import tool config from constants
2. Use state for input/output/error handling
3. Real-time processing with useEffect
4. Clipboard functionality via `/src/libs/common.ts`
5. Code editor components for text input/output

### Dependencies

- Next.js 15 with App Router
- TypeScript for type safety
- Biome for linting and formatting (90 char line width, double quotes)
- Radix UI for accessible components
- CodeMirror for code editing interfaces
- Various utility libraries (json-to-ts, html-entities, etc.)

### Styling

- Tailwind CSS with custom configuration
- Dark mode support throughout
- Geist font family (sans and mono variants)
- Responsive grid layouts for tool listings