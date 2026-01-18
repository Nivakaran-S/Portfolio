import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nivakaran S. | Full-Stack Developer & Data Scientist',
        short_name: 'Nivakaran',
        description: 'Portfolio of Nivakaran Shanmugabavan — Full-Stack Developer, Data Scientist, and AI Engineer.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#101010',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
