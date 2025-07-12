import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nivakaran S.",
  description: "Nivakaran Shanmugabavan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Nivakaran" />
      </head>
      <body
      
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-[18px]  overflow-x-hidden
        `}>
      
        {children}
         <Analytics />
         <SpeedInsights/>
      </body>
    </html>
  );
}
