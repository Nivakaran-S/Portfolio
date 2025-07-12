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
  title: "Nivakaran S. | Turning Code & Data Into Impactful Products",
  description: "Portfolio of Nivakaran Shanmugabavan — building impactful software with full-stack engineering, data science, and AI. Explore projects, blog posts, and technical skills.",
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
