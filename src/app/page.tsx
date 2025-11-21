import Faq from "@/components/faq";
import { HOME_PAGE_FAQ } from "@/constants/faq";
import { siteConfig } from "@/constants/site";
import { tools, type Tool } from "@/constants/tools";
import { Icons } from "@/components/ui/icons";
import { ArrowRight, Zap, Lock, CheckCircle, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Essential Developer Tools - Free Online Utilities for Programmers",
  description:
    "A collection of free, fast, and easy-to-use developer tools including JSON to TypeScript, Base64 Encoder/Decoder, HTML Escape, Password Generator, and more to streamline your development workflow.",
  keywords: [
    "developer tools",
    "web development utilities",
    "JSON to TypeScript",
    "Base64 converter",
    "HTML escape tool",
    "password generator",
    "URL encoder decoder",
    "online development tools",
    "programming utilities",
  ],
  openGraph: {
    title: "Essential Developer Tools - Free Online Utilities for Programmers",
    description:
      "A collection of free, fast, and easy-to-use developer tools to streamline your development workflow.",
    type: "website",
    url: siteConfig.url,
    siteName: "Tool Box - Essential Developer Tools",
  },
};

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <header className="text-center mb-12 py-8">
        <div className="flex flex-col items-center">
          <Image
            src="/toolbox.png"
            alt="Tool Box Logo - Essential Developer Tools"
            width={150}
            height={150}
            className="inline-block mb-4"
            priority
          />
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Essential Developer Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Free, fast, and easy-to-use online tools to streamline your development
            workflow. No sign-up required. Just pick a tool and get started!
          </p>
        </div>
      </header>

      <section className="mb-12">
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool: Tool) => (
            <li
              key={tool.name}
              className="group bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800/50"
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <Link
                href={`/${tool.slug}`}
                className="block hover:no-underline"
                itemProp="url"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400">
                    {Icons[tool.icon] || <Code className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate"
                      itemProp="name"
                    >
                      {tool.name}
                    </h3>
                    <p
                      className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2"
                      itemProp="description"
                    >
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center">Frequently Asked Questions</h2>
        <Faq faq={HOME_PAGE_FAQ} />
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-12 border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Why Choose Our Tools?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {[
            {
              id: "free-no-signup",
              title: "Free & No Sign-up",
              description:
                "All our tools are completely free to use with no registration required.",
              icon: <CheckCircle className="h-6 w-6" />,
              color: "text-green-600 dark:text-green-400",
            },
            {
              id: "fast-reliable",
              title: "Fast & Reliable",
              description:
                "Our tools are optimized for speed and reliability, working directly in your browser.",
              icon: <Zap className="h-6 w-6" />,
              color: "text-yellow-600 dark:text-yellow-400",
            },
            {
              id: "privacy-focused",
              title: "Privacy Focused",
              description:
                "Your data stays in your browser. We don't store or track your information.",
              icon: <Lock className="h-6 w-6" />,
              color: "text-blue-600 dark:text-blue-400",
            },
          ].map((feature) => (
            <div
              key={feature.id}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-gray-800"
            >
              <div
                className={`w-12 h-12 ${feature.color} bg-opacity-10 dark:bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
