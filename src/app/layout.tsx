import React from "react";
import type {Metadata, Viewport} from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/Providers";


const SansWeb = localFont({
    src: [
        {path: "../../public/fonts/SansWeb.ttf", weight: "400", style: "normal"},
        {path: "../../public/fonts/SansNum.ttf", weight: "400", style: "normal"},
    ],
    variable: "--font-sans-web",
});

export const metadata: Metadata = {
    title: "Digital dns",
    description: "Digital DNS",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["nextjs", "next15", "next-pwa", "Digital", "Digital Dashboard", "Dashboard"],
    icons: [
        {rel: "apple-touch-icon", url: "icons/Digital-512.png"},
        {rel: "icon", url: "icons/Digital-512.png"},
    ]
    
};

export const viewport: Viewport = {
    minimumScale: 1,
    initialScale: 1.0,
    width: "device-width",
    viewportFit: "cover",
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
        <head>
            <meta name={"theme-color"} content={"#ffffff"}/>
            <link rel={"manifest"} href={"/manifest.json"}/>
            <link rel="icon" href="/icons/Digital-512.png"/>
            <link rel="apple-touch-icon" href="/icons/Digital-512.png"/>
        </head>
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
