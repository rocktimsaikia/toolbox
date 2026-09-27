import type { Slug } from "@/constants/tools";

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: { term?: string; text: string }[];
  code?: string;
  // Rendered last, after the list and code
  note?: string;
};

export type Guide = {
  intro: string;
  sections: GuideSection[];
};

// Long-form copy rendered under each tool. Keep claims true to what the tool actually does.
export const GUIDES: Partial<Record<Slug, Guide>> = {
  "url-parser": {
    intro:
      "A single URL can hold a lot: which server to contact, which page to load, and a string of parameters that often includes tracking IDs, redirect targets, and encoded state. The URL Parser splits all of it into labelled rows, so you can read a link instead of squinting at it.",
    sections: [
      {
        heading: "What each part means",
        list: [
          {
            term: "Protocol.",
            text: "The scheme, such as https or ftp. If you paste a bare domain like example.com/page, the parser assumes https.",
          },
          {
            term: "Host and port.",
            text: "The server name and the port it listens on. When a URL leaves the port out, the parser shows the default for its protocol, such as 443 for https.",
          },
          {
            term: "Path segments.",
            text: "The pieces between slashes, one per row and decoded, so /files/My%20Report.pdf reads as files and My Report.pdf.",
          },
          {
            term: "Query parameters.",
            text: "Every key=value pair after the ?, in the order they appear. Keys that repeat are kept and marked, because many servers treat repeats as a list.",
          },
          {
            term: "Fragment.",
            text: "Everything after the #. Single-page apps and OAuth sign-in flows often put parameters here too, and the parser splits those out the same way.",
          },
        ],
      },
      {
        heading: "Example",
        paragraphs: [
          "For the link below, the parser shows the host shop.example.com, two path segments (products and shoes), four query parameters with both size values flagged as repeated, and the fragment reviews.",
        ],
        code: "https://shop.example.com/products/shoes?color=blue&size=42&size=43&utm_source=newsletter#reviews",
      },
      {
        heading: "Encoded values inside the URL",
        paragraphs: [
          "Values are often encoded twice: percent-encoding to make them URL-safe, and Base64 or a JWT inside that. The parser decodes the percent-encoding first, then checks each value for Base64 that turns into readable text and for JWTs whose header and payload are valid JSON. Anything it recognises is shown decoded under the original.",
          "Detection is a best guess. Plain words like newsletter are technically valid Base64, so a value is only decoded when the result is printable text. If a parameter holds another URL, such as a redirect_uri, use Parse to break that one down as well.",
          "One detail catches people out: in a query string a plus sign means a space, so q=hello+world reads as hello world. In the path, a plus sign stays a plus sign.",
        ],
      },
      {
        heading: "When it helps",
        list: [
          {
            text: "Debugging OAuth and SSO redirects, where redirect_uri and state have to match exactly.",
          },
          {
            text: "Finding and removing tracking parameters like utm_source or fbclid before you share a link.",
          },
          {
            text: "Reading signed download links to check their expiry time without opening them.",
          },
          {
            text: "Checking what a marketing or affiliate link will pass along before you click it.",
          },
        ],
      },
    ],
  },
  "case-converter": {
    intro:
      "Every language and tool has its own naming convention. JavaScript wants camelCase variables, Python wants snake_case, CSS and URLs want kebab-case, and environment variables use CONSTANT_CASE. The Case Converter rewrites a name in any of these styles, so you can move identifiers between codebases without retyping them.",
    sections: [
      {
        heading: "The formats",
        paragraphs: ["Here is the phrase user profile id in each style:"],
        list: [
          {
            term: "camelCase: userProfileId.",
            text: "JavaScript and TypeScript variables and functions, and the keys of many JSON APIs.",
          },
          {
            term: "PascalCase: UserProfileId.",
            text: "Classes, React components, and TypeScript types.",
          },
          {
            term: "snake_case: user_profile_id.",
            text: "Python and Ruby code, and database column names.",
          },
          {
            term: "CONSTANT_CASE: USER_PROFILE_ID.",
            text: "Constants and environment variables.",
          },
          {
            term: "kebab-case: user-profile-id.",
            text: "URLs, CSS class names, file names, and command-line flags.",
          },
          {
            term: "Title Case: User Profile Id.",
            text: "Headings and labels. Every word is capitalised, including short ones like of and the.",
          },
          {
            term: "Sentence case: User profile id.",
            text: "Buttons, menu items, and ordinary sentences.",
          },
          {
            term: "lower case and UPPER CASE.",
            text: "Change the letters only, and keep spacing and punctuation exactly as typed.",
          },
        ],
      },
      {
        heading: "How words are detected",
        paragraphs: [
          "The converter splits your text at spaces, hyphens, underscores, and changes from lower to upper case, so it can go from any format to any other. For example, XMLHttpRequest parser becomes xml_http_request_parser in snake_case and xmlHttpRequestParser in camelCase.",
          "The code-style formats keep only letters and numbers, so punctuation such as ! or . is dropped. The whole input is treated as one name, so convert a list of identifiers one at a time rather than pasting them all at once.",
        ],
      },
      {
        heading: "Chaining tools",
        paragraphs: [
          "Apply to Input copies the result back into the input box, and the text you type carries over when you switch to another text tool. That makes it easy to trim stray whitespace with the Text Trimmer, then come back here to convert the cleaned-up name.",
        ],
      },
    ],
  },
  "json-to-ts": {
    intro:
      "Typing an API response by hand is slow and easy to get wrong. Paste a JSON response or a JavaScript object and this tool writes the matching TypeScript interfaces for you, with a separate interface for every nested object.",
    sections: [
      {
        heading: "How the conversion works",
        paragraphs: [
          "Each object becomes an interface, and every nested object gets its own named interface that the parent refers to. Arrays become typed arrays such as string[] or Order[], and the interface for the items is named in the singular.",
          "When the items of an array have different fields, the fields that some items lack are marked optional with ?. Values that are null are typed as null, because there is nothing to infer from. Once you know the real type, change those to something like string | null.",
        ],
      },
      {
        heading: "Example",
        paragraphs: [
          "The second order has no total, so total becomes optional in the generated Order interface:",
        ],
        code: 'const User = {\n  id: 1,\n  name: "Ann",\n  orders: [{ id: 1, total: 9.5 }, { id: 2 }],\n};\n\n// becomes\n\ninterface User {\n  id: number;\n  name: string;\n  orders: Order[];\n}\n\ninterface Order {\n  id: number;\n  total?: number;\n}',
      },
      {
        heading: "JSON or JavaScript input",
        paragraphs: [
          "You can paste strict JSON or a JavaScript object literal with unquoted keys, single quotes, and trailing commas. Start with const User = to name the root interface User; without a name, the root interface is called Object, so it is worth adding one.",
          "The input is evaluated as JavaScript in your browser to read the object, so paste data, not code you do not trust.",
        ],
      },
      {
        heading: "When it helps",
        list: [
          { text: "Typing the response of a fetch or axios call instead of using any." },
          { text: "Writing types for a config file, fixture, or mock data." },
          { text: "Documenting the shape of a third-party webhook payload." },
        ],
      },
    ],
  },
  "numbers-to-words": {
    intro:
      "Cheques, invoices, contracts, and legal documents often need an amount written out in words, because words are harder to alter than digits. Type a number and this tool spells it out, in 23 locales and optionally as a currency amount.",
    sections: [
      {
        heading: "Locales and number systems",
        paragraphs: [
          "Regions group large numbers differently. In English (USA), 1234567 becomes One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven. In English (India) it becomes Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven, using the lakh and crore system.",
          "Besides a dozen English variants, there are locales for Spanish, French, Portuguese, Turkish, Persian, Urdu, Korean, and Estonian.",
        ],
      },
      {
        heading: "Currency mode",
        paragraphs: [
          "Turn on currency to write the number as money, with the unit names for the chosen locale:",
        ],
        code: "1234.56 (English, USA)\nOne Thousand Two Hundred Thirty Four Dollars And Fifty Six Cents\n\n1250.50 (English, India)\nOne Thousand Two Hundred Fifty Rupees And Fifty Paise",
      },
      {
        heading: "What you can type",
        paragraphs: [
          "Commas are ignored, so you can paste 1,234,567 as it is. Negative numbers and decimals work too: -42.5 becomes Minus Forty Two Point Five. Letters and other symbols are rejected with an error rather than guessed at.",
          "On cheques, many banks expect the amount in words to end with Only. The tool leaves it off, so add it after you copy the result if your bank asks for it.",
        ],
      },
    ],
  },
  "password-generator": {
    intro:
      "Reused and easy-to-guess passwords are how most accounts get broken into. This generator creates random passwords using your browser's built-in cryptographic random number generator, so they are unpredictable, and they are never sent anywhere.",
    sections: [
      {
        heading: "Choosing the options",
        list: [
          {
            term: "Length.",
            text: "15 characters by default. Every extra character multiplies the number of possible passwords, so length matters more than anything else. Use at least 12, and 16 or more for email, banking, and password manager accounts.",
          },
          {
            term: "Character types.",
            text: "Uppercase, lowercase, numbers, and symbols such as ! @ # $ % and brackets. Keep all four on unless a site rejects symbols.",
          },
        ],
        note: "After changing the options, click Generate Password to get a new one.",
      },
      {
        heading: "How strong is it?",
        paragraphs: [
          "With all four character types there are 92 possible characters per position. A 16-character password then has over 100 bits of randomness, which is far beyond what any attacker can brute-force.",
          "Each character is picked independently, so a password can occasionally miss one of the selected types. If a site insists on at least one of each, generate again.",
        ],
      },
      {
        heading: "Keeping it safe",
        paragraphs: [
          "Use a different password for every site and keep them in a password manager rather than a note or a spreadsheet. Nothing is saved here: reload the page and the password is gone.",
        ],
      },
    ],
  },
  "base64-converter": {
    intro:
      "Base64 turns any data into plain letters, digits, + and /, so it can travel through systems built for text: JSON fields, email, data URLs, and HTTP headers. This tool encodes text to Base64 and decodes Base64 back to text, with full UTF-8 support for emoji and every script.",
    sections: [
      {
        heading: "How Base64 works",
        paragraphs: [
          "The encoder takes the bytes of your text three at a time and writes each group as four characters from a 64-character alphabet. That is why Base64 output is about a third longer than the input, and why it can end with one or two = padding characters.",
        ],
        code: "hello  ->  aGVsbG8=\nuser:pass  ->  dXNlcjpwYXNz\n👋  ->  8J+Riw==",
      },
      {
        heading: "Decoding",
        paragraphs: [
          "Choose Decode and paste a Base64 string. The decoder also accepts the URL-safe variant, which uses - and _ instead of + and /, and strings with the padding left off, as found in JWTs and many URLs.",
          "If the decoded bytes are not valid text, for example when the Base64 holds an image, you get an error instead of garbled characters. Switching between Encode and Decode also moves the current output into the input, so checking a round trip takes one click.",
        ],
      },
      {
        heading: "Base64 is not encryption",
        paragraphs: [
          "Anyone can decode Base64 in a second, so never use it to hide passwords or secrets. It exists to move data safely through text-only channels, not to keep it private.",
        ],
      },
      {
        heading: "When it helps",
        list: [
          {
            text: "Reading an HTTP Basic auth header: Basic dXNlcjpwYXNz decodes to user:pass.",
          },
          { text: "Inspecting values in cookies, config files, and API payloads." },
          {
            text: "Encoding a small value to store in an environment variable or a data URL.",
          },
        ],
      },
    ],
  },
  "url-encoder-decoder": {
    intro:
      "URLs can only contain a limited set of characters. Spaces, accented letters, emoji, and symbols like & or = must be percent-encoded, or they break the link or change what it means. This tool percent-encodes text for use in a URL and decodes encoded strings back to readable text.",
    sections: [
      {
        heading: "What percent-encoding does",
        paragraphs: [
          "Each character that is not safe in a URL is replaced by a % followed by its UTF-8 bytes in hex. A space becomes %20, & becomes %26, and é becomes %C3%A9.",
        ],
        code: "name=Jane Doe & co\n\n// encodes to\n\nname%3DJane%20Doe%20%26%20co",
      },
      {
        heading: "Encode values, not whole URLs",
        paragraphs: [
          "The encoder works like JavaScript's encodeURIComponent, which also encodes :, /, ? and &. That is right for a single query value or path segment, but it breaks a full URL. Encode each value on its own, then join them into the link.",
        ],
      },
      {
        heading: "Decoding",
        paragraphs: [
          "Decoding turns every %XX sequence back into its character. A stray % or a cut-off sequence such as %E2%82 is invalid and shows an error.",
          "A plus sign is left as it is. HTML forms use + for spaces in query strings, so if you need that handled, paste the whole link into the URL Parser instead.",
        ],
      },
      {
        heading: "When it helps",
        list: [
          { text: "Building query strings by hand for curl, scripts, or API testing." },
          {
            text: "Passing one URL inside another, such as a ?next= or redirect_uri value.",
          },
          { text: "Reading encoded values in server logs and analytics exports." },
        ],
      },
    ],
  },
  "whats-my-ip": {
    intro:
      "Your public IP address is the address the rest of the internet sees when you connect. Websites, APIs, and game servers see this one, not the private address your router gives your device. This page shows it instantly, with a button to copy it.",
    sections: [
      {
        heading: "Public and private IP addresses",
        paragraphs: [
          "At home or in an office, many devices share one public IP through the router, which gives each device a private address such as 192.168.1.20 or 10.0.0.5. Private addresses only work inside your own network. The address shown here is your public one.",
        ],
      },
      {
        heading: "IPv4 and IPv6",
        paragraphs: [
          "An IPv4 address is four numbers separated by dots, like 203.0.113.7. An IPv6 address is longer and uses colons. When your connection reports both, this page shows the IPv4 address, since that is what most firewalls and allowlists ask for.",
        ],
      },
      {
        heading: "When you need it",
        list: [
          {
            text: "Allowlisting your IP for a database, an SSH server, or a cloud firewall.",
          },
          {
            text: "Checking that a VPN or proxy works: the address should change when it is on.",
          },
          {
            text: "Giving your address to IT or customer support while troubleshooting.",
          },
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Unlike the other tools here, this one needs the server, because your public IP is only visible from outside your network. The address is read from your connection when the page loads, shown to you, and not saved by the page. If you use a VPN, you will see the VPN's address instead of your own.",
        ],
      },
    ],
  },
  "html-escape": {
    intro:
      "Characters like < and & have special meaning in HTML. To show them as text, for example in a code sample or in text a user typed, they have to be written as entities. This tool escapes text into HTML entities and unescapes entities back into plain text.",
    sections: [
      {
        heading: "What gets escaped",
        list: [
          {
            term: "& becomes &amp;",
            text: "and must go first, so the other entities are not double-escaped.",
          },
          {
            term: "< becomes &lt;",
            text: "and > becomes &gt;, so tags show as text instead of being parsed.",
          },
          {
            term: '" becomes &quot;',
            text: "and ' becomes &#39;, so values are safe inside HTML attributes.",
          },
        ],
      },
      {
        heading: "Example",
        code: '<a href="/">Home</a> & more\n\n// escapes to\n\n&lt;a href=&quot;/&quot;&gt;Home&lt;/a&gt; &amp; more',
      },
      {
        heading: "Unescaping",
        paragraphs: [
          "Choose Unescape to turn entities back into characters. Your browser does the decoding, so every named entity works, such as &copy; and &nbsp;, along with numeric ones like &#8364; for the euro sign.",
        ],
      },
      {
        heading: "Escaping and security",
        paragraphs: [
          "Escaping is the standard defence against cross-site scripting (XSS) when untrusted text goes into a page: an escaped script tag is displayed, not run. Frameworks like React escape text for you, so this tool is for HTML written by hand, such as templates, emails, documentation, and CMS fields.",
        ],
      },
    ],
  },
  "line-break-remover": {
    intro:
      "Text copied from a PDF, an email, or a terminal often has a hard line break at the end of every line, and it looks broken when you paste it into a document or a form. The Line Break Remover joins those lines back into flowing text.",
    sections: [
      {
        heading: "Keeping paragraphs",
        paragraphs: [
          "With Keep paragraphs selected, a blank line counts as a paragraph break and is kept, while single line breaks inside a paragraph become spaces. Choose Join everything to merge it all into one block.",
        ],
        code: "This line was\nbroken by a PDF.\n\nNew paragraph.\n\n// becomes\n\nThis line was broken by a PDF.\n\nNew paragraph.",
      },
      {
        heading: "Extra cleanup",
        paragraphs: [
          "Runs of spaces and tabs are collapsed into a single space, and whitespace at the start and end is trimmed, which cleans up the gaps PDFs tend to leave. Windows (CRLF) and Unix (LF) line endings are handled the same way.",
        ],
      },
      {
        heading: "When it helps",
        list: [
          { text: "Pasting paragraphs from a PDF into a document, email, or CMS." },
          { text: "Cleaning up quoted email replies and terminal output." },
          {
            text: "Preparing text for a single-line field, such as a CSV cell or a JSON string.",
          },
        ],
      },
    ],
  },
  "lorem-ipsum": {
    intro:
      "Lorem Ipsum is placeholder text that designers and developers use to fill a layout before the real copy exists. It looks like natural language, so it shows how a design handles text without distracting anyone with meaning. This generator creates as much of it as you need.",
    sections: [
      {
        heading: "Options",
        list: [
          { term: "Paragraphs.", text: "How many blocks of text to generate." },
          { term: "Sentences per paragraph.", text: "Controls how long each block is." },
          {
            term: "Words per sentence.",
            text: "At least 3, for short or long sentences.",
          },
          {
            term: "Start with Lorem ipsum.",
            text: "Opens with the familiar first two words, or leaves them out.",
          },
        ],
        note: "Changing an option generates new text straight away, and Generate New Text gives you a fresh set with the same settings.",
      },
      {
        heading: "Where it comes from",
        paragraphs: [
          "The words come from De finibus bonorum et malorum, a work on ethics that Cicero wrote in 45 BC. This generator builds sentences from a list of those Latin words picked at random, so the result reads like Latin without meaning anything.",
        ],
      },
      {
        heading: "Tips for using placeholder text",
        list: [
          {
            text: "Match the real length: if a card title will be 3 to 5 words, test it with 3 to 5 words, not a paragraph.",
          },
          {
            text: "Try very long and very short text to catch overflow and empty-state bugs.",
          },
          {
            text: "Before launch, search your project for lorem to catch any leftovers.",
          },
        ],
      },
    ],
  },
  "blank-character": {
    intro:
      "Some apps refuse an empty name or message but accept a character you cannot see. This tool copies an invisible character, the zero-width space (Unicode U+200B), to your clipboard in one click.",
    sections: [
      {
        heading: "What the blank character is",
        paragraphs: [
          "U+200B is a real Unicode character with no width and no visible shape. Text fields count it as input, but it displays as nothing. After copying it, paste it into the test box on this page: it confirms the character is there and shows the character count.",
        ],
      },
      {
        heading: "Common uses",
        list: [
          { text: "Blank-looking names or messages in apps and games that allow them." },
          {
            text: "Marking a spot where a long word or URL may wrap, since browsers can break lines at a zero-width space.",
          },
          { text: "Testing how your own forms and validation handle invisible input." },
        ],
      },
      {
        heading: "Limitations",
        paragraphs: [
          "Many apps strip or reject zero-width characters, precisely because they are used to fake blank names, so it will not work everywhere.",
          "It can also cause confusing bugs when it slips into code, usernames, or passwords: two strings that look identical will not match. If text that looks right refuses to match, a hidden U+200B is a common cause.",
        ],
      },
    ],
  },
  "cron-expression-generator": {
    intro:
      "Cron is the scheduler behind countless background jobs, from nightly backups to hourly reports. Its five-field syntax is compact but hard to read at a glance. This tool builds an expression field by field, explains any expression in plain English, and includes common schedules to start from.",
    sections: [
      {
        heading: "The five fields",
        paragraphs: [
          "A cron expression is five fields separated by spaces, in this order:",
        ],
        list: [
          { term: "Minute:", text: "0 to 59." },
          { term: "Hour:", text: "0 to 23, in 24-hour time." },
          { term: "Day of month:", text: "1 to 31." },
          { term: "Month:", text: "1 to 12." },
          { term: "Day of week:", text: "0 to 6, where 0 is Sunday." },
        ],
      },
      {
        heading: "Special characters",
        list: [
          { term: "*", text: "means every value: * in the hour field runs every hour." },
          { term: ",", text: "lists values: 0 9,18 * * * runs at 9 AM and 6 PM." },
          {
            term: "-",
            text: "sets a range: 1-5 in the day-of-week field is Monday to Friday.",
          },
          {
            term: "/",
            text: "sets a step: */5 in the minute field runs every 5 minutes.",
          },
          {
            term: "L",
            text: "means last, as in the last day of the month. Some schedulers, such as Quartz, support it, but standard Linux cron does not.",
          },
        ],
      },
      {
        heading: "Example",
        paragraphs: ["Every 15 minutes during office hours on weekdays:"],
        code: "*/15 9-17 * * 1-5\n\n// Every 15 minutes, between 09:00 AM and 05:59 PM, Monday through Friday",
      },
      {
        heading: "Common mistakes",
        list: [
          {
            text: "Cron runs in the server's time zone, which is often UTC rather than your local time.",
          },
          {
            text: "When both day of month and day of week are set, standard cron runs the job when either one matches, not only when both do.",
          },
          {
            text: "Some systems, such as Quartz and AWS EventBridge, add a seconds or year field. This tool reads standard five-field expressions, so remove the extra fields before pasting.",
          },
        ],
      },
    ],
  },
  "text-trimmer": {
    intro:
      "Stray spaces at the start or end of a line are invisible but cause real problems: failed string comparisons, noisy diffs, broken indentation, and CSV values that do not match. The Text Trimmer removes that whitespace from every line at once.",
    sections: [
      {
        heading: "Options",
        list: [
          {
            term: "Remove leading spaces (left trim).",
            text: "On by default. Removes spaces and tabs at the start of each line. This also strips indentation, so turn it off for code where indentation matters.",
          },
          {
            term: "Remove trailing spaces (right trim).",
            text: "Removes spaces and tabs at the end of each line, the kind that editors and git diffs flag.",
          },
        ],
        note: "Turn both on to clean each line completely.",
      },
      {
        heading: "Line by line",
        paragraphs: [
          "Unlike a plain trim, this works on each line separately and never joins lines or removes blank ones. To join lines together, use the Line Break Remover.",
        ],
      },
      {
        heading: "When it helps",
        list: [
          {
            text: "Cleaning a list of values before pasting it into a spreadsheet or a SQL query.",
          },
          { text: "Removing trailing whitespace before committing a file." },
          {
            text: "Fixing text copied from terminals, PDFs, and chat apps with ragged spacing.",
          },
        ],
      },
    ],
  },
  "find-replace": {
    intro:
      "Find and Replace swaps every occurrence of a word or phrase in a block of text in one step. It is useful when your editor is not open, or when the text lives in an email, a document, or a web form.",
    sections: [
      {
        heading: "Matching options",
        list: [
          {
            term: "Case sensitive.",
            text: "Off by default, so cat also matches Cat and CAT. Turn it on to match the exact capitalisation.",
          },
          {
            term: "Match whole word only.",
            text: "Matches the term only as a separate word, so cat no longer matches inside concatenate. This works best with English text, because accented letters count as word boundaries.",
          },
        ],
      },
      {
        heading: "Literal text, not patterns",
        paragraphs: [
          "The search text is matched exactly as typed, so characters like . * ? and brackets have no special meaning: searching for 3.5 finds 3.5 and nothing else. Every match is replaced, and leaving the replacement empty deletes all matches.",
        ],
      },
      {
        heading: "Example",
        paragraphs: ["Replacing colour with color, with case sensitivity off:"],
        code: "The colour of the Colour picker\n\n// becomes\n\nThe color of the color picker",
      },
      {
        heading: "Several replacements in a row",
        paragraphs: [
          "Apply to Input copies the result back into the input box, so you can run one replacement after another on the same text.",
        ],
      },
    ],
  },
  "color-converter": {
    intro:
      "Designers hand over colors in HEX, CSS uses rgb() and hsl(), and design tools show all of them. This converter takes a color in any common format and gives you the others instantly, with a live preview swatch.",
    sections: [
      {
        heading: "What you can paste",
        list: [
          {
            term: "HEX:",
            text: "#3b82f6, the short form #38f, or with transparency, #3b82f680.",
          },
          {
            term: "RGB and RGBA:",
            text: "rgb(59, 130, 246) or rgba(59, 130, 246, 0.5).",
          },
          { term: "HSL and HSLA:", text: "hsl(217, 91%, 60%)." },
          {
            term: "CSS color names:",
            text: "blue, tomato, rebeccapurple, and the rest of the named colors.",
          },
        ],
      },
      {
        heading: "The formats",
        list: [
          {
            term: "HEX",
            text: "writes red, green, and blue as two hex digits each. It is the most common format in design handoffs.",
          },
          {
            term: "RGB",
            text: "gives the same three channels as numbers from 0 to 255.",
          },
          {
            term: "RGBA",
            text: "adds alpha, the opacity, from 0 (transparent) to 1 (solid).",
          },
          {
            term: "HSL",
            text: "describes hue as an angle on the color wheel, plus saturation and lightness as percentages. It is the easiest to adjust by hand: lower the lightness for a darker shade.",
          },
        ],
        code: "#3B82F6 = rgb(59, 130, 246) = hsl(217, 91%, 60%)",
      },
      {
        heading: "Tips",
        list: [
          {
            text: "HSL values are rounded to whole numbers, so converting HSL back can shift a HEX value slightly. Keep the original HEX as your source of truth.",
          },
          {
            text: "When a color has transparency, the HEX output includes it as two extra digits.",
          },
        ],
      },
    ],
  },
  "word-counter": {
    intro:
      "Essays, cover letters, meta descriptions, and social posts often come with a word or character limit. Type or paste your text and the Word Counter shows words, characters with and without spaces, sentences, paragraphs, and reading time as you type.",
    sections: [
      {
        heading: "How each count works",
        list: [
          {
            term: "Words:",
            text: "anything separated by spaces or line breaks, so well-known counts as one word.",
          },
          {
            term: "Characters:",
            text: "every character including spaces and line breaks, plus a second count with all whitespace removed.",
          },
          {
            term: "Sentences:",
            text: "counted by ending punctuation (. ! ?), so abbreviations such as e.g. can add to the count.",
          },
          { term: "Paragraphs:", text: "blocks of text separated by a blank line." },
          {
            term: "Reading time:",
            text: "based on 200 words per minute, an average reading speed for adults.",
          },
        ],
      },
      {
        heading: "Common limits",
        list: [
          {
            text: "Google usually shows about 150 to 160 characters of a meta description.",
          },
          { text: "A post on X (Twitter) allows 280 characters." },
          { text: "A single SMS holds 160 characters of plain text." },
        ],
      },
      {
        heading: "Emoji and special characters",
        paragraphs: [
          "Characters are counted the way the browser stores them, so some emoji and rare symbols count as two. Platforms count these differently, so leave a small margin when you are close to a limit.",
        ],
      },
    ],
  },
  "json-to-yaml": {
    intro:
      "YAML is the config language of Kubernetes, Docker Compose, GitHub Actions, and most CI tools, but APIs and scripts speak JSON. This converter turns JSON into YAML you can drop straight into a config file.",
    sections: [
      {
        heading: "How it converts",
        list: [
          {
            term: "Objects.",
            text: "Each key becomes a YAML key, with nested objects indented 4 spaces.",
          },
          { term: "Arrays.", text: "Each item becomes a line starting with a dash." },
          {
            term: "Strings.",
            text: "Values that YAML would misread, such as dates or numbers stored as text, are quoted so they stay strings.",
          },
        ],
      },
      {
        heading: "Example",
        paragraphs: ["A small JSON object:"],
        code: '{ "app": { "port": 8080, "hosts": ["a.local", "b.local"] } }\n\n// converts to\n\napp:\n    port: 8080\n    hosts:\n        - a.local\n        - b.local',
      },
    ],
  },
  "yaml-to-json": {
    intro:
      "YAML is easy to write by hand, but most scripts, APIs, and tools like jq expect JSON. Paste a Kubernetes manifest, Compose file, or any YAML config and get formatted JSON back.",
    sections: [
      {
        heading: "How it converts",
        list: [
          {
            term: "Anchors and merge keys.",
            text: "References like <<: *defaults are expanded, so the JSON contains the full values.",
          },
          { term: "Comments.", text: "Dropped, because JSON has no comments." },
          {
            term: "Multiple documents.",
            text: "Only one document is supported. If your file has several separated by ---, convert them one at a time.",
          },
        ],
      },
      {
        heading: "Example",
        paragraphs: ["A config with a shared anchor:"],
        code: 'base: &base\n  replicas: 2\nprod:\n  <<: *base\n  region: eu\n\n// converts to\n\n{\n  "base": { "replicas": 2 },\n  "prod": { "replicas": 2, "region": "eu" }\n}',
      },
    ],
  },
  "json-to-csv": {
    intro:
      "A JSON API response is hard to scan, but the same data in a spreadsheet is easy to sort and filter. This converter turns a JSON array of objects into CSV you can open in Excel, Numbers, or Google Sheets.",
    sections: [
      {
        heading: "What the input needs",
        list: [
          {
            term: "An array.",
            text: "The top level must be a list, such as [{...}, {...}]. A single object cannot become rows.",
          },
          {
            term: "Matching keys.",
            text: "The columns come from the keys of the first object. Keys that appear only in later objects are left out, so give every object the same keys.",
          },
          {
            term: "Flat values.",
            text: "Nested objects and arrays are written into one cell as JSON text.",
          },
        ],
      },
      {
        heading: "Example",
        code: '[{ "name": "Ann", "age": 31 }, { "name": "Raj", "age": 27 }]\n\n// converts to\n\nname,age\nAnn,31\nRaj,27',
      },
    ],
  },
  "csv-to-json": {
    intro:
      "CSV exports from spreadsheets and databases are easy to produce but awkward to use in code. This converter turns each row into a JSON object, keyed by the header row, so you can feed the data to a script or API.",
    sections: [
      {
        heading: "How it converts",
        list: [
          { term: "Header row.", text: "The first line gives the key names." },
          {
            term: "Rows.",
            text: "Every following line becomes one object in a JSON array. Empty lines are skipped.",
          },
          {
            term: "Values.",
            text: 'Every value stays a string, including numbers, so "31" is not turned into 31. Convert types in your code if you need them.',
          },
        ],
      },
      {
        heading: "Example",
        code: 'name,age\nAnn,31\nRaj,27\n\n// converts to\n\n[\n  { "name": "Ann", "age": "31" },\n  { "name": "Raj", "age": "27" }\n]',
      },
    ],
  },
  "xml-to-json": {
    intro:
      "XML still shows up in RSS feeds, SOAP APIs, sitemaps, and older config files. This converter turns XML into JSON so you can inspect it or use it from JavaScript.",
    sections: [
      {
        heading: "How it converts",
        list: [
          {
            term: "Elements.",
            text: "Each element name becomes a key, and nested elements become nested objects.",
          },
          {
            term: "Repeated elements.",
            text: "Two or more elements with the same name become an array.",
          },
          {
            term: "Attributes.",
            text: "Ignored. Only element content is converted, so move attribute values into child elements if you need them.",
          },
          {
            term: "Numbers.",
            text: "Numeric text becomes a JSON number, so 042 becomes 42.",
          },
        ],
      },
      {
        heading: "Example",
        code: '<note>\n  <to>Ann</to>\n  <tag>a</tag>\n  <tag>b</tag>\n</note>\n\n// converts to\n\n{\n  "note": { "to": "Ann", "tag": ["a", "b"] }\n}',
      },
    ],
  },
  "json-to-xml": {
    intro:
      "Some APIs, feeds, and enterprise systems still require XML. This converter turns a JSON object into indented XML, with each key becoming an element.",
    sections: [
      {
        heading: "How it converts",
        list: [
          {
            term: "Keys.",
            text: "Each key becomes an element, and nested objects become nested elements.",
          },
          {
            term: "Arrays.",
            text: 'Each item in an array becomes its own element with the key\'s name, so "tags": ["a", "b"] becomes two <tags> elements.',
          },
          {
            term: "Root element.",
            text: 'XML needs one root. Wrap your data in a single top-level key, such as { "order": { ... } }.',
          },
          {
            term: "Declaration.",
            text: "The <?xml ?> header is not added. Put it at the top yourself if your target needs it.",
          },
        ],
      },
      {
        heading: "Example",
        code: '{ "note": { "to": "Ann", "tags": ["a", "b"] } }\n\n// converts to\n\n<note>\n  <to>Ann</to>\n  <tags>a</tags>\n  <tags>b</tags>\n</note>',
      },
    ],
  },
  "toml-to-json": {
    intro:
      "TOML is the config format of Python (pyproject.toml), Rust (Cargo.toml), and Hugo. When a script or tool needs that config as JSON, paste it here.",
    sections: [
      {
        heading: "How it converts",
        list: [
          {
            term: "Tables.",
            text: "Each [table] becomes a nested object, and dotted headers like [tool.ruff] become deeper nesting.",
          },
          {
            term: "Arrays of tables.",
            text: "Repeated [[name]] blocks become a list of objects.",
          },
          {
            term: "Dates.",
            text: "TOML dates and times become ISO 8601 strings, such as 1979-05-27T07:32:00.000Z, because JSON has no date type.",
          },
          {
            term: "Comments.",
            text: "Dropped, because the data passes through a plain object.",
          },
        ],
      },
      {
        heading: "Example",
        code: '[project]\nname = "my-app"\n\n[tool.ruff]\nline-length = 90\n\n// converts to\n\n{\n  "project": { "name": "my-app" },\n  "tool": { "ruff": { "line-length": 90 } }\n}',
      },
    ],
  },
  "json-to-toml": {
    intro:
      "TOML is easier to read and edit by hand than JSON, which is why tools like Cargo, Poetry, and Hugo use it. Paste a JSON object and get a TOML config back.",
    sections: [
      {
        heading: "How it converts",
        list: [
          {
            term: "Top level.",
            text: "TOML needs an object at the top, so a list or a single value cannot be converted.",
          },
          { term: "Nested objects.", text: "Each one becomes a [table] section." },
          {
            term: "Lists of objects.",
            text: "These become [[arrays of tables]], one block per item.",
          },
          {
            term: "Null values.",
            text: "TOML has no null, so give those keys a value or remove them first.",
          },
        ],
      },
      {
        heading: "Example",
        code: '{ "title": "my-app", "server": { "port": 8080 }, "owners": [{ "name": "Ann" }] }\n\n// converts to\n\ntitle = "my-app"\n[[owners]]\nname = "Ann"\n[server]\nport = 8080',
      },
    ],
  },
  "yaml-to-toml": {
    intro:
      "Moving a project from YAML config to TOML, for example to pyproject.toml or a Hugo site, is tedious by hand. Paste the YAML and get equivalent TOML.",
    sections: [
      {
        heading: "How it converts",
        list: [
          { term: "Maps.", text: "Nested YAML maps become [table] sections." },
          {
            term: "Lists.",
            text: 'Lists of plain values stay inline, such as features = ["search","export"]. Lists of maps become [[arrays of tables]].',
          },
          {
            term: "Anchors.",
            text: "YAML anchors and merge keys are expanded, since TOML has no references.",
          },
          {
            term: "Empty values.",
            text: "A YAML key with no value is null, which TOML cannot store. Fill it in or remove it first.",
          },
        ],
      },
      {
        heading: "Example",
        code: 'title: my-app\nserver:\n  port: 8080\nfeatures:\n  - search\n\n// converts to\n\ntitle = "my-app"\nfeatures = ["search"]\n[server]\nport = 8080',
      },
    ],
  },
  "toml-to-yaml": {
    intro:
      "Some tools want YAML where your project has TOML, such as CI config or Kubernetes values built from a Cargo.toml or pyproject.toml. Paste the TOML and get indented YAML.",
    sections: [
      {
        heading: "How it converts",
        list: [
          {
            term: "Tables.",
            text: "Each [table] becomes a nested YAML map, indented 4 spaces.",
          },
          {
            term: "Arrays of tables.",
            text: "Repeated [[name]] blocks become a YAML list of maps.",
          },
          {
            term: "Dates.",
            text: "TOML dates become YAML timestamps in ISO 8601 form, such as 1979-05-27T07:32:00.000Z.",
          },
          { term: "Comments.", text: "Dropped during conversion." },
        ],
      },
      {
        heading: "Example",
        code: '[package]\nname = "my-crate"\nedition = "2021"\n\n// converts to\n\npackage:\n    name: my-crate\n    edition: \'2021\'',
      },
    ],
  },
  "jwt-decoder": {
    intro:
      "A JSON Web Token (JWT) carries claims about a user or session, such as who they are and when the token expires. The claims are only base64url-encoded, not encrypted, so anyone holding the token can read them. Paste a token here to see its header, payload, and expiry.",
    sections: [
      {
        heading: "The three parts",
        list: [
          {
            term: "Header.",
            text: "Says how the token was signed, for example alg HS256 or RS256, and often a key ID (kid).",
          },
          {
            term: "Payload.",
            text: "The claims: registered ones like sub, iss, aud, iat, and exp, plus any custom fields the issuer added.",
          },
          {
            term: "Signature.",
            text: "Proves the token was issued by someone holding the signing key and has not been changed. It can only be checked with that key.",
          },
        ],
      },
      {
        heading: "Reading the time claims",
        paragraphs: [
          "iat (issued at), nbf (not before), and exp (expires) are Unix timestamps in seconds. The decoder shows them as UTC dates and tells you whether the token has expired or is not valid yet, based on your device's clock.",
        ],
      },
      {
        heading: "Decoding is not verifying",
        paragraphs: [
          "This tool reads the token without checking the signature, so a decoded token proves nothing about who issued it. Anyone can change the payload and re-encode it. Your server must verify the signature with the right key, and check exp, before trusting any claim.",
        ],
      },
      {
        heading: "Example",
        paragraphs: ["The payload part of a token is base64url JSON:"],
        code: 'eyJzdWIiOiI0MiIsImV4cCI6MTkyNDk5MjAwMH0\n\n// decodes to\n\n{ "sub": "42", "exp": 1924992000 }',
      },
    ],
  },
  "rupees-in-words": {
    intro:
      "Cheques, invoices, and many bank and government forms ask for the amount in words as well as in figures, so the two can be checked against each other. Type an amount in rupees and get the words in the Indian numbering system, with lakh and crore, ready to copy.",
    sections: [
      {
        heading: "What you get",
        list: [
          {
            term: "In words.",
            text: 'Starts with "Rupees" and ends with "Only", the way the amount line on an Indian cheque is written, such as Rupees Twelve Lakh Fifty Thousand Only. Invoices and receipts use the same wording.',
          },
          {
            term: "In figures.",
            text: "The amount with Indian digit grouping, such as ₹12,50,000.75, for the figures box.",
          },
        ],
      },
      {
        heading: "Lakh and crore",
        paragraphs: [
          "Indian numbering groups digits in twos after the first thousand: 1,00,000 is one lakh and 1,00,00,000 is one crore. You can type the amount with Indian commas, Western commas, or none at all, and with or without ₹, Rs, or INR in front.",
        ],
      },
      {
        heading: "Paise",
        paragraphs: [
          "Up to two decimal places are read as paise, so 45.5 becomes Rupees Forty Five and Fifty Paise Only. Amounts with more decimal places are rejected rather than rounded, because a rounded cheque amount would not match the one you meant to write.",
        ],
      },
      {
        heading: "Example",
        code: "12,50,000.75\n\n// in words\n\nRupees Twelve Lakh Fifty Thousand and Seventy Five Paise Only",
      },
    ],
  },
  "json-formatter": {
    intro:
      "APIs, logs, and config files often hand you JSON on one long line. The JSON Formatter re-indents it so you can read the structure, spot missing fields, and compare values, and if the JSON is broken it points to the exact line.",
    sections: [
      {
        heading: "Options",
        list: [
          {
            term: "Indentation.",
            text: "2 spaces is the most common style and the default. 4 spaces is easier to follow in deeply nested data, and tabs let each reader's editor choose the width.",
          },
          {
            term: "Sort keys A to Z.",
            text: "Orders the keys of every object alphabetically, which makes two versions of the same data easier to compare. Array order never changes.",
          },
        ],
      },
      {
        heading: "What changes when you format",
        paragraphs: [
          "Formatting changes whitespace only, apart from a few things that come from how JSON is read:",
        ],
        list: [
          {
            term: "Number style.",
            text: "1.0 becomes 1 and 1e2 becomes 100, because they are the same number.",
          },
          { term: "Escapes.", text: "\\u00e9 is written as é." },
          {
            term: "Large integers.",
            text: "Very large integers, beyond 9,007,199,254,740,991, lose precision when JSON is read. The tool shows a note when that happens; store long IDs as strings to keep every digit.",
          },
          {
            term: "Duplicate keys.",
            text: "Only the last value is kept, and the tool shows a note naming the key.",
          },
        ],
      },
      {
        heading: "Example",
        code: '{"id":1042,"roles":["admin","editor"]}\n\n// formatted with 2 spaces\n\n{\n  "id": 1042,\n  "roles": [\n    "admin",\n    "editor"\n  ]\n}',
      },
    ],
  },
  "json-validator": {
    intro:
      "A single missing comma or stray quote makes a whole JSON file unreadable to a program, and parser error messages are often cryptic. The JSON Validator checks your JSON as you type and, if it is broken, names the exact line and column with a plain explanation of the fix.",
    sections: [
      {
        heading: "Common JSON errors",
        list: [
          {
            term: "Trailing comma.",
            text: "JSON doesn't allow a comma after the last item, as in [1, 2,]. Remove it.",
          },
          {
            term: "Single quotes.",
            text: "Strings and keys need double quotes: \"name\", not 'name'.",
          },
          {
            term: "Unquoted keys.",
            text: 'JavaScript allows {name: 1}, but JSON needs {"name": 1}.',
          },
          {
            term: "Comments.",
            text: "JSON has no // or /* */ comments. Remove them, or use a format that allows them, such as YAML.",
          },
          {
            term: "Missing comma.",
            text: 'Two values side by side, as in "a": 1 "b": 2, need a comma between them.',
          },
          {
            term: "Cut-off JSON.",
            text: "A missing } or ] at the end, often from copying only part of a response.",
          },
        ],
      },
      {
        heading: "Reading the error",
        paragraphs: [
          "The message says what is wrong first. Below it are the line and column, and the line itself with a ^ under the character where the problem starts. Fix that spot and the check runs again as you type.",
        ],
      },
      {
        heading: "Unexpected token errors",
        paragraphs: [
          'Messages like "Unexpected token } in JSON at position 42" come from JSON.parse in browsers and Node.js. Paste the same text here to see which line that position is on and what should have been there.',
        ],
      },
    ],
  },
  "json-minifier": {
    intro:
      "Whitespace makes JSON readable for people but adds bytes for machines. The JSON Minifier removes every space, tab, and line break outside strings, so the data is as small as it can be for an API payload, a config value, or a URL, and it shows how much you saved.",
    sections: [
      {
        heading: "What minifying removes",
        paragraphs: [
          "Only whitespace between values is removed. Text inside strings, spaces included, stays exactly as it was, and the data itself doesn't change. The same exceptions as formatting apply: 1.0 is written as 1, and very large integers lose precision, which the tool warns about.",
        ],
      },
      {
        heading: "When it helps",
        list: [
          {
            text: "Sending JSON in an API request or response, where every byte is transferred.",
          },
          {
            text: "Storing JSON in a database column, an environment variable, or a query parameter.",
          },
          { text: "Embedding data in HTML or JavaScript." },
        ],
      },
      {
        heading: "Minifying and gzip",
        paragraphs: [
          "If your server already compresses responses with gzip or Brotli, minifying saves less, because compression removes most of the repeated whitespace too. It still helps wherever the JSON is stored or sent uncompressed.",
        ],
      },
      {
        heading: "Example",
        code: '{\n  "id": 1042,\n  "active": true\n}\n\n// minified\n\n{"id":1042,"active":true}',
      },
    ],
  },
  "uuid-generator": {
    intro:
      "A UUID is a 128-bit identifier written as 32 hex digits, like 0192f0c1-7b3a-7cde-8f00-123456789abc. It is unique enough that systems can create IDs on their own, without asking a central database, and never clash. This generator makes version 4 or version 7 UUIDs in your browser, one at a time or up to 1,000 at once.",
    sections: [
      {
        heading: "v4 or v7?",
        list: [
          {
            term: "v4, random.",
            text: "122 random bits from your browser's cryptographic random number generator. Use it for most IDs and tokens, and wherever the ID shouldn't reveal when it was made.",
          },
          {
            term: "v7, time-ordered.",
            text: "Starts with the creation time in milliseconds, so IDs sort in the order they were made. That keeps database indexes compact, which makes v7 a good choice for primary keys. It does reveal roughly when each ID was created.",
          },
        ],
      },
      {
        heading: "Ordered within the same millisecond",
        paragraphs: [
          "Generating many v7 UUIDs at once puts several in the same millisecond. This tool counts up a 12-bit field within each millisecond, as RFC 9562 describes, so a whole batch still sorts in creation order.",
        ],
      },
      {
        heading: "Format options",
        list: [
          {
            term: "Uppercase.",
            text: "Some tools, such as SQL Server and Windows utilities, show UUIDs in capitals. The value is the same either way.",
          },
          {
            term: "Hyphens.",
            text: "Turn them off for the compact 32-character form used in some URLs and file names.",
          },
          {
            term: "Braces { }.",
            text: "Wraps each UUID in braces, the style of the Windows registry and COM.",
          },
        ],
      },
      {
        heading: "Will two UUIDs ever collide?",
        paragraphs: [
          "In practice, no. A v4 UUID has 122 random bits, so you would need to generate about 2.7 quintillion of them to reach a 50% chance of a single duplicate.",
        ],
      },
    ],
  },
  "guid-generator": {
    intro:
      "GUID is Microsoft's name for a UUID: the same 128-bit identifier, used across .NET, SQL Server, COM, and the Windows registry. This generator creates GUIDs in your browser, one at a time or up to 1,000 at once, in the format your code expects.",
    sections: [
      {
        heading: "GUID or UUID?",
        paragraphs: [
          "They are the same thing. Guid.NewGuid() in C# returns a random version 4 UUID, and SQL Server's uniqueidentifier stores the same 16 bytes. Any GUID from this page works wherever a UUID is expected, and the other way round. Since .NET 9, Guid.CreateVersion7() makes time-ordered version 7 GUIDs, which the v7 option here also produces.",
        ],
      },
      {
        heading: "Formats",
        list: [
          {
            term: "Default.",
            text: "8-4-4-4-12 in lowercase, the same as Guid.ToString().",
          },
          {
            term: "Uppercase.",
            text: "As SQL Server Management Studio and many Windows tools show them.",
          },
          {
            term: "Braces { }.",
            text: 'The registry and COM format, and what Guid.ToString("B") returns.',
          },
          {
            term: "No hyphens.",
            text: '32 digits in a row, as Guid.ToString("N") returns.',
          },
        ],
      },
      {
        heading: "Using a GUID in code",
        code: "// C#\nvar id = Guid.Parse(\"0192f0c1-7b3a-7cde-8f00-123456789abc\");\n\n-- SQL Server\nDECLARE @id uniqueidentifier = '0192F0C1-7B3A-7CDE-8F00-123456789ABC';",
      },
    ],
  },
  "hash-generator": {
    intro:
      "A hash function turns any text or file into a short, fixed-length fingerprint. The same input always gives the same hash, and changing a single byte changes it completely, which makes hashes useful for checking downloads, spotting duplicates, and building cache keys. This tool computes MD5, SHA-1, SHA-256, SHA-384, and SHA-512 at once.",
    sections: [
      {
        heading: "Which algorithm to use",
        list: [
          {
            term: "SHA-256.",
            text: "The safe default for checksums, signatures, and anything security-related.",
          },
          {
            term: "SHA-512 and SHA-384.",
            text: "Longer hashes from the same SHA-2 family, often faster than SHA-256 on 64-bit machines.",
          },
          {
            term: "SHA-1.",
            text: "Broken for security since 2017, but still used for Git commit IDs and older checksums.",
          },
          {
            term: "MD5.",
            text: "Broken for security since 2004. Fine for spotting accidental corruption or duplicate files, never for passwords or signatures.",
          },
        ],
      },
      {
        heading: "Checking a download",
        paragraphs: [
          "Click Hash a file and choose the file, then paste the checksum published by the site you downloaded it from into Check against a hash. A match means your copy is identical to the original, byte for byte.",
        ],
      },
      {
        heading: "Hashing is not encryption",
        paragraphs: [
          "A hash can't be turned back into the original text, and there is no key. To store passwords, use a slow password hash such as bcrypt, scrypt, or Argon2, never plain MD5 or SHA, which are fast enough to guess billions of candidates per second.",
        ],
      },
      {
        heading: "From the command line",
        code: "# macOS\nshasum -a 256 file.zip\nmd5 file.zip\n\n# Linux\nsha256sum file.zip\n\n# Windows\ncertutil -hashfile file.zip SHA256",
      },
    ],
  },
  "md5-generator": {
    intro:
      "MD5 turns any text or file into a 128-bit hash, written as 32 hex characters. It is fast and everywhere, so it is still common for file checksums, cache keys, and spotting duplicates.",
    sections: [
      {
        heading: "Is MD5 secure?",
        paragraphs: [
          "No. Researchers have been able to create two different inputs with the same MD5 hash since 2004, so it must not be used for passwords, signatures, or certificates. It is still fine for catching accidental corruption, where nobody is trying to fake a match.",
        ],
      },
      {
        heading: "Checking a download",
        paragraphs: [
          "Click Hash a file and choose the file, then paste the checksum published by the site you downloaded it from into Check against a hash. A match means your copy is identical to the original, byte for byte.",
        ],
      },
      {
        heading: "Example",
        code: "hello\n\n// MD5\n\n5d41402abc4b2a76b9719d911017c592",
      },
      {
        heading: "From the command line",
        code: "# macOS\nmd5 file.zip\n\n# Linux\nmd5sum file.zip\n\n# Windows\ncertutil -hashfile file.zip MD5",
      },
    ],
  },
  "sha1-generator": {
    intro:
      "SHA-1 produces a 160-bit hash, written as 40 hex characters. It was the standard hash for years and still turns up in Git, older checksums, and legacy systems.",
    sections: [
      {
        heading: "Is SHA-1 still safe?",
        paragraphs: [
          "Not for security. In 2017 the SHAttered attack produced two different PDF files with the same SHA-1 hash, and browsers no longer accept SHA-1 certificates. Use SHA-256 for anything new; SHA-1 remains fine for non-security uses such as detecting accidental changes.",
        ],
      },
      {
        heading: "SHA-1 in Git",
        paragraphs: [
          "Git names every commit, file, and tree by the SHA-1 hash of its contents, which is where commit IDs such as a1b2c3d come from. Newer versions of Git can use SHA-256 instead.",
        ],
      },
      {
        heading: "Checking a download",
        paragraphs: [
          "Click Hash a file and choose the file, then paste the checksum published by the site you downloaded it from into Check against a hash. A match means your copy is identical to the original, byte for byte.",
        ],
      },
      {
        heading: "Example",
        code: "hello\n\n// SHA-1\n\naaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
      },
    ],
  },
  "sha256-generator": {
    intro:
      "SHA-256 is the most widely used hash today: a 256-bit fingerprint written as 64 hex characters. It secures TLS certificates, software downloads, Docker image digests, and Bitcoin, and has no known practical attacks.",
    sections: [
      {
        heading: "Where SHA-256 is used",
        list: [
          { text: "Checksums published next to software downloads." },
          { text: "Docker image digests, such as sha256:2cf24dba…" },
          {
            text: "TLS certificates, code signing, and JSON Web Tokens signed with HS256 or RS256.",
          },
          { text: "Bitcoin's proof of work and transaction IDs." },
        ],
      },
      {
        heading: "Checking a download",
        paragraphs: [
          "Click Hash a file and choose the file, then paste the checksum published by the site you downloaded it from into Check against a hash. A match means your copy is identical to the original, byte for byte.",
        ],
      },
      {
        heading: "Example",
        code: "hello\n\n// SHA-256\n\n2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      },
      {
        heading: "From the command line",
        code: "# macOS\nshasum -a 256 file.zip\n\n# Linux\nsha256sum file.zip\n\n# Windows (PowerShell)\nGet-FileHash file.zip -Algorithm SHA256",
      },
    ],
  },
  "sha512-generator": {
    intro:
      "SHA-512 is the long member of the SHA-2 family: a 512-bit hash written as 128 hex characters. On 64-bit computers it is often faster than SHA-256, and it is used for npm package integrity, Linux password files, and long-term signatures.",
    sections: [
      {
        heading: "SHA-512 or SHA-256?",
        paragraphs: [
          "Both are secure. SHA-512 gives a longer hash and often runs faster on 64-bit CPUs, while SHA-256 is shorter and more widely expected. SHA-384 is SHA-512 with a different starting point, cut to 384 bits.",
        ],
      },
      {
        heading: "Where SHA-512 is used",
        list: [
          { text: "npm lockfiles, whose integrity fields start with sha512-." },
          {
            text: "Linux password hashes that begin with $6$, which run SHA-512 many thousands of times.",
          },
          { text: "File checksums for large downloads." },
        ],
      },
      {
        heading: "Checking a download",
        paragraphs: [
          "Click Hash a file and choose the file, then paste the checksum published by the site you downloaded it from into Check against a hash. A match means your copy is identical to the original, byte for byte.",
        ],
      },
      {
        heading: "From the command line",
        code: "# macOS\nshasum -a 512 file.zip\n\n# Linux\nsha512sum file.zip\n\n# Windows (PowerShell)\nGet-FileHash file.zip -Algorithm SHA512",
      },
    ],
  },
};
