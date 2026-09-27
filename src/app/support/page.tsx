import { generateSeo } from "@/lib/seo";
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const metadata = generateSeo({
  title: "Support",
  description:
    "All Toolbelt tools are free to use. If you find them useful, consider supporting development with a BuyMeACoffee membership.",
  path: "/support",
});

const SUPPORT_ITEMS = [
  { id: "maintain", text: "Maintaining and improving existing tools" },
  { id: "new-tools", text: "Adding new tools to the collection" },
  { id: "free", text: "Keeping the service free for everyone" },
  { id: "costs", text: "Server costs and domain renewals" },
  { id: "motivation", text: "Motivating continued development" },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Support Toolbelt</h1>
        <p className="text-lg text-muted-foreground">
          All our tools are completely free and will always remain free.
        </p>
      </header>

      <section className="bg-card text-card-foreground border border-border rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-3">Buy Me a Coffee</h2>
        <p className="text-muted-foreground mb-6">
          If you find our tools useful in your workflow, consider supporting us with a
          BuyMeACoffee membership. Your support helps us maintain and improve these tools.
        </p>
        <a
          href="https://buymeacoffee.com/rocktimsaikia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center whitespace-nowrap px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          Support on BuyMeACoffee
        </a>
      </section>

      <section className="border border-border rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">How Your Support Helps</h2>
        <ul className="space-y-4">
          {SUPPORT_ITEMS.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <CheckIcon
                className="mt-1 h-4 w-4 shrink-0 text-success"
                aria-hidden="true"
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 font-medium hover:underline underline-offset-4"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back to Tools
        </Link>
      </section>
    </div>
  );
}
