// Add this component to your pages for better internal linking
// app/components/RelatedPages.tsx

import Link from 'next/link';

interface RelatedPage {
  title: string;
  description: string;
  href: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
}

export default function RelatedPages({ pages, title = "Explore More" }: RelatedPagesProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <Link key={index} href={page.href} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {page.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {page.description}
                </p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Usage examples for each page:

// For Home page:
export const homeRelatedPages = [
  {
    title: "About Me",
    description: "Learn about my journey in software development and data science",
    href: "/about"
  },
  {
    title: "My Services", 
    description: "Discover the professional services I offer",
    href: "/services"
  },
  {
    title: "Portfolio",
    description: "Explore my latest projects and technical work",
    href: "/portfolio"
  }
];

// For About page:
export const aboutRelatedPages = [
  {
    title: "My Services",
    description: "See what I can help you build",
    href: "/services"
  },
  {
    title: "Portfolio",
    description: "View examples of my work",
    href: "/portfolio"
  },
  {
    title: "Tech Events",
    description: "Events and competitions I've participated in",
    href: "/events"
  }
];

// For Services page:
export const servicesRelatedPages = [
  {
    title: "Portfolio",
    description: "See these services in action through my projects",
    href: "/portfolio"
  },
  {
    title: "About Me",
    description: "Learn about my background and expertise",
    href: "/about"
  },
  {
    title: "Blog",
    description: "Read about my technical insights and learnings",
    href: "/blogs"
  }
];

// Add similar for other pages...

export const portfolioRelatedPages = [
  {
    title: "Portfolio",
    description: "See these services in action through my projects",
    href: "/portfolio"
  },
  {
    title: "About Me",
    description: "Learn about my background and expertise",
    href: "/about"
  },
  {
    title: "Blog",
    description: "Read about my technical insights and learnings",
    href: "/blogs"
  }
];

export const blogsRelatedPages = [
  {
    title: "Portfolio",
    description: "See these services in action through my projects",
    href: "/portfolio"
  },
  {
    title: "About Me",
    description: "Learn about my background and expertise",
    href: "/about"
  },
  {
    title: "Blog",
    description: "Read about my technical insights and learnings",
    href: "/blogs"
  }
];

export const eventsRelatedPages = [
  {
    title: "Portfolio",
    description: "See these services in action through my projects",
    href: "/portfolio"
  },
  {
    title: "About Me",
    description: "Learn about my background and expertise",
    href: "/about"
  },
  {
    title: "Blog",
    description: "Read about my technical insights and learnings",
    href: "/blogs"
  }
];