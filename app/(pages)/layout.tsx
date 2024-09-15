import type { Metadata } from "next";
import { montserrat400 } from "../fonts/montserrat";
import { Toaster } from "@/components/ui/toaster";
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
                <Toaster />
            </body>
        </html>
    );
}
