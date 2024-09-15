import type { Metadata } from "next";
import { montserrat400 } from "../fonts/montserrat";
export const metadata: Metadata = {
    title: "Bango",
    description: "Streamlined Crypto Transactions",
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
