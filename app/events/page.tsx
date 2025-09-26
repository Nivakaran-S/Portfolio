// app/events/page.tsx - Fix the metadata
import type { Metadata } from "next";
import EventsClientWrapper from "./EventClientWrapper";

export const metadata: Metadata = {
  title: "Events | Nivakaran S. - Tech Conferences & Competitions",
  description: "Discover my participation in tech conferences, hackathons, and competitions. See highlights from DevFest, Algothon, and other industry events.",
  keywords: ["Tech Events", "Conferences", "Hackathons", "DevFest", "Algothon", "SLIIT", "Tech Competitions"],
  openGraph: {
    title: "Events - Nivakaran S.",
    description: "Tech events, conferences, and competition highlights showcasing continuous learning and community engagement.",
    url: "https://nivakaran.dev/events",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - Nivakaran S.",
    description: "Tech events and competition highlights.",
  },
  alternates: {
    canonical: "https://nivakaran.dev/events",
  },
};

export default function EventsPage() {
  return(
    <div className="overflow-x-hidden">
      <EventsClientWrapper/>
    </div>
  )    
}