import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rovn AI | Recover Revenue Hidden Inside Conversations.",
  description: "AI inbox for freelancers and small businesses. Rovn connects to WhatsApp, Instagram, and Email to recover lost leads.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
