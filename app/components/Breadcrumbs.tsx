// Create a new component: app/components/Breadcrumbs.tsx
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
  current: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
          </div>
        </li>
        {items.map((item) => (
          <li key={item.name}>
            <div className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={item.href}
                className={`ml-4 text-sm font-medium ${
                  item.current ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Usage in your pages:
// For About page:
const aboutBreadcrumbs = [{ name: 'About', href: '/about', current: true }];

// For Services page:
const servicesBreadcrumbs = [{ name: 'Services', href: '/services', current: true }];

// For Portfolio page:
const portfolioBreadcrumbs = [{ name: 'Portfolio', href: '/portfolio', current: true }];

// For Blog page:
const blogsBreadcrumbs = [{ name: 'Blog', href: '/blogs', current: true }];

// For Events page:
const eventsBreadcrumbs = [{ name: 'Events', href: '/events', current: true }];