// Self-check for rupees.ts. Run: node src/lib/rupees.check.mjs
import assert from "node:assert/strict";
import { rupeesInWords } from "./rupees.ts";

assert.deepEqual(rupeesInWords("12,50,000.75"), {
  words: "Rupees Twelve Lakh Fifty Thousand and Seventy Five Paise Only",
  figures: "₹12,50,000.75",
});
assert.equal(rupeesInWords("1").words, "Rupees One Only");
assert.equal(rupeesInWords("₹ 1,00,00,000").words, "Rupees One Crore Only");
assert.equal(rupeesInWords("Rs. 45.5").words, "Rupees Forty Five and Fifty Paise Only");
assert.equal(rupeesInWords("0.05").words, "Five Paise Only");
assert.equal(rupeesInWords("0").words, "Rupees Zero Only");
assert.equal(rupeesInWords("INR 999999999999.99").figures, "₹9,99,99,99,99,999.99");

assert.throws(() => rupeesInWords("45.999"), /two decimal places/);
assert.throws(() => rupeesInWords("-5"), /digits/);
assert.throws(() => rupeesInWords("12a"), /digits/);
assert.throws(() => rupeesInWords("1000000000000"), /below/);

console.log("rupees ok");
