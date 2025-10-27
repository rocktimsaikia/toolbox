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

const HTML_ESCAPE_FAQ: Faq[] = [
  {
    question: "What does the HTML Escape tool do?",
    answer:
      "The HTML Escape tool converts special characters (like <, >, &, ', and \") in text to their corresponding HTML entities, making the text safe to include in HTML without breaking the page structure.",
  },
  {
    question: "Why do I need to escape HTML characters?",
    answer:
      "Escaping HTML characters prevents text from being interpreted as code when displayed on a website. It's essential for safely displaying user-generated content, code snippets, or any text containing special characters.",
  },
  {
    question: "How do I use the HTML Escape tool?",
    answer:
      "Enter your text in the input field, and the tool will automatically escape the special characters. Toggle between 'Escape' and 'Unescape' to convert in either direction, and use 'Copy to Clipboard' for the result.",
  },
  {
    question: "What characters does HTML escaping convert?",
    answer:
      "HTML escaping typically converts characters like < (less than), > (greater than), & (ampersand), ' (single quote), and \" (double quote) to their corresponding HTML entities (&lt;, &gt;, &amp;, &#39;, and &quot;).",
  },
];

const LINE_BREAK_REMOVER_FAQ: Faq[] = [
  {
    question: "What does the Line Break Remover tool do?",
    answer:
      "The Line Break Remover tool automatically removes unwanted single line breaks from text while preserving paragraph structure. It converts text with line breaks into flowing paragraphs.",
  },
  {
    question: "How does it preserve paragraphs?",
    answer:
      "The tool treats double line breaks (or more) as paragraph separators and keeps them intact. Only single line breaks within paragraphs are removed and replaced with spaces.",
  },
  {
    question: "When would I use this tool?",
    answer:
      "This tool is useful when copying text from PDFs, emails, or documents that have unwanted line breaks, or when preparing text for web content, emails, or documents that need clean formatting.",
  },
  {
    question: "Does it remove all line breaks?",
    answer:
      "No, the tool intelligently preserves paragraph breaks (double line breaks) while only removing single line breaks that interrupt the flow of text within paragraphs.",
  },
];

const LOREM_IPSUM_FAQ: Faq[] = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is placeholder text commonly used in the printing and typesetting industry. Our generator creates customizable Lorem Ipsum text for your designs, layouts, and mockups.",
  },
  {
    question: "How do I customize the generated text?",
    answer:
      "Use the controls to set the number of paragraphs, sentences per paragraph, and words per sentence. Toggle 'Start with Lorem ipsum' to begin with the traditional opening or generate completely random text.",
  },
  {
    question: "Why use Lorem Ipsum instead of regular text?",
    answer:
      "Lorem Ipsum prevents viewers from being distracted by readable content when focusing on design elements. It's the industry standard for placeholder text in web design and print layouts.",
  },
  {
    question: "Can I generate different amounts of text?",
    answer:
      "Yes! Adjust the paragraphs (1-20), sentences per paragraph (1-20), and words per sentence (3-30) to create the perfect amount of placeholder text for your project needs.",
  },
];

const BLANK_CHARACTER_FAQ: Faq[] = [
  {
    question: "What are blank characters and why would I need them?",
    answer:
      "Blank characters are invisible Unicode characters used for fine-tuning text spacing, creating invisible separators, or fixing layout issues. They're useful for designers, developers, and content creators who need precise text control.",
  },
  {
    question: "What's the difference between the various space characters?",
    answer:
      "Different spaces have different widths: En Space (width of 'N'), Em Space (width of 'M'), Thin Space (1/6 em), Hair Space (thinnest), Figure Space (width of digits), and Punctuation Space (width of period). Choose based on your spacing needs.",
  },
  {
    question: "When should I use zero-width characters?",
    answer:
      "Zero-width characters are invisible and useful for: Zero Width Space (line break opportunities), Zero Width Non-Joiner (preventing character joining), Zero Width Joiner (forcing character joining), and Word Joiner (invisible non-breaking space).",
  },
  {
    question: "Are these characters safe to use in all applications?",
    answer:
      "Most modern applications support Unicode characters, but some older systems might not display them correctly. Test in your target environment first, especially for zero-width characters which can affect text selection and copying.",
  },
];

const CRON_EXPRESSION_GENERATOR_FAQ: Faq[] = [
  {
    question: "What is a cron expression?",
    answer:
      "A cron expression is a time-based job scheduler format used in Unix-like systems. It consists of five fields: minute, hour, day-of-month, month, and day-of-week.",
  },
  {
    question: "How do I read a cron expression?",
    answer:
      "Read from left to right: minute (0-59), hour (0-23), day-of-month (1-31), month (1-12), day-of-week (0-7). For example, '0 9 * * 1-5' runs at 9:00 AM on weekdays.",
  },
  {
    question: "What do the special characters mean?",
    answer:
      "Common characters: * (any value), - (range like 1-5), , (list like 1,3,5), / (step values like */5), and L (last day of month). These create flexible scheduling patterns.",
  },
  {
    question: "How can I validate my cron expression?",
    answer:
      "Enter your expression in the tool above to see its human-readable translation. This helps verify the schedule matches your intended timing before implementation.",
  },
];

export const HOME_PAGE_FAQ: Faq[] = [
  {
    question: "What tools are available on Tool Box?",
    answer:
      "Tool Box offers essential tools like JavaScript/JSON to TypeScript Types, Numbers to Words, Password Generator, Base64 Converter, URL Encoder/Decoder, HTML Escape, and What's My IP for various tasks.",
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
    question: "What formats does the Data Format Converter support?",
    answer:
      "The Data Format Converter supports JSON, YAML, TOML, XML, and CSV formats. You can convert between any of these formats seamlessly using the dropdown selectors.",
  },
  {
    question: "How do I use the Data Format Converter?",
    answer:
      "Select your input format from the left dropdown, paste your data in the input field, then choose your desired output format from the right dropdown. The conversion happens automatically as you type.",
  },
  {
    question: "Can I convert CSV data to other formats?",
    answer:
      "Yes! You can convert CSV data to JSON, YAML, TOML, or XML. When converting TO CSV, note that the input data should be in array format for proper CSV generation.",
  },
  {
    question: "What should I do if I get a conversion error?",
    answer:
      "Check that your input data is valid for the selected format. Common issues include malformed JSON, incorrect YAML indentation, or invalid XML structure. The error message will help identify the specific issue.",
  },
  {
    question: "Is my data secure when using this converter?",
    answer:
      "Yes, all conversions happen entirely in your browser. No data is sent to any server, ensuring your information remains private and secure.",
  },
];

const TEXT_TRIMMER_FAQ: Faq[] = [
  {
    question: "What does the Text Trimmer tool do?",
    answer:
      "The Text Trimmer removes unwanted leading (left) and trailing (right) whitespace from your text while preserving the content and line structure. You can choose to trim spaces from either or both sides.",
  },
  {
    question: "How do I use the Text Trimmer?",
    answer:
      "Simply paste or type your text into the input field, then check the boxes for 'Remove leading spaces' or 'Remove trailing spaces' based on your needs. The trimmed result appears instantly in the output field.",
  },
  {
    question: "Does it work on multi-line text?",
    answer:
      "Yes! The Text Trimmer processes each line individually, removing leading and/or trailing spaces from every line while preserving your text's line structure.",
  },
  {
    question: "What types of whitespace does it remove?",
    answer:
      "The tool removes all types of leading and trailing whitespace characters including spaces, tabs, and other whitespace characters, depending on your selected options.",
  },
];

export const Faqs: Record<Slug, Faq[]> = {
  "whats-my-ip": WHATS_MY_IP_FAQ,
  "password-generator": PASSWORD_GENERATOR_FAQ,
  "json-to-ts": JSON_TO_TYPES_FAQ,
  "numbers-to-words": NUMBERS_TO_WORDS_FAQ,
  "base64-converter": BASE64_CONVERTER_FAQ,
  "url-encoder-decoder": URL_ENCODER_DECODER_FAQ,
  "html-escape": HTML_ESCAPE_FAQ,
  "line-break-remover": LINE_BREAK_REMOVER_FAQ,
  "lorem-ipsum": LOREM_IPSUM_FAQ,
  "blank-character": BLANK_CHARACTER_FAQ,
  "cron-expression-generator": CRON_EXPRESSION_GENERATOR_FAQ,
  yamlc: YAMLC_FAQ,
  "text-trimmer": TEXT_TRIMMER_FAQ,
};
