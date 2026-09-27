export const ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

// Shared by the server page (to prerender its hashes) and the client tool
export const HASH_SAMPLE = "Hello, Toolbelt!";
export type Algorithm = (typeof ALGORITHMS)[number];

export type Hashes = Record<Algorithm, string>;

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

// Per-round shift amounts and sine-derived constants from RFC 1321
const S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
const K = Array.from(
  { length: 64 },
  (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) >>> 0,
);

// MD5 is not in Web Crypto, which only offers the SHA family, so it is done here
export function md5(bytes: Uint8Array) {
  const bitLength = bytes.length * 8;
  const padded = new Uint8Array((((bytes.length + 8) >> 6) + 1) * 64);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 8, bitLength >>> 0, true);
  view.setUint32(padded.length - 4, Math.floor(bitLength / 2 ** 32), true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;
  const m = new Uint32Array(16);

  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let j = 0; j < 16; j++) m[j] = view.getUint32(offset + j * 4, true);
    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;
    for (let i = 0; i < 64; i++) {
      let f: number;
      let g: number;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const shift = S[(i >> 4) * 4 + (i % 4)];
      const sum = (a + f + K[i] + m[g]) >>> 0;
      a = d;
      d = c;
      c = b;
      b = (b + ((sum << shift) | (sum >>> (32 - shift)))) >>> 0;
    }
    a0 = (a0 + a) >>> 0;
    b0 = (b0 + b) >>> 0;
    c0 = (c0 + c) >>> 0;
    d0 = (d0 + d) >>> 0;
  }

  const out = new DataView(new ArrayBuffer(16));
  for (const [i, word] of [a0, b0, c0, d0].entries()) out.setUint32(i * 4, word, true);
  return toHex(new Uint8Array(out.buffer));
}

export async function hashBytes(bytes: Uint8Array): Promise<Hashes> {
  const entries = await Promise.all(
    ALGORITHMS.map(async (algorithm) => [
      algorithm,
      algorithm === "MD5"
        ? md5(bytes)
        : toHex(new Uint8Array(await crypto.subtle.digest(algorithm, bytes))),
    ]),
  );
  return Object.fromEntries(entries) as Hashes;
}

export const hashText = (text: string) => hashBytes(new TextEncoder().encode(text));
