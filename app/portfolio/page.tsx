import type { Metadata } from "next";
import PortfolioCLientWrapper from "./PortfolioClientWrapper";

export const metadata: Metadata = {
  title: "Portfolio | Nivakaran S. - Featured Projects & Work",
  description: "Explore my portfolio of full-stack applications, data science projects, AI solutions, and computer vision projects. See real-world examples of my development work.",
  openGraph: {
    title: "Portfolio - Nivakaran S.",
    description: "Featured projects showcasing full-stack development and data science expertise.",
    url: "https://nivakaran.dev/portfolio",
  },
  alternates: {
    canonical: "https://nivakaran.dev/portfolio",
  },
};

export default function PortfolioPage() {
  return(
    <PortfolioCLientWrapper/>
  )
} 