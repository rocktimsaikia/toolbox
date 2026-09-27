import { type Slug, tools } from "@/constants/tools";

// Built from TOOLS so the answer never goes stale when a tool is added
const visibleTools = tools.filter((tool) => !("hide" in tool));

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
      "Set the length, tick uppercase, lowercase, numbers, and symbols as needed, then click Generate Password. The password is created on your device from those settings.",
  },
  {
    question: "Why use a random password generator?",
    answer:
      "Random passwords are harder to guess or crack than simple ones like 'password123.' Our tool helps you create secure passwords effortlessly.",
  },
  {
    question: "How do I save my generated password?",
    answer:
      "After generating, click Copy to take your password. Store it securely, as the tool doesn’t save it for you.",
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
      "Choose Encode or Decode above the boxes, then type or paste into the input. The result updates as you type; click Copy to take it.",
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
      "Choose Encode or Decode above the boxes, then paste your text or URL into the input. The result updates as you type; click Copy to take it.",
  },
  {
    question: "Is URL encoding the same as encryption?",
    answer:
      "No, URL encoding formats characters for safe web use but doesn’t secure data. It’s not encryption, so don’t use it to protect sensitive information in URLs.",
  },
];

const URL_PARSER_FAQ: Faq[] = [
  {
    question: "What does the URL Parser do?",
    answer:
      "It splits a URL into its parts - protocol, host, port, path segments, query parameters, and the fragment - and decodes every value so long tracking links and redirect URLs become easy to read.",
  },
  {
    question: "How do I use the URL Parser?",
    answer:
      "Paste any URL into the box. The breakdown updates as you type. Copy any value with the copy icon next to it. If a parameter holds another URL, such as a redirect_uri, click Parse to open it.",
  },
  {
    question: "Does it handle repeated and encoded parameters?",
    answer:
      "Yes. Repeated keys like size=42&size=43 are listed in order and marked as repeated, and percent-encoded values and plus signs are decoded. Malformed encodings are shown as-is instead of failing.",
  },
  {
    question: "Is my URL sent anywhere?",
    answer:
      "No. Parsing happens entirely in your browser using the built-in URL API. Nothing you paste leaves your device, so it is safe for links that contain tokens or session IDs.",
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
      "Paste your JavaScript object or JSON data into the input field, and the tool will automatically generate the corresponding TypeScript types. Click Copy to take the result.",
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
      "Enter your text in the input field, and the tool will automatically escape the special characters. Choose Escape or Unescape to convert in either direction, and click Copy to take the result.",
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
      "Paste it into the tool. It checks that there are five fields and that every value is in range, then describes the schedule in plain English, so you can confirm the timing before you deploy it.",
  },
  {
    question: "Can I build an expression without knowing the syntax?",
    answer:
      "Yes. Pick a value for each field, such as Every 15 min, 09:00, and Weekdays, and the expression is written for you. You can also start from one of the common schedules and adjust it.",
  },
];

export const HOME_PAGE_FAQ: Faq[] = [
  {
    question: "What tools are available on Toolbelt?",
    answer: `Toolbelt has ${visibleTools.length} free tools: ${new Intl.ListFormat("en", {
      type: "conjunction",
    }).format(visibleTools.map((tool) => tool.name))}.`,
  },
  {
    question: "How can Toolbelt make my life easier?",
    answer:
      "Toolbelt provides quick solutions for coding, data conversion, and security tasks, such as generating passwords, encoding URLs, or converting numbers to words, all in one place.",
  },
  {
    question: "Are the tools on Toolbelt free to use?",
    answer:
      "Yes, all tools on Toolbelt, including the Password Generator, Base64 Converter, and more, are completely free to use with no sign-up required.",
  },
  {
    question: "Who can benefit from using Toolbelt?",
    answer:
      "Developers, students, and professionals can benefit from Toolbelt. It simplifies tasks like TypeScript type generation, IP lookup, and secure password creation for everyone.",
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

const FIND_REPLACE_FAQ: Faq[] = [
  {
    question: "What does the Find and Replace Text tool do?",
    answer:
      "The Find and Replace Text tool searches for specific text within your input and replaces all occurrences with your replacement text. It supports case-sensitive matching and whole word matching for precise control.",
  },
  {
    question: "How do I use case-sensitive matching?",
    answer:
      "Check the 'Case sensitive' option to match text exactly as typed. For example, with case sensitivity enabled, 'World' will not match 'world'. Without it, both will be treated as the same.",
  },
  {
    question: "What does 'Match whole word only' do?",
    answer:
      "When enabled, this option only matches complete words. For example, searching for 'cat' will match 'cat' but not 'category' or 'scatter'. This prevents partial word matches.",
  },
  {
    question: "Can I use this tool for multiple replacements?",
    answer:
      "The tool replaces all occurrences of the find text in a single operation. If you need different replacements, you can perform multiple find-and-replace operations sequentially by copying the output back to input.",
  },
];

const CASE_CONVERTER_FAQ: Faq[] = [
  {
    question: "What does the Case Converter tool do?",
    answer:
      "The Case Converter tool transforms text between different casing formats including camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, Title Case, Sentence case, and more. It intelligently detects word boundaries and converts your text instantly.",
  },
  {
    question: "What case formats are supported?",
    answer:
      "The tool supports 9 popular formats: camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, Title Case, Sentence case, lower case, and UPPER CASE.",
  },
  {
    question: "How does the tool detect word boundaries?",
    answer:
      "The Case Converter intelligently splits text by recognizing spaces, hyphens, underscores, and camelCase/PascalCase patterns. This means it can convert between any format to any other format automatically.",
  },
  {
    question: "When should I use each case format?",
    answer:
      "Use camelCase for JavaScript variables, PascalCase for classes/components, snake_case for Python/Ruby, CONSTANT_CASE for environment variables, kebab-case for URLs/CSS, Title Case for headings, and Sentence case for regular text.",
  },
];

const COLOR_CONVERTER_FAQ: Faq[] = [
  {
    question: "What does the Color Code Converter do?",
    answer:
      "The Color Code Converter instantly converts colors between different formats including HEX, RGB, HSL, and RGBA. Simply enter a color in any format and see all conversions in real-time with a visual preview.",
  },
  {
    question: "What color formats are supported?",
    answer:
      "The tool supports HEX (#RRGGBB or #RGB), RGB (red, green, blue), RGBA (RGB with alpha/transparency), HSL (hue, saturation, lightness), HSLA, and even CSS color names like 'red', 'blue', or 'rebeccapurple'.",
  },
  {
    question: "How do I use the Color Code Converter?",
    answer:
      "Enter any valid color in the input field (like #3b82f6, rgb(59, 130, 246), hsl(217, 91%, 60%), or 'blue'). The tool will automatically convert it to all supported formats and display a color preview.",
  },
  {
    question: "When would I use different color formats?",
    answer:
      "Use HEX for HTML/CSS and design tools, RGB/RGBA for JavaScript and when you need transparency, HSL for intuitive color adjustments (easier to modify brightness/saturation), and color names for quick prototyping.",
  },
];

const WORD_COUNTER_FAQ: Faq[] = [
  {
    question: "What does the Word Counter tool do?",
    answer:
      "The Word Counter tool analyzes your text and provides detailed statistics including word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time based on average reading speed.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is calculated based on an average reading speed of 200 words per minute. This gives you a realistic estimate of how long it would take to read your content aloud or silently.",
  },
  {
    question: "Why use a Word Counter?",
    answer:
      "A Word Counter is essential for writers, students, and content creators who need to meet specific word or character limits for essays, articles, social media posts, or any content with length requirements.",
  },
  {
    question: "What's the difference between characters with and without spaces?",
    answer:
      "Characters with spaces counts every character including spaces, tabs, and line breaks. Characters without spaces only counts visible characters, excluding all whitespace. Different platforms may have different character limits based on these counts.",
  },
];

export const Faqs: Record<Slug, Faq[]> = {
  "whats-my-ip": WHATS_MY_IP_FAQ,
  "password-generator": PASSWORD_GENERATOR_FAQ,
  "json-to-ts": JSON_TO_TYPES_FAQ,
  "numbers-to-words": NUMBERS_TO_WORDS_FAQ,
  "base64-converter": BASE64_CONVERTER_FAQ,
  "url-encoder-decoder": URL_ENCODER_DECODER_FAQ,
  "url-parser": URL_PARSER_FAQ,
  "html-escape": HTML_ESCAPE_FAQ,
  "line-break-remover": LINE_BREAK_REMOVER_FAQ,
  "lorem-ipsum": LOREM_IPSUM_FAQ,
  "blank-character": BLANK_CHARACTER_FAQ,
  "cron-expression-generator": CRON_EXPRESSION_GENERATOR_FAQ,
  "text-trimmer": TEXT_TRIMMER_FAQ,
  "find-replace": FIND_REPLACE_FAQ,
  "case-converter": CASE_CONVERTER_FAQ,
  "color-converter": COLOR_CONVERTER_FAQ,
  "word-counter": WORD_COUNTER_FAQ,
  "json-to-yaml": [
    {
      question: "Does it keep the order of my keys?",
      answer: "Yes. Keys come out in the same order they appear in your JSON.",
    },
    {
      question: "Why are some of my values in quotes?",
      answer:
        "YAML treats unquoted text like 2024-01-01 or 042 as dates or numbers. The converter quotes those values so they stay strings, exactly as they were in your JSON.",
    },
    {
      question: "Can I paste a JavaScript object instead of JSON?",
      answer:
        "No. The input must be strict JSON, so keys need double quotes and trailing commas are not allowed. For a JavaScript object, quote the keys first.",
    },
  ],
  "yaml-to-json": [
    {
      question: 'Why do I get "expected a single document"?',
      answer:
        "Your YAML contains more than one document separated by ---. Paste one document at a time.",
    },
    {
      question: "Does yes become true?",
      answer:
        "No. The converter follows YAML 1.2, where only true and false are booleans, so yes, no, on, and off stay strings.",
    },
    {
      question: "Are my YAML comments kept?",
      answer:
        "No. JSON has no comment syntax, so comments are removed during conversion.",
    },
  ],
  "json-to-csv": [
    {
      question: 'Why does it say "CSV needs a list of records"?',
      answer:
        'CSV is a list of rows, so the input must be a JSON array. If your records are inside a field, such as { "users": [...] }, paste just the array. For a single object, wrap it in [ ] to get one row.',
    },
    {
      question: "Why is a column missing?",
      answer:
        "Columns are taken from the first object. Add the missing key to the first object, even with an empty value, and it will appear.",
    },
    {
      question: "How do I open the result in Excel?",
      answer:
        "Copy the output, save it as a .csv file, and open that file, or paste it into Google Sheets and split the text into columns.",
    },
  ],
  "csv-to-json": [
    {
      question: "Why are my numbers in quotes?",
      answer:
        "CSV has no types, so every value is read as text. Keeping them as strings avoids surprises such as zip codes losing their leading zero.",
    },
    {
      question: "Does it handle commas inside values?",
      answer:
        'Yes. Values wrapped in double quotes, such as "Doe, John", are read as one field.',
    },
    {
      question: "Does my CSV need a header row?",
      answer: "Yes. The first row is always used for the key names.",
    },
  ],
  "xml-to-json": [
    {
      question: "Why are my XML attributes missing?",
      answer:
        'The converter reads element content only. Attributes like id="7" are not included in the JSON.',
    },
    {
      question: "Why did a value lose its leading zero?",
      answer:
        "Numeric text is converted to a JSON number, and numbers do not keep leading zeros. Values like zip codes or IDs are affected.",
    },
    {
      question: "Why is one element an array and another not?",
      answer:
        "An element becomes an array only when it appears more than once under the same parent. A single element stays a plain value.",
    },
  ],
  "json-to-xml": [
    {
      question: "How do I add XML attributes?",
      answer:
        "The converter writes elements only. Add attributes to the output by hand if your target format needs them.",
    },
    {
      question: "Why does my output have more than one root element?",
      answer:
        'Each top-level key becomes an element. Wrap everything in one key, such as { "root": { ... } }, to get a single root.',
    },
    {
      question: "Does it add an XML declaration?",
      answer:
        'No. Add <?xml version="1.0" encoding="UTF-8"?> to the first line if you need one.',
    },
  ],
  "toml-to-json": [
    {
      question: "Why did my date turn into a string?",
      answer:
        "JSON has no date type, so TOML dates and times are written as ISO 8601 strings.",
    },
    {
      question: 'Why do I get "Cannot redefine existing key"?',
      answer:
        "The same key or table appears twice in your TOML. Each key can only be set once.",
    },
    {
      question: "Are my TOML comments kept?",
      answer: "No. JSON has no comments, so they are removed during conversion.",
    },
  ],
  "json-to-toml": [
    {
      question: 'Why do I get "TOML needs an object at the top level"?',
      answer:
        'A TOML file is a set of keys, so the JSON must be an object. If your data is a list, put it under a key, such as { "items": [...] }.',
    },
    {
      question: 'Why do I get "TOML has no null values"?',
      answer:
        "TOML cannot store null. Replace it with a real value, such as an empty string, or remove the key.",
    },
    {
      question: "Why are the sections in a different order?",
      answer:
        "Plain keys are written first and [table] sections after them, because in TOML every key after a table header belongs to that table.",
    },
  ],
  "yaml-to-toml": [
    {
      question: 'Why do I get "TOML has no null values"?',
      answer:
        "A YAML key with nothing after the colon, or with ~ or null, has no value. TOML cannot store that, so give it a value or remove it.",
    },
    {
      question: 'Why do I get "TOML needs an object at the top level"?',
      answer:
        "Your YAML starts with a list (lines beginning with -). Put the list under a key first.",
    },
    {
      question: "Are YAML comments kept?",
      answer: "No. Comments are dropped during conversion.",
    },
  ],
  "toml-to-yaml": [
    {
      question: 'Why is "2021" in quotes in the YAML?',
      answer:
        "The value was a string in TOML. Without quotes YAML would read 2021 as a number, so it is quoted to stay a string.",
    },
    {
      question: "Are TOML comments kept?",
      answer: "No. Comments are dropped during conversion.",
    },
    {
      question: 'Why do I get "Cannot redefine existing key"?',
      answer:
        "The same key or table appears twice in your TOML. Each key can only be set once.",
    },
  ],
  "jwt-decoder": [
    {
      question: "Is it safe to paste my token here?",
      answer:
        "The token is decoded in your browser and never sent anywhere. Still, a live token works like a password until it expires, so avoid pasting production tokens into any site you do not trust, and prefer expired or test tokens.",
    },
    {
      question: "Does this verify the signature?",
      answer:
        "No. It only decodes the header and payload. Verifying needs the secret or public key, and should happen on your server.",
    },
    {
      question: "Why does it say my token is encrypted?",
      answer:
        "A token with five parts is a JWE, an encrypted JWT. Its payload cannot be read without the decryption key.",
    },
    {
      question: "Can I paste the Authorization header value?",
      answer:
        'Yes. A leading "Bearer " is removed automatically, along with surrounding spaces and line breaks.',
    },
    {
      question: "Why is my token expired when it should still be valid?",
      answer:
        "The status uses your device's clock. If the clock is off, or the issuer's clock was, the result can differ by that amount.",
    },
  ],
  "rupees-in-words": [
    {
      question: "How do I write 1,50,000 in words on a cheque?",
      answer:
        'Write Rupees One Lakh Fifty Thousand Only. Starting with "Rupees" and ending with "Only" leaves no room for anyone to add words before or after the amount.',
    },
    {
      question: 'Why add "Only" at the end?',
      answer:
        "It marks the end of the amount, so nothing can be added after it. Banks expect it on cheques.",
    },
    {
      question: "How are paise written?",
      answer:
        'After the rupees, joined with "and": Rupees Forty Five and Fifty Paise Only for ₹45.50. If there are no rupees, just the paise are written, such as Fifty Paise Only.',
    },
    {
      question: "Can I type the amount with commas or a ₹ sign?",
      answer:
        "Yes. Indian or Western commas, spaces, and a leading ₹, Rs, or INR are all ignored.",
    },
    {
      question: "What is the largest amount it converts?",
      answer:
        "Anything below ₹1,00,000 crore (one lakh crore), which covers any amount you would write on a cheque.",
    },
  ],
  "json-formatter": [
    {
      question: "How do I pretty print JSON?",
      answer:
        "Paste it into the input. The formatted version appears on the right straight away, indented with 2 spaces by default and ready to copy.",
    },
    {
      question: "Should I use 2 or 4 spaces for JSON?",
      answer:
        "Either is valid. 2 spaces is the most common; 4 spaces is easier to follow in deeply nested data. Pick one per project and stay consistent.",
    },
    {
      question: "Is my JSON sent to a server?",
      answer:
        "No. Formatting runs in your browser, so the data never leaves your device. That makes it safe for API responses that contain personal data or tokens.",
    },
    {
      question: "Why did a large ID number change?",
      answer:
        "JavaScript numbers are exact only up to 9,007,199,254,740,991. Bigger integers are rounded when the JSON is read, and the tool shows a note when that happens. Store long IDs as strings to keep every digit.",
    },
  ],
  "json-validator": [
    {
      question: "How do I check if JSON is valid?",
      answer:
        "Paste it into the input. Valid JSON shows a green Valid JSON line with a summary, such as an object with 7 keys. Invalid JSON shows the first error with its line and column.",
    },
    {
      question: 'What does "Unexpected token" in JSON mean?',
      answer:
        "The parser reached a character it didn't expect at that point, such as a } after a trailing comma, or a ' where a double quote belongs. The validator names the character and how to fix it.",
    },
    {
      question: "Does it check against a JSON Schema?",
      answer:
        "No. It checks that the text is valid JSON syntax. Checking that fields have the right names and types needs a JSON Schema validator.",
    },
    {
      question: "Why does it show only one error?",
      answer:
        "The first error often causes the ones after it, so it is shown alone. Fix it and the check moves on to the next problem as you type.",
    },
    {
      question: "Is my JSON uploaded anywhere?",
      answer: "No. The check runs in your browser and nothing is sent to a server.",
    },
  ],
  "json-minifier": [
    {
      question: "How do I minify JSON?",
      answer:
        "Paste it into the input. The minified version appears on the right with the size before and after, ready to copy.",
    },
    {
      question: "Does minifying change my data?",
      answer:
        "No. Only whitespace outside strings is removed, so a program reading the JSON gets the same values. The exception is integers too large for JavaScript, which the tool warns about.",
    },
    {
      question: "How do I make minified JSON readable again?",
      answer:
        "Use the JSON Formatter, which re-indents minified JSON with 2 spaces, 4 spaces, or tabs.",
    },
    {
      question: "Is minified JSON faster?",
      answer:
        "It is smaller, so it transfers faster, especially without gzip or Brotli. Parsing takes about the same time.",
    },
  ],
};
