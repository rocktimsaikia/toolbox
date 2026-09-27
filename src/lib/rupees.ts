import { ToWords } from "to-words";

const toWords = new ToWords({ localeCode: "en-IN" });

// 1 lakh crore. Larger amounts read as "Crore Crore" and never appear on a cheque.
const MAX_RUPEES = 1e12;

export type RupeeAmount = {
  words: string;
  figures: string;
};

// Works on the digits as text so paise never pass through floating point
export function rupeesInWords(input: string): RupeeAmount {
  const cleaned = input
    .trim()
    .replace(/^(₹|rs\.?|inr)\s*/i, "")
    .replace(/[,\s]/g, "");
  if (/^\d+\.\d{3,}$/.test(cleaned)) {
    throw new Error(
      "Paise go up to two decimal places. Round the amount first, such as 45.99.",
    );
  }
  const match = cleaned.match(/^(\d+)(?:\.(\d{1,2}))?$/);
  if (!match) {
    throw new Error("Enter an amount using digits, such as 1250000.75 or 12,50,000.75.");
  }
  const rupees = Number(match[1]);
  const paise = Number((match[2] ?? "").padEnd(2, "0"));
  if (rupees >= MAX_RUPEES) {
    throw new Error("Enter an amount below ₹1,00,000 crore.");
  }

  const rupeeWords = toWords.convert(rupees);
  const paiseWords = paise ? toWords.convert(paise) : "";

  return {
    // "Rupees ... Only" as written on cheques; a zero rupee part is dropped
    words:
      rupees === 0 && paise
        ? `${paiseWords} Paise Only`
        : `Rupees ${rupeeWords}${paise ? ` and ${paiseWords} Paise` : ""} Only`,
    figures: `₹${new Intl.NumberFormat("en-IN").format(rupees)}.${String(paise).padStart(2, "0")}`,
  };
}
