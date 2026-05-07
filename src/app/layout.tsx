import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import Script from "next/script";
import { generateSeo } from "@/lib/seo";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

// Generate metadata using our SEO utility
export const metadata = generateSeo();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: theme init must run before paint to avoid FOUC */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} antialiased bg-background text-foreground`}
      >
        <GoogleAnalytics gaId="G-HMXMKZ0LGM" />
        <StructuredData />
        <div className="min-h-screen flex flex-col font-sans text-foreground antialiased">
          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <Navbar />
          </div>
          <main className="flex-1 w-full flex flex-col items-center px-4 sm:px-8">
            {children}
          </main>
          <div className="px-4 py-8 sm:px-8 pb-20">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
