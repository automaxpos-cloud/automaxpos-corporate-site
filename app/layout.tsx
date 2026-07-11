import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoMax POS | JP Max Technologies",
  description:
    "AutoMax POS is a production-ready retail POS platform for sales, inventory, branches, AMMS settlement, cloud monitoring, and enterprise licensing.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
