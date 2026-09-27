import { base64ToText } from "./parse-url.ts";

export type DecodedJwt = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
};

// Decoding only reads the token. It does not verify the signature, so the claims
// could have been edited by anyone; the page says so next to the output.
export function decodeJwt(input: string): DecodedJwt {
  const token = input.trim().replace(/^Bearer\s+/i, "");
  const parts = token.split(".");
  if (parts.length === 5) {
    throw new Error(
      "This is an encrypted JWT (JWE, five parts). Its payload can only be read with the decryption key.",
    );
  }
  if (parts.length !== 3) {
    throw new Error(
      `A JWT has three parts separated by dots (header.payload.signature). This has ${parts.length}.`,
    );
  }
  const [header, payload, signature] = parts;
  return {
    header: readPart(header, "header"),
    payload: readPart(payload, "payload"),
    signature,
  };
}

function readPart(part: string, name: string) {
  const text = /^[\w-]+$/.test(part) ? base64ToText(part) : null;
  if (text === null) {
    throw new Error(`The ${name} is not valid base64url text.`);
  }
  try {
    const value = JSON.parse(text);
    if (typeof value === "object" && value !== null && !Array.isArray(value))
      return value;
  } catch {}
  throw new Error(`The ${name} decodes, but it is not a JSON object.`);
}

// Registered time claims are seconds since the Unix epoch (RFC 7519)
export const TIME_CLAIMS = { iat: "Issued", nbf: "Not before", exp: "Expires" } as const;

export function expiryStatus(payload: Record<string, unknown>, now = Date.now()) {
  const { exp, nbf } = payload;
  if (typeof nbf === "number" && nbf * 1000 > now) return "not-yet-valid";
  if (typeof exp !== "number") return "no-expiry";
  return exp * 1000 <= now ? "expired" : "valid";
}
