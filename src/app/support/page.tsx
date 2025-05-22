import Link from "next/link";
import { Coffee } from "lucide-react";
import { siteConfig } from "@/constants/site";

export const metadata = {
  title: "Support Us - Tool Box",
  description:
    "All our tools are free to use. If you find them useful, consider supporting us with a BuyMeACoffee membership.",
  openGraph: {
    title: "Support Us - Tool Box",
    description:
      "All our tools are free to use. If you find them useful, consider supporting us with a BuyMeACoffee membership.",
    type: "website",
    url: `${siteConfig.url}/support`,
    siteName: "Tool Box - Essential Developer Tools",
  },
};

export default function SupportPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Support Tool Box
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          All our tools are completely free and will always remain free.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 dark:text-yellow-400">
            <Coffee className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Buy Me a Coffee</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you find our tools useful in your workflow, consider supporting us with a
            BuyMeACoffee membership. Your support helps us maintain and improve these
            tools.
          </p>
          <a
            href="https://buymeacoffee.com/rocktimsaikia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 hover:shadow-lg"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Support on BuyMeACoffee
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          How Your Support Helps
        </h2>
        <ul className="space-y-4">
          {[
            { id: "maintain", text: "Maintaining and improving existing tools" },
            { id: "new-tools", text: "Adding new tools to the collection" },
            { id: "free", text: "Keeping the service free for everyone" },
            { id: "costs", text: "Server costs and domain renewals" },
            { id: "motivation", text: "Motivating continued development" },
          ].map((item) => (
            <li key={item.id} className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby={`check-icon-${item.id}`}
                >
                  <title id={`check-icon-${item.id}`}>Checkmark icon</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-labelledby="back-arrow-icon"
            >
              <title id="back-arrow-icon">Back arrow icon</title>
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
