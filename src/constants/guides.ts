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
          "Flip the switch to Decode and paste a Base64 string. The decoder also accepts the URL-safe variant, which uses - and _ instead of + and /, and strings with the padding left off, as found in JWTs and many URLs.",
          "If the decoded bytes are not valid text, for example when the Base64 holds an image, you get an error instead of garbled characters. Flipping the switch also moves the current output into the input, so checking a round trip takes one click.",
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
      "Cron is the scheduler behind countless background jobs, from nightly backups to hourly reports. Its five-field syntax is compact but hard to read at a glance. This tool explains any cron expression in plain English and includes a list of common schedules to start from.",
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
        code: "*/15 9-17 * * 1-5\n\n// every 15 minutes from 9AM to 5PM from Monday to Friday",
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
};
