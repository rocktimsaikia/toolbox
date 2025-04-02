import type { Slug } from "@/constants/tools";

type Faq = {
  question: string;
  answer: string;
};

export const Faqs: Partial<Record<Slug, Faq[]>> = {
  "whats-my-ip": [
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
  ],
};
