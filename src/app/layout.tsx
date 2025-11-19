import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";

import { TRPCReactProvider } from "@/lib/trpc/client";

import { cn } from "@/utils/cn";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  description:
    "Mediqly is a platform for medical professionals. Test your knowledge and improve your skillsets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body
        className={cn(
          "scrollbar-hide @container/app grid min-h-screen grid-rows-[auto_1fr] antialiased",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <TRPCReactProvider>
          <Providers>
            <div className="flex h-12 items-center border-b px-4">
              <p>placeholder navbar</p>
            </div>
            {children}
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
