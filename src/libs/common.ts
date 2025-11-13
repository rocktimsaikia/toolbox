export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function formatJSObject(obj: any, indent: number = 2): string {
  const space = " ".repeat(indent);

  if (Array.isArray(obj)) {
    const items = obj.map((item) => formatJSObject(item, indent + 2));
    return `[\n${space}${items.join(`,\n${space}`)}\n${" ".repeat(indent - 2)}]`;
  } else if (obj !== null && typeof obj === "object") {
    const props = Object.entries(obj).map(
      ([key, value]) => `${key}: ${formatJSObject(value, indent + 2)}`,
    );
    return `{\n${space}${props.join(`,\n${space}`)}\n${" ".repeat(indent - 2)}}`;
  } else if (typeof obj === "string") {
    return `${obj}`; // No extra quotes around strings in JS representation.
  } else {
    return String(obj);
  }
}

/**
 * Parses a comma-separated list of IP addresses and returns the preferred one.
 * Prefers IPv4 addresses over IPv6. If no IPv4 is found, returns the first address.
 * @param ipAddressString - Comma-separated list of IP addresses or null/undefined
 * @returns The preferred IP address, or empty string if none found
 */
export function getPreferredIpAddress(
  ipAddressString: string | null | undefined,
): string {
  if (!ipAddressString) {
    return "";
  }

  const addresses = ipAddressString.split(",").map((addr) => addr.trim());

  // Look for an IPv4 address (contains dots but not colons)
  const ipv4 = addresses.find((addr) => addr.includes(".") && !addr.includes(":"));

  // Return IPv4 if found, otherwise return the first address
  return ipv4 || addresses[0] || "";
}
