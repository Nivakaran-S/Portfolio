import type { Metadata } from "next";
import AboutClientWrapper from "./AboutClientWrapper";

export const metadata: Metadata = {
  title: "About | Nivakaran S. - Full-Stack Developer & Data Scientist",
  description: "Learn about Nivakaran Shanmugabavan's journey in software development, data science, and AI. Discover my skills, experience, and passion for building impactful solutions.",
  openGraph: {
    title: "About Nivakaran S.",
    description: "Full-stack developer and data scientist passionate about creating impactful software solutions.",
    url: "https://nivakaran.dev/about",
  },
  alternates: {
    canonical: "https://nivakaran.dev/about",
  },
};

export default function AboutPage() {
  return(
    <AboutClientWrapper/>
  )
}
