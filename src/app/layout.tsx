import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import Utterances from "@/components/utterances";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import Script from "next/script";
import { generateSeo } from "@/lib/seo";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} antialiased`}
      >
        <StructuredData />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="0d4f34b3-2799-42a6-b815-77c36e45aae8"
        />
        <div className="min-h-screen flex flex-col font-sans text-foreground antialiased">
          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <Navbar />
          </div>
          <main className="flex-1 w-full flex flex-col items-center px-4 sm:px-8">
            {children}
          </main>
          <div className="px-4 py-8 sm:px-8 pb-20">
            <Footer />
            <div className="mt-8">
              <Utterances />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
