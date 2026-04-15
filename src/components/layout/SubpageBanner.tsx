"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/buy": "Buy Property",
  "/rent": "Rent Property",
  "/business": "Business Sales",
  "/auctions": "Property Auctions",
  "/pricing": "Pricing",
  "/how-it-works": "How It Works",
  "/list-property": "List Your Property",
  "/valuate": "Property Valuation",
  "/advertise": "Advertise",
  "/calculators": "Calculators",
  "/countries": "Countries",
  "/login": "Login",
  "/dashboard": "Dashboard",
  "/agreement": "Agreement",
  "/checkout": "Checkout",
  "/payment-success": "Payment Success",
};

export default function SubpageBanner() {
  const pathname = usePathname();

  // Strip locale prefix to get the route
  const route = pathname.replace(/^\/[a-z]{2}(?:\/|$)/, "/").replace(/\/$/, "") || "/";

  // Don't show on homepage
  if (route === "/" || route === "") return null;

  // Find matching title (check longest match first for nested routes)
  let title = "";
  const sortedKeys = Object.keys(PAGE_TITLES).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (route === key || route.startsWith(key + "/")) {
      title = PAGE_TITLES[key];
      break;
    }
  }

  // For dynamic routes not in the map, derive from path
  if (!title) {
    const segments = route.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "";
    title = last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="bg-[#1a2535] h-[96px] flex items-center px-4 border-b border-gold/10">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Image src="/propworths-logo-transparent.png" alt="Propworths" width={240} height={80} className="h-[80px] w-auto object-contain" unoptimized />
        <span className="text-cream/80 text-sm font-medium tracking-wide">{title}</span>
      </div>
    </div>
  );
}
