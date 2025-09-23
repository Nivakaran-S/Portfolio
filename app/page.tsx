
import type { Metadata } from "next";
import HomePageClientWrapper from "./HomePageClientWrapper";

export const metadata: Metadata = {
  title: "Nivakaran S. | Full-Stack Developer & Data Scientist",
  description: "Welcome to Nivakaran Shanmugabavan's portfolio. Explore my journey in full-stack development, data science, AI, and software engineering. Turning code & data into impactful products.",
  keywords: ["Nivakaran Shanmugabavan", "Full-Stack Developer", "Data Scientist", "AI Engineer", "Portfolio", "Web Development", "Machine Learning", "Software Engineer"],
  openGraph: {
    title: "Nivakaran S. | Full-Stack Developer & Data Scientist",
    description: "Portfolio showcasing full-stack development, data science, and AI projects by Nivakaran Shanmugabavan.",
    url: "https://nivakaran.dev",
    siteName: "Nivakaran S. Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivakaran S. | Full-Stack Developer & Data Scientist",
    description: "Portfolio showcasing full-stack development, data science, and AI projects.",
  },
  alternates: {
    canonical: "https://nivakaran.dev",
  },
};


export default function HomePage() {
  return(
    <HomePageClientWrapper/>
  )
}