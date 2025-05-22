import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import { Geist, Geist_Mono } from "next/font/google";
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

// Generate metadata using our SEO utility
export const metadata = generateSeo();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StructuredData />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="0d4f34b3-2799-42a6-b815-77c36e45aae8"
        />
        <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20 font-sans text-foreground antialiased">
          <Navbar />
          <main className="flex-1 w-full flex flex-col items-center">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
