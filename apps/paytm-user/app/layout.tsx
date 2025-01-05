import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Appbar } from "@repo/ui/appbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Appbar/>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
