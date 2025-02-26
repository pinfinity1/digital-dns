import React from "react";
import type {Metadata} from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/Providers";


const SansWeb = localFont({
    src: [
        {path: "./fonts/SansWeb.ttf", weight: "400", style: "normal"},
        {path: "./fonts/SansNum.ttf", weight: "400", style: "normal"},
    ],
    variable: "--font-sans-web",
});

export const metadata: Metadata = {
    title: "Digital dns",
    description: "Digital DNS",
};

export default function RootLayout ({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa"
              dir="rtl"
              className={`${SansWeb.className}`}
              suppressHydrationWarning>
        <body
            className={`antialiased`}
        >
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
