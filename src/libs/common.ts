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
