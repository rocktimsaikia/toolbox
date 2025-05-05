import type { Slug } from "@/constants/tools";

export type Faq = {
  question: string;
  answer: string;
};

const WHATS_MY_IP_FAQ: Faq[] = [
  {
    question: "What is a public IP address?",
    answer:
      "A public IP address is a unique identifier assigned to your device by your internet service provider (ISP) that allows it to communicate over the internet. Our 'What's My IP' tool instantly displays this address for you.",
  },
  {
    question: "Why do I need to know my public IP address?",
    answer:
      "Knowing your public IP address can help with troubleshooting network issues, setting up remote access, or verifying your location for certain online services. Use this tool to quickly find it!",
  },
  {
    question: "How often does my public IP address change?",
    answer:
      "Your public IP address may change depending on your ISP and whether you have a dynamic or static IP. Dynamic IPs can change periodically, while static IPs remain constant—check yours anytime with our tool.",
  },
  {
    question: "Is my IP address private or secure?",
    answer:
      "The 'What's My IP' tool only shows your public IP, which is visible to websites and services you connect to. It doesn’t reveal private details, but for security, consider using a VPN to mask your IP.",
  },
  {
    question: "Does it show the IPv4 or IPv6 address?",
    answer:
      "The 'What's My IP' tool displays both IPv4 and IPv6 addresses. But if IPv6 is not enabled on your device or router, it will only show IPv4 address.",
  },
];

const PASSWORD_GENERATOR_FAQ: Faq[] = [
  {
    question: "What makes a password secure?",
    answer:
      "A secure password is long, random, and includes a mix of uppercase, lowercase, numbers, and symbols. Our Password Generator creates strong passwords to protect your accounts.",
  },
  {
    question: "How do I customize my password?",
    answer:
      "Use the toggles for uppercase, lowercase, numbers, and symbols, and adjust the length slider. Our tool generates a random password based on your settings.",
  },
  {
    question: "Why use a random password generator?",
    answer:
      "Random passwords are harder to guess or crack than simple ones like 'password123.' Our tool helps you create secure passwords effortlessly.",
  },
  {
    question: "How do I save my generated password?",
    answer:
      "After generating, click 'Copy to clipboard' to save your password. Store it securely, as the tool doesn’t save it for you.",
  },
];

const BASE64_CONVERTER_FAQ: Faq[] = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 encoding converts text into a string of ASCII characters, making it safe to transmit over text-based systems. Use our Base64 Converter to encode or decode text easily.",
  },
  {
    question: "How do I use the Base64 Converter?",
    answer:
      "Enter your text in the input field, toggle between 'Encode' or 'Decode,' and the tool will convert it instantly. Use the 'Copy to Clipboard' button to save the result.",
  },
  {
    question: "Why would I need to convert text to Base64?",
    answer:
      "Converting text to Base64 is useful for tasks like embedding text data in code, sharing it via text-only platforms, or preparing it for APIs. Our converter makes it quick and simple.",
  },
  {
    question: "Is Base64 encoding secure for sensitive text?",
    answer:
      "No, Base64 encoding isn’t encryption—it only reformats text, not secures it. Use our tool for text encoding and decoding, but not for protecting confidential data.",
  },
];

const NUMBERS_TO_WORDS_FAQ: Faq[] = [
  {
    question: "What does the Numbers to Words tool do?",
    answer:
      "The Numbers to Words tool converts numeric values into their written word form, such as turning '12345' into 'twelve thousand three hundred forty-five.' It also supports currency formats.",
  },
  {
    question: "How do I convert numbers to currency words?",
    answer:
      "Enter your number, select the 'Show Currency' option, and choose your currency type. The tool will convert it, for example, '50.75' becomes 'fifty dollars and seventy-five cents.'",
  },
  {
    question: "Why use a Numbers to Words converter?",
    answer:
      "Converting numbers to words is useful for writing checks, creating invoices, or making financial documents more readable. Our tool simplifies this process instantly.",
  },
  {
    question: "Does the tool support different languages or currencies?",
    answer:
      "Yes, our Numbers to Words tool supports multiple languages and currencies, such as USA (English, en-US). Select your preferred option to get accurate conversions.",
  },
];

const URL_ENCODER_DECODER_FAQ: Faq[] = [
  {
    question: "What does a URL Encoder/Decoder do?",
    answer:
      "A URL Encoder converts special characters in a URL into a format safe for web use, while a Decoder reverses the process. Our tool helps you encode or decode URLs instantly.",
  },
  {
    question: "Why do I need to encode a URL?",
    answer:
      "Encoding a URL ensures special characters, like spaces or symbols, are properly formatted for web browsers and servers to understand, preventing errors in links or queries.",
  },
  {
    question: "How do I use the URL Encoder/Decoder?",
    answer:
      "Paste your URL into the input box, toggle between 'Encode' or 'Decode,' and the tool will instantly convert your URL. Use the 'Copy to Clipboard' button to save the result.",
  },
  {
    question: "Is URL encoding the same as encryption?",
    answer:
      "No, URL encoding formats characters for safe web use but doesn’t secure data. It’s not encryption, so don’t use it to protect sensitive information in URLs.",
  },
];

const JSON_TO_TYPES_FAQ: Faq[] = [
  {
    question: "What does the JavaScript/JSON to TypeScript Types tool do?",
    answer:
      "This tool converts JavaScript objects or JSON data into TypeScript type definitions, helping you define structured types for better code safety and autocompletion.",
  },
  {
    question: "How do I use the JavaScript/JSON to TypeScript Types converter?",
    answer:
      "Paste your JavaScript object or JSON data into the input field, and the tool will automatically generate the corresponding TypeScript types. Copy the result using the 'Copy to Clipboard' button.",
  },
  {
    question: "Why should I convert JSON to TypeScript types?",
    answer:
      "Converting JSON to TypeScript types ensures type safety in your TypeScript projects, reducing errors and improving code maintainability, especially when working with APIs or external data.",
  },
  {
    question: "Can this tool handle nested JavaScript objects?",
    answer:
      "Yes, the tool supports nested JavaScript objects and JSON data, generating accurate TypeScript interfaces for complex structures, including arrays and nested properties.",
  },
];

export const HOME_PAGE_FAQ: Faq[] = [
  {
    question: "What tools are available on Tool Box?",
    answer:
      "Tool Box offers essential tools like JavaScript/JSON to TypeScript Types, Numbers to Words, Password Generator, Base64 Converter, URL Encoder/Decoder, and What's My IP for various tasks.",
  },
  {
    question: "How can Tool Box make my life easier?",
    answer:
      "Tool Box provides quick solutions for coding, data conversion, and security tasks, such as generating passwords, encoding URLs, or converting numbers to words, all in one place.",
  },
  {
    question: "Are the tools on Tool Box free to use?",
    answer:
      "Yes, all tools on Tool Box, including the Password Generator, Base64 Converter, and more, are completely free to use with no sign-up required.",
  },
  {
    question: "Who can benefit from using Tool Box?",
    answer:
      "Developers, students, and professionals can benefit from Tool Box. It simplifies tasks like TypeScript type generation, IP lookup, and secure password creation for everyone.",
  },
];

export const YAMLC_FAQ: Faq[] = [
  {
    question: "why",
    answer:
      "sometimes you just get data in the wrong format. but this tool makes it easy to convert from one to anotehr",
  },
];

export const Faqs: Record<Slug, Faq[]> = {
  "whats-my-ip": WHATS_MY_IP_FAQ,
  "password-generator": PASSWORD_GENERATOR_FAQ,
  "json-to-types": JSON_TO_TYPES_FAQ,
  "numbers-to-words": NUMBERS_TO_WORDS_FAQ,
  "base64-converter": BASE64_CONVERTER_FAQ,
  "url-encoder-decoder": URL_ENCODER_DECODER_FAQ,
  yamlc: YAMLC_FAQ,
};
