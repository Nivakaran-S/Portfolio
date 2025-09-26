import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/services', 
          '/portfolio',
          '/blogs',
          '/events', // Make sure this is included
          '/blogs/blogpage', // Allow blog pages
        ],
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: 'https://nivakaran.dev/sitemap.xml',
    host: 'https://nivakaran.dev',
  }
}