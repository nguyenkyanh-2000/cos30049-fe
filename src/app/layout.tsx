// Import necessary types and styles
import type { Metadata } from "next";
import "./globals.css";

// Define metadata for the application
export const metadata: Metadata = {
  title: "crypto",
  description: "The leading cryptocurrency analysis platform",
};

// RootLayout component to wrap the application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`!antialiased`}>{children}</body>
    </html>
  );
}
