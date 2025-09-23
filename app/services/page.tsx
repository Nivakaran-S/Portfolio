import type {Metadata} from "next";
import ServicesClientWrapper from "./ServicesClientWrapper";

export const metadata: Metadata = {
  title: "Services | Nivakaran S. - Full-Stack Development & Data Science",
  description: "Explore my professional services: full-stack web development, data science solutions, AI implementation, mobile app development, and custom software development.",
  openGraph: {
    title: "Services by Nivakaran S.",
    description: "Professional full-stack development, data science, and AI services.",
    url: "https://nivakaran.dev/services",
  },
  alternates: {
    canonical: "https://nivakaran.dev/services",
  },
};

export default function ServicesPage() {
  return(
    <ServicesClientWrapper/>
  )
}