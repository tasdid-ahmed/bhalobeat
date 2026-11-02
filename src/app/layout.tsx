import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BhaloBeat",
  description:
    "Every good deed has a pulse. Create, join, and track community service events in your neighborhood.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}