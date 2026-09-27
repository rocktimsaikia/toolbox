export type UuidVersion = "v4" | "v7";

export type UuidFormat = { uppercase: boolean; hyphens: boolean; braces: boolean };

const hex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

const hyphenate = (h: string) =>
  `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;

// v7 (RFC 9562): 48-bit Unix time in ms, then randomness. Within one millisecond the
// 12-bit rand_a field counts up instead of being random, so a batch generated in the same
// millisecond still sorts in creation order.
let lastMs = -1;
let counter = 0;

export function uuidv7(now = Date.now()) {
  const random = crypto.getRandomValues(new Uint8Array(10));
  let ms = now;
  if (ms <= lastMs) {
    ms = lastMs;
    counter++;
    // 12 bits used up: borrow the next millisecond rather than repeat or go backwards
    if (counter > 0xfff) {
      ms++;
      counter = random[0] & 0x3ff;
    }
  } else {
    // Start low in the range so there is room to count up within this millisecond
    counter = ((random[0] << 8) | random[1]) & 0x3ff;
  }
  lastMs = ms;

  const bytes = new Uint8Array(16);
  for (let i = 0; i < 6; i++) bytes[i] = Math.floor(ms / 2 ** (8 * (5 - i))) & 0xff;
  bytes[6] = 0x70 | (counter >> 8);
  bytes[7] = counter & 0xff;
  bytes[8] = 0x80 | (random[2] & 0x3f);
  bytes.set(random.subarray(3, 10), 9);
  return hyphenate(hex(bytes));
}

export const uuidv4 = () => crypto.randomUUID();

export function formatUuid(uuid: string, { uppercase, hyphens, braces }: UuidFormat) {
  let out = hyphens ? uuid : uuid.replaceAll("-", "");
  if (uppercase) out = out.toUpperCase();
  return braces ? `{${out}}` : out;
}

export const MAX_COUNT = 1000;
