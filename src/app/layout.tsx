import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import { generateSeo } from "@/lib/seo";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata using our SEO utility
export const metadata = generateSeo();

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-HMXMKZ0LGM";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {gaId ? (
          <>
            <Script id="google-analytics-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
            <Script
              id="google-analytics"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
          </>
        ) : null}
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
