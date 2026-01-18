// Update your app/layout.tsx with enhanced structured data
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Max from "./components/Max";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nivakaran.dev'),
  title: {
    default: "Nivakaran S. | Turning Code & Data Into Impactful Products",
    template: "%s | Nivakaran S."
  },
  description: "Portfolio of Nivakaran Shanmugabavan — building impactful software with full-stack engineering, data science, and AI. Explore projects, blog posts, and technical skills.",
  keywords: [
    "Full-Stack Developer", "Data Scientist", "AI Engineer", "Web Development",
    "Machine Learning", "Portfolio", "React Developer", "Next.js Developer",
    "Python Developer", "Software Engineer Sri Lanka", "Freelance Developer",
    "Computer Vision", "Deep Learning", "Node.js", "TypeScript"
  ],
  authors: [{ name: "Nivakaran Shanmugabavan", url: "https://nivakaran.dev" }],
  creator: "Nivakaran Shanmugabavan",
  publisher: "Nivakaran Shanmugabavan",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nivakaran.dev",
    title: "Nivakaran S. | Full-Stack Developer & Data Scientist",
    description: "Portfolio showcasing full-stack development, data science, and AI projects",
    siteName: "Nivakaran S. Portfolio",
    images: [
      {
        url: '/og-image.png', // You should add this image to public/
        width: 1200,
        height: 630,
        alt: 'Nivakaran S. Portfolio',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivakaran S. | Full-Stack Developer & Data Scientist",
    description: "Portfolio showcasing full-stack development, data science, and AI projects",
    creator: "@nivakarans", // Add your Twitter handle
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: "https://nivakaran.dev",
    languages: {
      'en-US': 'https://nivakaran.dev',
    },
  },
  verification: {
    google: "your-google-verification-code-here", // Add your Google verification code
  },
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// Enhanced structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nivakaran.dev/#person",
      "name": "Nivakaran Shanmugabavan",
      "url": "https://nivakaran.dev",
      "image": "https://nivakaran.dev/images/profile.jpg", // Add your profile image URL
      "sameAs": [
        "https://linkedin.com/in/nivakarans",
        "https://github.com/nivakaran"
      ],
      "jobTitle": ["Full-Stack Developer", "Data Scientist", "AI Engineer"],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Sri Lanka Institute of Information Technology (SLIIT)"
      },
      "knowsAbout": [
        "Full-Stack Development",
        "Data Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Web Development",
        "Software Engineering"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Software Developer",
        "occupationLocation": {
          "@type": "Place",
          "name": "Negombo, Western Province, Sri Lanka"
        }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://nivakaran.dev/#website",
      "url": "https://nivakaran.dev",
      "name": "Nivakaran S. Portfolio",
      "description": "Portfolio of Nivakaran Shanmugabavan showcasing full-stack development, data science, and AI projects",
      "publisher": {
        "@id": "https://nivakaran.dev/#person"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://nivakaran.dev/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nivakaran.dev"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://nivakaran.dev/about"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Services",
          "item": "https://nivakaran.dev/services"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Portfolio",
          "item": "https://nivakaran.dev/portfolio"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Blog",
          "item": "https://nivakaran.dev/blogs"
        }
      ]
    }
  ]
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
        <link rel="canonical" href="https://nivakaran.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden text-[18px]`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <Max />
      </body>
    </html>
  );
}