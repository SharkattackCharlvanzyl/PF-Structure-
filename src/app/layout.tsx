import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropertyFinder",
  description: "Find Your Dream Property Anywhere in the World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
