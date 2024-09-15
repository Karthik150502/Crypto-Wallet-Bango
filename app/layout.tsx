import type { Metadata } from "next";
import { montserrat400 } from "./fonts/montserrat";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bango",
  description: "Streamlined Crypto Transactions",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat400.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
