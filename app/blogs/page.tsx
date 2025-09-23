import type { Metadata } from "next";
import BlogsClientWrapper from "./BlogsClientWrapper";

export const metadata: Metadata = {
  title: "Blog | Nivakaran S. - Tech Insights & Tutorials",
  description: "Read my latest blog posts about software development, data science, AI, and tech industry insights. Stay updated with cutting-edge technologies.",
  openGraph: {
    title: "Blog - Nivakaran S.",
    description: "Tech insights, tutorials, and industry analysis from a full-stack developer.",
    url: "https://nivakaran.dev/blogs",
  },
  alternates: {
    canonical: "https://nivakaran.dev/blogs",
  },
};

export default function BlogsPage() {
    return(
        <BlogsClientWrapper/>
    )
}